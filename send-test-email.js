// Quick test script to send email to 90freeplay98@gmail.com
const emailService = require('./js/email-service');

async function sendTestEmail() {
    console.log('🧪 Testing email service...');
    
    // Test email data
    const testFormData = {
        name: 'Test User',
        email: '90freeplay98@gmail.com',
        subject: 'Test Email from 2024 Walle Pals',
        message: 'This is a test email to verify the email forwarding system is working correctly. If you receive this, the system is operational!',
        newsletter: true,
        ip: '127.0.0.1',
        userAgent: 'Test Script',
        timestamp: new Date().toISOString()
    };
    
    try {
        console.log('📧 Sending test emails...');
        const result = await emailService.forwardContactForm(testFormData);
        
        if (result.success) {
            console.log('✅ Test emails sent successfully!');
            console.log('📨 Admin notification sent to: codeex.care@gmail.com');
            console.log('📨 Auto-reply sent to: 90freeplay98@gmail.com');
            console.log('🆔 Admin Message ID:', result.adminMessageId);
            console.log('🆔 User Message ID:', result.userMessageId);
            console.log('📧 Check both inboxes for the emails!');
        } else {
            console.log('⚠️ Email sent with fallback method');
            console.log('📝 Check console logs above for email content');
        }
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
sendTestEmail();