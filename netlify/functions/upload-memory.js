// Netlify Function - Memory Upload Handler
const nodemailer = require('nodemailer');
const busboy = require('busboy');

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
    // Parse multipart form data
    const bb = busboy({ headers: event.headers });
    const fields = {};
    const files = [];

    return new Promise((resolve) => {
      bb.on('file', (fieldname, file, info) => {
        const chunks = [];
        file.on('data', (data) => {
          chunks.push(data);
        });
        file.on('end', () => {
          files.push({
            filename: info.filename,
            mimetype: info.mimeType,
            data: Buffer.concat(chunks)
          });
        });
      });

      bb.on('field', (fieldname, val) => {
        fields[fieldname] = val;
      });

      bb.on('close', async () => {
        try {
          // Validate required fields
          if (!fields.title || !fields.date || !fields.category || !fields.description || !fields.submitter) {
            return resolve({
              statusCode: 400,
              headers,
              body: JSON.stringify({ error: 'Missing required fields' })
            });
          }

          // Parse participants and tags
          let participants = [];
          let tags = [];
          
          try {
            if (fields.participants) {
              participants = JSON.parse(fields.participants);
            }
            if (fields.tags) {
              tags = JSON.parse(fields.tags);
            }
          } catch (e) {
            console.warn('Could not parse participants or tags');
          }

          // Create email content
          const emailContent = `
=== NEW MEMORY SUBMISSION ===
Timestamp: ${new Date().toISOString()}

MEMORY DETAILS:
Title: ${fields.title}
Date: ${fields.date}
Category: ${fields.category}
Location: ${fields.location || 'Not specified'}
Mood: ${fields.mood || 'Not specified'}
Submitter: ${fields.submitter}

DESCRIPTION:
${fields.description}

PARTICIPANTS:
${participants.length > 0 ? participants.join(', ') : 'None specified'}

TAGS:
${tags.length > 0 ? tags.join(', ') : 'None'}

FILES ATTACHED:
${files.length > 0 ? files.map(f => `- ${f.filename} (${f.mimetype})`).join('\n') : 'No files'}

=== END OF SUBMISSION ===
          `;

          // Prepare attachments
          const attachments = files.map(file => ({
            filename: file.filename,
            content: file.data,
            contentType: file.mimetype
          }));

          // Send email
          const mailOptions = {
            from: `"2024 Walle Pals Memory Upload" <${process.env.GMAIL_USER}>`,
            to: 'codeex.care@gmail.com',
            subject: `📸 New Memory: ${fields.title}`,
            text: emailContent,
            attachments: attachments
          };

          const info = await transporter.sendMail(mailOptions);

          console.log('✅ Memory email sent:', {
            messageId: info.messageId,
            title: fields.title,
            submitter: fields.submitter,
            filesCount: files.length
          });

          return resolve({
            statusCode: 200,
            headers,
            body: JSON.stringify({
              success: true,
              message: 'Memory uploaded successfully!',
              messageId: info.messageId,
              filesCount: files.length
            })
          });

        } catch (error) {
          console.error('❌ Error processing memory upload:', error);
          return resolve({
            statusCode: 500,
            headers,
            body: JSON.stringify({
              success: false,
              error: 'Failed to upload memory',
              details: error.message
            })
          });
        }
      });

      bb.write(event.body);
      bb.end();
    });

  } catch (error) {
    console.error('❌ Error in upload handler:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Server error',
        details: error.message
      })
    };
  }
};
