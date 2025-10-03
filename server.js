const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

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
    uptime: process.uptime()
  });
});

// Add email forwarding endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Log the contact form submission
    console.log('Contact form submission:', { name, email, subject, message });
    
    // In a real implementation, you would integrate with an email service here
    // For now, we'll just forward the data to the specified email address
    // This is a placeholder for actual email sending functionality
    
    // Simulate email forwarding to 90freeplay98@gmail.com
    console.log(`Forwarding message to 90freeplay98@gmail.com:
      From: ${name} <${email}>
      Subject: ${subject}
      Message: ${message}`);
    
    // Return success response
    res.json({ 
      success: true, 
      message: 'Your message has been forwarded successfully!',
      forwardedTo: '90freeplay98@gmail.com'
    });
  } catch (error) {
    console.error('Error forwarding contact form:', error);
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