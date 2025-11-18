// NETLIFY FUNCTION - Contact Form Email Handler
const nodemailer = require('nodemailer');

// Initialize email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Create styled HTML email template for user auto-reply
function createUserAutoReplyHTML(name, subject) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting 2024 Walle Pals</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .header .emoji {
            font-size: 48px;
            margin-bottom: 10px;
            display: block;
        }
        .content {
            padding: 40px 30px;
            line-height: 1.6;
        }
        .greeting {
            font-size: 20px;
            color: #2c3e50;
            margin-bottom: 20px;
            font-weight: 600;
        }
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 25px;
        }
        .highlight-box {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            margin: 25px 0;
            text-align: center;
        }
        .highlight-box h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
        }
        .highlight-box p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .features {
            display: flex;
            justify-content: space-around;
            margin: 30px 0;
            flex-wrap: wrap;
        }
        .feature {
            text-align: center;
            flex: 1;
            min-width: 150px;
            margin: 10px;
        }
        .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
            display: block;
        }
        .feature h4 {
            margin: 0 0 5px 0;
            color: #2c3e50;
            font-size: 14px;
        }
        .feature p {
            margin: 0;
            color: #7f8c8d;
            font-size: 12px;
        }
        .cta-section {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-radius: 12px;
            margin: 25px 0;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin: 10px;
            transition: transform 0.3s ease;
        }
        .cta-button:hover {
            transform: translateY(-2px);
        }
        .footer {
            background: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .footer p {
            margin: 5px 0;
            font-size: 14px;
        }
        .social-links {
            margin: 20px 0;
        }
        .social-links a {
            color: #3498db;
            text-decoration: none;
            margin: 0 10px;
            font-size: 14px;
        }
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 12px;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .features {
                flex-direction: column;
            }
            .feature {
                margin: 15px 0;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <span class="emoji">🏠</span>
            <h1>2024 Walle Pals</h1>
        </div>
        
        <div class="content">
            <div class="greeting">Hi ${name}! 👋</div>
            
            <div class="message">
                Thank you so much for reaching out to us through our website! We're thrilled to hear from you.
            </div>
            
            <div class="highlight-box">
                <h3>📧 Your Message Received!</h3>
                <p>Subject: "${subject}"</p>
                <p><strong>Heoster will reach out to you within 1-2 working days</strong></p>
            </div>
            
            <div class="message">
                Your message has been forwarded to our team, and <strong>Heoster</strong> will personally get back to you as soon as possible. We value every connection and can't wait to chat with you!
            </div>
            
            <div class="features">
                <div class="feature">
                    <span class="feature-icon">⚡</span>
                    <h4>Quick Response</h4>
                    <p>1-2 working days</p>
                </div>
                <div class="feature">
                    <span class="feature-icon">👥</span>
                    <h4>Personal Touch</h4>
                    <p>Direct from Heoster</p>
                </div>
                <div class="feature">
                    <span class="feature-icon">💝</span>
                    <h4>Friend Circle</h4>
                    <p>Join our community</p>
                </div>
            </div>
            
            <div class="cta-section">
                <h3>While You Wait...</h3>
                <p>Explore our amazing friend circle and memories!</p>
                <a href="https://2024wallepals.netlify.app" class="cta-button">🌟 Visit Our Website</a>
                <a href="https://2024wallepals.netlify.app/memories.html" class="cta-button">📸 View Memories</a>
            </div>
            
            <div class="message">
                <strong>What happens next?</strong><br>
                • Heoster will review your message personally<br>
                • You'll receive a detailed response within 1-2 working days<br>
                • We might invite you to connect with our friend circle!<br>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>2024 Walle Pals</strong></p>
            <p>Friends Forever • Memories That Last</p>
            <div class="social-links">
                <a href="mailto:codeex.care@gmail.com">📧 Email Us</a>
                <a href="https://2024wallepals.netlify.app">🌐 Website</a>
            </div>
            <p style="font-size: 12px; opacity: 0.8; margin-top: 20px;">
                This is an automated response. Please don't reply to this email.<br>
                For urgent matters, contact us directly at codeex.care@gmail.com
            </p>
        </div>
    </div>
</body>
</html>`;
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { name, email, subject, message, newsletter } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'All fields are required' })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Check environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Missing email configuration');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Email service not configured' })
      };
    }

    const timestamp = new Date().toISOString();
    const targetEmail = 'codeex.care@gmail.com';

    // Create admin notification email
    const adminEmailContent = `
=== NEW CONTACT FORM SUBMISSION ===
Timestamp: ${timestamp}
Website: 2024 Walle Pals (https://2024wallepals.netlify.app)

FROM:
Name: ${name}
Email: ${email}

SUBJECT: ${subject}

MESSAGE:
${message}

ADDITIONAL INFO:
Newsletter Subscription: ${newsletter ? 'Yes' : 'No'}
Submitted via: Contact Form

=== END OF MESSAGE ===

---
This email was automatically forwarded from the 2024 Walle Pals website contact form.
To reply to the sender, use: ${email}
`;

    // Send admin notification
    const adminMailOptions = {
      from: `"2024 Walle Pals Contact Form" <${process.env.GMAIL_USER}>`,
      to: targetEmail,
      subject: `[Walle Pals] ${subject}`,
      text: adminEmailContent,
      replyTo: email
    };

    // Send user auto-reply
    const userMailOptions = {
      from: `"2024 Walle Pals" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting 2024 Walle Pals! 🏠`,
      html: createUserAutoReplyHTML(name, subject)
    };

    // Send both emails
    const [adminInfo, userInfo] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    console.log('✅ Emails sent successfully', {
      adminMessageId: adminInfo.messageId,
      userMessageId: userInfo.messageId,
      timestamp
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Your message has been forwarded successfully! Check your email for a confirmation message.',
        forwardedTo: targetEmail,
        timestamp
      })
    };
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to forward your message. Please try again later.',
        details: error.message
      })
    };
  }
};
