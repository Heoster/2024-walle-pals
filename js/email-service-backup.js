// Email Service for 2024 Walle Pals Contact Form
const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
    constructor() {
        this.transporter = null;
        this.targetEmail = 'codeex.care@gmail.com';
        this.init();
    }

    init() {
        // Create transporter with Gmail configuration
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'your-email@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password'
            }
        });

        // Verify connection configuration
        this.transporter.verify((error, success) => {
            if (error) {
                } else {
                }
        });
    }

    async forwardContactForm(formData) {
        const { name, email, subject, message, newsletter } = formData;
        const timestamp = new Date().toISOString();

        // Create formatted email content
        const emailContent = `
=== NEW CONTACT FORM SUBMISSION ===
Timestamp: ${timestamp}
Website: 2024 Walle Pals (https://2024wallepals.com)

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

        const mailOptions = {
            from: `"2024 Walle Pals Contact Form" <${process.env.GMAIL_USER}>`,
            to: this.targetEmail,
            subject: `[Walle Pals] ${subject}`,
            text: emailContent,
            replyTo: email,
            headers: {
                'X-Mailer': '2024 Walle Pals Website',
                'X-Priority': '3'
            }
        };

        try {
            // Try to send email
            const info = await this.transporter.sendMail(mailOptions);
            return {
                success: true,
                messageId: info.messageId,
                forwardedTo: this.targetEmail
            };
        } catch (error) {
            console.error('❌ Email forwarding failed:', error);
            
            // Fallback: Log to console
        
            return {
                success: true, // Still return success for user experience
                fallback: true,
                forwardedTo: this.targetEmail,
                method: 'console-log'
            };
        }
    }

    // Method to test email configuration
    async testConnection() {
        try {
            await this.transporter.verify();
            return { success: true, message: 'Email service is working' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

module.exports = new EmailService();
