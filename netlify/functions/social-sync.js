// Netlify Function for Social Data Synchronization
// This function provides server-side storage for likes, views, and shares
// Works with Netlify's free tier

const { createHash } = require('crypto');

// Simple in-memory storage (for demo - use a database in production)
let socialData = {
  likes: {},
  views: {},
  shares: {},
  totalLikes: 0,
  totalViews: 0,
  totalShares: 0,
  lastUpdated: new Date().toISOString()
};

// Rate limiting storage
const rateLimitStore = new Map();

// Helper function to generate a simple hash for rate limiting
function getClientId(event) {
  const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
  const userAgent = event.headers['user-agent'] || 'unknown';
  return createHash('md5').update(ip + userAgent).digest('hex');
}

// Rate limiting function
function isRateLimited(clientId) {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientId) || { count: 0, resetTime: now + 60000 }; // 1 minute window
  
  if (now > clientData.resetTime) {
    // Reset the rate limit window
    clientData.count = 0;
    clientData.resetTime = now + 60000;
  }
  
  if (clientData.count >= 30) { // 30 requests per minute
    return true;
  }
  
  clientData.count++;
  rateLimitStore.set(clientId, clientData);
  return false;
}

// Validate social data
function validateSocialData(data) {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  // Check for required properties
  const requiredProps = ['likes', 'views', 'shares', 'totalLikes', 'totalViews', 'totalShares'];
  for (const prop of requiredProps) {
    if (!(prop in data)) {
      return false;
    }
  }
  
  // Validate that totals are numbers
  if (typeof data.totalLikes !== 'number' || 
      typeof data.totalViews !== 'number' || 
      typeof data.totalShares !== 'number') {
    return false;
  }
  
  return true;
}

// Merge social data safely
function mergeSocialData(clientData, serverData) {
  const merged = {
    likes: { ...serverData.likes },
    views: { ...serverData.views },
    shares: { ...serverData.shares },
    totalLikes: serverData.totalLikes || 0,
    totalViews: serverData.totalViews || 0,
    totalShares: serverData.totalShares || 0
  };
  
  // Merge likes (take the higher value to prevent data loss)
  Object.keys(clientData.likes || {}).forEach(key => {
    merged.likes[key] = Math.max(merged.likes[key] || 0, clientData.likes[key] || 0);
  });
  
  // Merge views (additive)
  Object.keys(clientData.views || {}).forEach(key => {
    merged.views[key] = (merged.views[key] || 0) + (clientData.views[key] || 0);
  });
  
  // Merge shares (additive)
  Object.keys(clientData.shares || {}).forEach(key => {
    merged.shares[key] = (merged.shares[key] || 0) + (clientData.shares[key] || 0);
  });
  
  // Recalculate totals
  merged.totalLikes = Object.values(merged.likes).reduce((sum, val) => sum + val, 0);
  merged.totalViews = Object.values(merged.views).reduce((sum, val) => sum + val, 0);
  merged.totalShares = Object.values(merged.shares).reduce((sum, val) => sum + val, 0);
  
  merged.lastUpdated = new Date().toISOString();
  
  return merged;
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  try {
    const clientId = getClientId(event);
    
    // Check rate limiting
    if (isRateLimited(clientId)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: 60
        })
      };
    }
    
    // Handle GET requests - return current social data
    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: socialData,
          timestamp: new Date().toISOString()
        })
      };
    }
    
    // Handle POST requests - sync social data
    if (event.httpMethod === 'POST') {
      let clientData;
      
      try {
        clientData = JSON.parse(event.body);
      } catch (parseError) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Invalid JSON in request body',
            details: parseError.message
          })
        };
      }
      
      // Validate client data
      if (!validateSocialData(clientData)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Invalid social data format'
          })
        };
      }
      
      // Merge client data with server data
      socialData = mergeSocialData(clientData, socialData);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          data: socialData,
          message: 'Social data synchronized successfully',
          timestamp: new Date().toISOString()
        })
      };
    }
    
    // Method not allowed
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        error: 'Method not allowed',
        allowedMethods: ['GET', 'POST', 'OPTIONS']
      })
    };
    
  } catch (error) {
    console.error('Social sync error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: 'Failed to process social data',
        timestamp: new Date().toISOString()
      })
    };
  }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports.validateSocialData = validateSocialData;
  module.exports.mergeSocialData = mergeSocialData;
  module.exports.isRateLimited = isRateLimited;
}