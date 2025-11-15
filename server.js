const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

// Import email service for contact form forwarding
let emailService;
try {
  emailService = require('./js/email-service');
  console.log('✅ Email service loaded successfully');
} catch (error) {
  console.log('⚠️  Email service not available, using console logging fallback');
  emailService = null;
}

const app = express();
const PORT = process.env.PORT || 8888;
const HOST = process.env.HOST || 'localhost';

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Enable CORS
app.use(cors());

// Compression middleware
app.use(compression());

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.', {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
  etag: true,
  lastModified: true
}));

// API Routes
app.get('/api/friends', (req, res) => {
  try {
    const friends = require('./data/friends.json');
    res.json(friends);
  } catch (error) {
    console.error('Error loading friends data:', error);
    res.status(500).json({ error: 'Failed to load friends data' });
  }
});

app.get('/api/friends/:name', (req, res) => {
  try {
    const friends = require('./data/friends.json');
    const friend = friends.find(f => f.name.toLowerCase() === req.params.name.toLowerCase());
    
    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }
    
    res.json(friend);
  } catch (error) {
    console.error('Error loading friend data:', error);
    res.status(500).json({ error: 'Failed to load friend data' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    emailService: emailService ? 'Available' : 'Fallback Mode'
  });
});

// Test email forwarding endpoint (for development)
app.post('/api/test-email', async (req, res) => {
  try {
    if (!emailService) {
      return res.json({
        success: false,
        message: 'Email service not configured. Using console logging fallback.',
        fallback: true
      });
    }
    
    const testResult = await emailService.testConnection();
    res.json({
      success: testResult.success,
      message: testResult.success ? 'Email service is working!' : 'Email service configuration error',
      error: testResult.error || null,
      targetEmail: 'codeex.care@gmail.com'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to test email service',
      error: error.message
    });
  }
});

// Test auto-reply email endpoint (for development)
app.post('/api/test-auto-reply', async (req, res) => {
  try {
    const { testEmail } = req.body;
    
    if (!emailService) {
      return res.json({
        success: false,
        message: 'Email service not configured.',
        fallback: true
      });
    }
    
    const result = await emailService.sendTestAutoReply(testEmail || 'test@example.com');
    res.json({
      success: result.success,
      message: result.success ? 'Test auto-reply sent successfully!' : 'Failed to send test auto-reply',
      messageId: result.messageId || null,
      sentTo: result.sentTo || null,
      error: result.error || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send test auto-reply',
      error: error.message
    });
  }
});

// Add email forwarding endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, newsletter } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }
    
    // Log the contact form submission
    console.log('📧 Contact form submission received:', { 
      name, 
      email, 
      subject, 
      timestamp: new Date().toISOString(),
      ip: req.ip || 'Unknown'
    });
    
    // Prepare form data for email service with production enhancements
    const formData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      newsletter: newsletter || false,
      ip: req.ip || req.connection.remoteAddress || 'Unknown',
      userAgent: req.get('User-Agent') || 'Unknown',
      timestamp: new Date().toISOString(),
      referrer: req.get('Referer') || 'Direct'
    };
    
    let result;
    
    if (emailService) {
      // Use email service if available
      result = await emailService.forwardContactForm(formData);
    } else {
      // Fallback to console logging
      const forwardToEmail = 'codeex.care@gmail.com';
      console.log(`\n📧 EMAIL FORWARDING TO: ${forwardToEmail}`);
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log(`Newsletter: ${newsletter ? 'Yes' : 'No'}`);
      console.log(`Timestamp: ${formData.timestamp}`);
      
      result = {
        success: true,
        fallback: true,
        forwardedTo: forwardToEmail,
        method: 'console-log'
      };
    }
    
    // Return success response
    res.json({ 
      success: true, 
      message: 'Your message has been forwarded successfully! Check your email for a confirmation message.',
      forwardedTo: 'codeex.care@gmail.com',
      autoReplySent: result.autoReplySent || false,
      timestamp: formData.timestamp,
      method: result.method || 'email'
    });
    
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to forward your message. Please try again later.' 
    });
  }
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/memories', (req, res) => {
  res.sendFile(path.join(__dirname, 'memories.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, 'gallery.html'));
});

app.get('/brick-wall', (req, res) => {
  res.sendFile(path.join(__dirname, 'brick-wall.html'));
});

// Friend pages
app.get('/friends/:name', (req, res) => {
  const friendFile = path.join(__dirname, 'friends', `${req.params.name}.html`);
  res.sendFile(friendFile, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, '404.html'));
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Walle Pals server running on:`);
  console.log(`   Local:    http://localhost:${PORT}`);
  console.log(`   Network:  http://192.168.31.234:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`🌟 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server accessible from any device on your network!`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;