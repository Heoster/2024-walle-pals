// Netlify Function for Contact Form Email Forwarding
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
    };
  }

  try {
    // Parse form data
    const { name, email, subject, message, newsletter } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: 'All fields are required' })
      };
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      },
      tls: { rejectUnauthorized: true }
    });

    // Admin email content
    const adminEmail = {
      from: `"2024 Walle Pals" <${process.env.GMAIL_USER}>`,
      to: process.env.FORWARD_TO_EMAIL || 'codeex.care@gmail.com',
      subject: `[Walle Pals] ${subject}`,
      text: `
NEW CONTACT FORM SUBMISSION
From: ${name} <${email}>
Subject: ${subject}
Message: ${message}
Newsletter: ${newsletter ? 'Yes' : 'No'}
Timestamp: ${new Date().toISOString()}
      `,
      replyTo: email
    };

    // User auto-reply email
    const userEmail = {
      from: `"2024 Walle Pals" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting 2024 Walle Pals! 🏠',
      html: createAutoReplyHTML(name, subject)
    };

    // Send both emails
    await transporter.sendMail(adminEmail);
    await transporter.sendMail(userEmail);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully! Check your inbox for confirmation.',
        forwardedTo: 'codeex.care@gmail.com'
      })
    };

  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Failed to send email. Please try again.'
      })
    };
  }
};

function createAutoReplyHTML(name, subject) {
  return `<!DOCTYPE html><html><head><style>
body{margin:0;padding:0;font-family:Arial,sans-serif;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%)}
.container{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden}
.header{background:linear-gradient(135deg,#4facfe 0%,#00f2fe 100%);padding:40px 30px;text-align:center;color:#fff}
.header h1{margin:0;font-size:28px}.emoji{font-size:48px;display:block;margin-bottom:10px}
.content{padding:40px 30px;line-height:1.6}.greeting{font-size:20px;color:#2c3e50;margin-bottom:20px;font-weight:600}
.message{font-size:16px;color:#555;margin-bottom:25px}
.highlight{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);color:#fff;padding:20px;border-radius:12px;margin:25px 0;text-align:center}
.highlight h3{margin:0 0 10px 0;font-size:18px}.highlight p{margin:0;font-size:14px}
.footer{background:#2c3e50;color:#fff;padding:30px;text-align:center}.footer p{margin:5px 0;font-size:14px}
</style></head><body><div class="container">
<div class="header"><span class="emoji">🏠</span><h1>2024 Walle Pals</h1></div>
<div class="content"><div class="greeting">Hi ${name}! 👋</div>
<div class="message">Thank you so much for reaching out to us through our website! We're thrilled to hear from you.</div>
<div class="highlight"><h3>📧 Your Message Received!</h3><p>Subject: "${subject}"</p>
<p><strong>Heoster will reach out to you within 1-2 working days</strong></p></div>
<div class="message">Your message has been forwarded to our team, and <strong>Heoster</strong> will personally get back to you as soon as possible.</div>
</div><div class="footer"><p><strong>2024 Walle Pals</strong></p><p>Friends Forever • Memories That Last</p>
<p style="font-size:12px;opacity:0.8;margin-top:20px">This is an automated response. For urgent matters, contact us at codeex.care@gmail.com</p>
</div></div></body></html>`;
}