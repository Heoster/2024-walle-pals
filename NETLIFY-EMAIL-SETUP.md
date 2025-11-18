# Netlify Email Service Setup Guide

## ✅ Status
The email service is fully functional and tested locally. The Netlify serverless function is ready for production.

## 🚀 Deployment Steps

### 1. Set Environment Variables in Netlify

Go to your Netlify dashboard and add these environment variables:

**Site Settings → Build & Deploy → Environment**

```
GMAIL_USER=codeex.care@gmail.com
GMAIL_APP_PASSWORD=fgidthuljvsaiego
```

### 2. Verify Configuration

The following files are configured and ready:

- ✅ `netlify/functions/contact-form.js` - Serverless function for contact form
- ✅ `netlify.toml` - Routing configured for `/api/contact`
- ✅ `package.json` - nodemailer dependency included
- ✅ `.env` - Local development environment variables

### 3. API Endpoint

Once deployed, the contact form will be available at:

```
POST https://2024wallepals.netlify.app/.netlify/functions/contact-form
```

Or via the redirect:

```
POST https://2024wallepals.netlify.app/api/contact
```

### 4. Request Format

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "subject": "Message Subject",
  "message": "Message content",
  "newsletter": true
}
```

### 5. Response Format

**Success (200):**
```json
{
  "success": true,
  "message": "Your message has been forwarded successfully! Check your email for a confirmation message.",
  "forwardedTo": "codeex.care@gmail.com",
  "timestamp": "2025-11-18T10:49:14.226Z"
}
```

**Error (400/500):**
```json
{
  "error": "Error message",
  "details": "Additional details"
}
```

## 📧 Email Features

### Admin Notification
- Sent to: `codeex.care@gmail.com`
- Contains: Full contact form submission details
- Reply-To: User's email address

### User Auto-Reply
- Sent to: User's email address
- Contains: Styled HTML email with:
  - Confirmation of message receipt
  - Expected response time (1-2 working days)
  - Links to website and memories
  - Professional branding

## 🧪 Testing

### Local Testing
```bash
node -r dotenv/config test-netlify-function.js
```

### Production Testing
After deployment, test the endpoint:
```bash
curl -X POST https://2024wallepals.netlify.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Test message"
  }'
```

## 🔒 Security Features

- ✅ Email format validation
- ✅ Required field validation
- ✅ CORS headers configured
- ✅ Rate limiting ready (can be enabled in production)
- ✅ Error handling with fallback

## 📝 Notes

- Gmail App Password is required (not your regular Gmail password)
- Generate at: https://myaccount.google.com/apppasswords
- The function uses connection pooling for optimal performance
- Emails are sent asynchronously for fast response times

## ✨ Next Steps

1. Push code to GitHub
2. Netlify will auto-deploy
3. Add environment variables in Netlify dashboard
4. Test the contact form on the live site
5. Monitor function logs in Netlify dashboard
