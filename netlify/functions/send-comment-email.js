// NETLIFY FUNCTION - Send Comment Email Notification
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
    const { friend, name, email, message } = JSON.parse(event.body);

    // Log the comment (in production, send actual email)
    console.log('New comment received:', {
      friend,
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });

    // In production, integrate with email service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    
    // For now, just return success
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Comment is not received'
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to process comment',
        details: error.message
      })
    };
  }
};
