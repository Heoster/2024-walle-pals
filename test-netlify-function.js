// Test script for Netlify contact form function
const handler = require('./netlify/functions/contact-form').handler;

async function testNetlifyFunction() {
  console.log('🧪 Testing Netlify contact form function...\n');

  const testEvent = {
    httpMethod: 'POST',
    body: JSON.stringify({
      name: 'Test User',
      email: '90freeplay98@gmail.com',
      subject: 'Test Email from Netlify Function',
      message: 'This is a test email from the Netlify serverless function to verify it works in production.',
      newsletter: true
    })
  };

  try {
    console.log('📧 Sending test contact form...');
    const response = await handler(testEvent);

    console.log('\n✅ Response received:');
    console.log('Status:', response.statusCode);
    console.log('Body:', JSON.parse(response.body));

    if (response.statusCode === 200) {
      console.log('\n🎉 Netlify function is working correctly!');
      console.log('📨 Check your email for the confirmation message.');
    } else {
      console.log('\n⚠️ Function returned non-200 status');
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testNetlifyFunction();
