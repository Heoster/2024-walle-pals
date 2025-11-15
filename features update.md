# 🎯 Complete Friend Pages + Database System

## **PART 1: Database Setup with Supabase**

### **Step 1: Supabase Setup**

```bash
# 1. Go to https://supabase.com and create a free account
# 2. Create a new project
# 3. Note your credentials:
#    - Project URL
#    - Anon/Public Key
#    - Service Role Key (keep secret!)
```

### **Step 2: Database Schema (SQL)**

```sql
-- Run this in Supabase SQL Editor

-- 1. FRIENDS TABLE
CREATE TABLE friends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  tagline TEXT,
  bio TEXT,
  emoji VARCHAR(10),
  instagram VARCHAR(100),
  birthday DATE,
  hobbies TEXT[],
  favorite_quote TEXT,
  profile_image VARCHAR(500),
  cover_image VARCHAR(500),
  join_date DATE DEFAULT CURRENT_DATE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COMMENTS TABLE
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  friend_id UUID REFERENCES friends(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LIKES TABLE (Track individual likes)
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  friend_id UUID REFERENCES friends(id) ON DELETE CASCADE,
  user_identifier VARCHAR(255) NOT NULL, -- IP or session ID
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(friend_id, user_identifier)
);

-- 4. NOTES TABLE (Wall of messages)
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  friend_id UUID REFERENCES friends(id) ON DELETE CASCADE,
  author_name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  color VARCHAR(20) DEFAULT '#FFD700',
  position_x INTEGER,
  position_y INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MEMORIES TABLE
CREATE TABLE memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  friend_id UUID REFERENCES friends(id) ON DELETE CASCADE,
  title VARCHAR(200),
  description TEXT,
  image_url VARCHAR(500),
  video_url VARCHAR(500),
  memory_date DATE,
  tags TEXT[],
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CHAT MESSAGES TABLE
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  friend_id UUID REFERENCES friends(id) ON DELETE CASCADE,
  sender_name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  is_friend BOOLEAN DEFAULT false, -- true if sent by the friend
  read_status BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ANALYTICS TABLE
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  friend_id UUID REFERENCES friends(id) ON DELETE CASCADE,
  user_identifier VARCHAR(255),
  referrer VARCHAR(500),
  device VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES for performance
CREATE INDEX idx_comments_friend ON comments(friend_id);
CREATE INDEX idx_likes_friend ON likes(friend_id);
CREATE INDEX idx_notes_friend ON notes(friend_id);
CREATE INDEX idx_memories_friend ON memories(friend_id);
CREATE INDEX idx_chat_friend ON chat_messages(friend_id);
CREATE INDEX idx_views_friend ON page_views(friend_id);

-- Enable Row Level Security (RLS)
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies (Allow public read, authenticated write)
CREATE POLICY "Allow public read access" ON friends FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Allow public read access" ON likes FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON notes FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON memories FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON chat_messages FOR SELECT USING (true);

-- Insert sample data for all 30 friends
INSERT INTO friends (name, slug, tagline, bio, emoji, instagram) VALUES
  ('Harsh', 'harsh', 'The Visionary Leader', 'Leading the pack with vision and determination', '🎯', '@harsh_official'),
  ('Parduman', 'parduman', 'The Quiet Genius', 'Brilliance speaks in silence', '🧠', '@parduman_'),
  ('Kartik', 'kartik', 'The Energizer', 'Bringing energy to every moment', '⚡', '@kartik.k'),
  ('Pankaj', 'pankaj', 'The Comedian', 'Laughter is the best medicine', '😂', '@pankaj_laughs'),
  ('Lakshay', 'lakshay', 'The Strategist', 'Master of planning and execution', '♟️', '@lakshay.strategist'),
  ('Pasandu', 'pasandu', 'The Creative Soul', 'Art in every breath', '🎨', '@pasandu_creates'),
  ('Vishesh', 'vishesh', 'The Philosopher', 'Deep thoughts, deeper conversations', '🤔', '@vishesh.thinks'),
  ('Sahil', 'sahil', 'The Adventurer', 'Life is an adventure', '🏔️', '@sahil.adventures'),
  ('Tushar', 'tushar', 'The Tech Wizard', 'Coding the future', '💻', '@tushar.dev'),
  ('Yougank', 'yougank', 'The Motivator', 'Inspiring greatness in others', '💪', '@yougank.motivates'),
  ('Masum', 'masum', 'The Peacemaker', 'Harmony in chaos', '☮️', '@masum.peace'),
  ('Shiv', 'shiv', 'The Problem Solver', 'Every problem has a solution', '🔧', '@shiv.solves'),
  ('Arijit', 'arijit', 'The Musician', 'Life is a melody', '🎵', '@arijit.music'),
  ('Pintu', 'pintu', 'The Optimist', 'Glass always half full', '🌞', '@pintu.positive'),
  ('Ayush', 'ayush', 'The Innovator', 'Innovation is my passion', '💡', '@ayush.innovates'),
  ('Shivaji', 'shivaji', 'The Warrior', 'Brave and bold', '⚔️', '@shivaji.warrior'),
  ('Sachin', 'sachin', 'The Champion', 'Winner mindset', '🏆', '@sachin.champ'),
  ('Varun', 'varun', 'The Explorer', 'Discovering new horizons', '🧭', '@varun.explores'),
  ('Hani', 'hani', 'The Dreamer', 'Dreams into reality', '✨', '@hani.dreams'),
  ('Anshul', 'anshul', 'The Artist', 'Creating beauty everywhere', '🖌️', '@anshul.art'),
  ('Abhishek', 'abhishek', 'The Achiever', 'Success is my journey', '🎖️', '@abhishek.achieves'),
  ('Arjun', 'arjun', 'The Protector', 'Guardian of friends', '🛡️', '@arjun.protects'),
  ('Dheraj', 'dheraj', 'The Loyal Friend', 'Loyalty above all', '🤝', '@dheraj.loyal'),
  ('Rajat', 'rajat', 'The Entertainer', 'Life of the party', '🎭', '@rajat.entertains'),
  ('Aditya', 'aditya', 'The Scholar', 'Knowledge is power', '📚', '@aditya.scholar'),
  ('Rudra', 'rudra', 'The Bold One', 'Fear is just a word', '🦁', '@rudra.bold'),
  ('Mudashir', 'mudashir', 'The Wise', 'Wisdom beyond years', '🦉', '@mudashir.wise'),
  ('Ravi', 'ravi', 'The Bright Star', 'Shining bright always', '⭐', '@ravi.shines'),
  ('Aashish', 'aashish', 'The Believer', 'Faith moves mountains', '🙏', '@aashish.believes'),
  ('Rijwaan', 'rijwaan', 'The Faithful', 'Trust and integrity', '💎', '@rijwaan.faithful');
```

---

## **PART 2: Netlify Functions (Backend API)**

### **Project Structure**
```
netlify/
├── functions/
│   ├── get-friend.js
│   ├── add-comment.js
│   ├── toggle-like.js
│   ├── add-note.js
│   ├── get-comments.js
│   ├── send-chat.js
│   ├── get-chats.js
│   └── track-view.js
```

### **1. Environment Variables Setup**

```bash
# In Netlify Dashboard > Site Settings > Environment Variables
# Add these:

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
```

### **2. Install Dependencies**

```json
// package.json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "netlify-lambda": "^2.0.16"
  },
  "scripts": {
    "build": "netlify-lambda build netlify/functions"
  }
}
```

### **3. Supabase Client Setup**

```javascript
// netlify/functions/utils/supabase.js

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

module.exports = { supabase };
```

### **4. Get Friend Data**

```javascript
// netlify/functions/get-friend.js

const { supabase } = require('./utils/supabase');

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

  try {
    const { slug } = event.queryStringParameters;

    if (!slug) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Slug is required' })
      };
    }

    // Get friend data
    const { data: friend, error } = await supabase
      .from('friends')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    if (!friend) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Friend not found' })
      };
    }

    // Get related data
    const [comments, likes, notes, memories] = await Promise.all([
      supabase
        .from('comments')
        .select('*')
        .eq('friend_id', friend.id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false }),
      
      supabase
        .from('likes')
        .select('count')
        .eq('friend_id', friend.id),
      
      supabase
        .from('notes')
        .select('*')
        .eq('friend_id', friend.id)
        .order('created_at', { ascending: false })
        .limit(20),
      
      supabase
        .from('memories')
        .select('*')
        .eq('friend_id', friend.id)
        .order('created_at', { ascending: false })
    ]);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        friend,
        comments: comments.data || [],
        likeCount: likes.data?.[0]?.count || 0,
        notes: notes.data || [],
        memories: memories.data || []
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message })
    };
  }
};
```

### **5. Add Comment Function**

```javascript
// netlify/functions/add-comment.js

const { supabase } = require('./utils/supabase');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

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
    const { friendId, authorName, authorEmail, content } = JSON.parse(event.body);

    // Validation
    if (!friendId || !authorName || !content) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Content moderation (basic)
    const badWords = ['spam', 'hate', 'offensive']; // Add your list
    const hasBadWords = badWords.some(word => 
      content.toLowerCase().includes(word)
    );

    // Insert comment
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        friend_id: friendId,
        author_name: authorName,
        author_email: authorEmail || null,
        content: content.trim(),
        is_approved: !hasBadWords // Auto-approve if clean
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        comment: data,
        message: hasBadWords 
          ? 'Comment submitted for review' 
          : 'Comment posted successfully'
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to add comment', details: error.message })
    };
  }
};
```

### **6. Toggle Like Function**

```javascript
// netlify/functions/toggle-like.js

const { supabase } = require('./utils/supabase');
const crypto = require('crypto');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

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
    const { friendId } = JSON.parse(event.body);
    
    // Generate user identifier (IP + User-Agent hash)
    const userIdentifier = crypto
      .createHash('sha256')
      .update(event.headers['client-ip'] + event.headers['user-agent'])
      .digest('hex');

    // Check if already liked
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('friend_id', friendId)
      .eq('user_identifier', userIdentifier)
      .single();

    let action;
    
    if (existingLike) {
      // Unlike
      await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);
      
      action = 'unliked';
    } else {
      // Like
      await supabase
        .from('likes')
        .insert([{
          friend_id: friendId,
          user_identifier: userIdentifier
        }]);
      
      action = 'liked';
    }

    // Get updated count
    const { count } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('friend_id', friendId);

    // Update friend's like_count
    await supabase
      .from('friends')
      .update({ like_count: count })
      .eq('id', friendId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        action,
        likeCount: count
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to toggle like', details: error.message })
    };
  }
};
```

### **7. Add Note Function**

```javascript
// netlify/functions/add-note.js

const { supabase } = require('./utils/supabase');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

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
    const { friendId, authorName, message, color, positionX, positionY } = JSON.parse(event.body);

    if (!friendId || !authorName || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Limit message length
    if (message.length > 200) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message too long (max 200 characters)' })
      };
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([{
        friend_id: friendId,
        author_name: authorName.trim(),
        message: message.trim(),
        color: color || '#FFD700',
        position_x: positionX || Math.floor(Math.random() * 80),
        position_y: positionY || Math.floor(Math.random() * 80)
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        note: data
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to add note', details: error.message })
    };
  }
};
```

### **8. Chat Functions**

```javascript
// netlify/functions/send-chat.js

const { supabase } = require('./utils/supabase');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

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
    const { friendId, senderName, message } = JSON.parse(event.body);

    if (!friendId || !senderName || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        friend_id: friendId,
        sender_name: senderName.trim(),
        message: message.trim(),
        is_friend: false
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: data
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to send message', details: error.message })
    };
  }
};
```

```javascript
// netlify/functions/get-chats.js

const { supabase } = require('./utils/supabase');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { friendId } = event.queryStringParameters;

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('friend_id', friendId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        messages: data || []
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to get messages' })
    };
  }
};
```

### **9. Track Page Views**

```javascript
// netlify/functions/track-view.js

const { supabase } = require('./utils/supabase');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { friendId } = JSON.parse(event.body);
    
    const userAgent = event.headers['user-agent'] || 'unknown';
    const isMobile = /mobile/i.test(userAgent);
    const device = isMobile ? 'mobile' : 'desktop';

    // Insert view
    await supabase
      .from('page_views')
      .insert([{
        friend_id: friendId,
        user_identifier: event.headers['client-ip'],
        referrer: event.headers['referer'] || 'direct',
        device
      }]);

    // Increment view count
    await supabase.rpc('increment_view_count', { friend_id: friendId });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to track view' })
    };
  }
};
```

**Add this SQL function to Supabase:**
```sql
CREATE OR REPLACE FUNCTION increment_view_count(friend_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE friends 
  SET view_count = view_count + 1 
  WHERE id = friend_id;
END;
$$ LANGUAGE plpgsql;
```

---

## **PART 3: Friend Page Template**

### **HTML Structure**

```html
<!-- friends/template.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title id="page-title">Friend Profile - Walle Pals</title>
  
  <!-- Meta Tags -->
  <meta name="description" id="page-description" content="">
  <meta property="og:title" id="og-title" content="">
  <meta property="og:description" id="og-description" content="">
  <meta property="og:image" id="og-image" content="">
  
  <!-- Styles -->
  <link rel="stylesheet" href="/css/main.css">
  <link rel="stylesheet" href="/css/friend-page.css">
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
</head>
<body>
  <!-- Loading Screen -->
  <div class="loading-screen" id="loading-screen">
    <div class="loader">
      <div class="loader-circle"></div>
      <p>Loading Profile...</p>
    </div>
  </div>

  <!-- Navigation -->
  <nav class="navbar-premium" id="navbar">
    <!-- Same nav from homepage -->
  </nav>

  <!-- Friend Profile Hero -->
  <section class="friend-hero" id="friend-hero">
    <div class="hero-cover" id="hero-cover"></div>
    
    <div class="hero-content">
      <div class="profile-main">
        <div class="profile-avatar" id="profile-avatar">
          <img src="" alt="" id="avatar-img">
          <div class="avatar-border"></div>
        </div>
        
        <div class="profile-info">
          <div class="profile-badge" id="profile-badge">
            <span id="friend-emoji">🎯</span>
          </div>
          
          <h1 class="profile-name" id="friend-name">Loading...</h1>
          <p class="profile-tagline" id="friend-tagline"></p>
          
          <!-- Stats -->
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-icon">👁️</span>
              <div>
                <strong id="view-count">0</strong>
                <span>Views</span>
              </div>
            </div>
            
            <div class="stat-item">
              <span class="stat-icon">❤️</span>
              <div>
                <strong id="like-count">0</strong>
                <span>Likes</span>
              </div>
            </div>
            
            <div class="stat-item">
              <span class="stat-icon">💬</span>
              <div>
                <strong id="comment-count">0</strong>
                <span>Comments</span>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="profile-actions">
            <button class="btn-action btn-like" id="btn-like">
              <span class="icon">❤️</span>
              <span class="text">Like</span>
            </button>
            
            <button class="btn-action btn-comment" id="btn-comment">
              <span class="icon">💬</span>
              <span class="text">Comment</span>
            </button>
            
            <button class="btn-action btn-note" id="btn-note">
              <span class="icon">📝</span>
              <span class="text">Leave Note</span>
            </button>
            
            <a href="#" class="btn-action btn-instagram" id="btn-instagram" target="_blank">
              <span class="icon">📸</span>
              <span class="text">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Bio Section -->
  <section class="bio-section">
    <div class="container">
      <div class="bio-grid">
        <!-- About -->
        <div class="bio-card">
          <h3>📖 About</h3>
          <p id="friend-bio">Loading bio...</p>
          
          <div class="bio-details">
            <div class="detail-item">
              <span class="label">🎂 Birthday:</span>
              <span class="value" id="friend-birthday">-</span>
            </div>
            <div class="detail-item">
              <span class="label">🎯 Hobbies:</span>
              <span class="value" id="friend-hobbies">-</span>
            </div>
            <div class="detail-item">
              <span class="label">💭 Quote:</span>
              <blockquote id="friend-quote">-</blockquote>
            </div>
          </div>
        </div>

        <!-- Quick Info -->
        <div class="bio-card">
          <h3>✨ Quick Facts</h3>
          <ul class="facts-list" id="facts-list">
            <li>Member since <strong id="join-date">2024</strong></li>
            <li>Part of <strong>Walle Pals</strong> circle</li>
            <li>Total memories: <strong id="memory-count">0</strong></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Memories Section -->
  <section class="memories-section">
    <div class="container">
      <h2 class="section-title">📸 Shared Memories</h2>
      
      <div class="memories-grid" id="memories-grid">
        <!-- Dynamically loaded -->
      </div>
    </div>
  </section>

  <!-- Notes Wall -->
  <section class="notes-wall-section">
    <div class="container">
      <h2 class="section-title">📌 Wall of Love</h2>
      <p class="section-description">Leave a sticky note for this friend!</p>
      
      <div class="notes-container" id="notes-container">
        <!-- Sticky notes loaded here -->
      </div>
    </div>
  </section>

  <!-- Comments Section -->
  <section class="comments-section">
    <div class="container">
      <h2 class="section-title">💬 Comments (<span id="comments-count">0</span>)</h2>
      
      <div class="comments-list" id="comments-list">
        <!-- Comments loaded here -->
      </div>
      
      <button class="btn-load-more" id="load-more-comments" style="display: none;">
        Load More Comments
      </button>
    </div>
  </section>

  <!-- Chat Widget (Floating) -->
  <div class="chat-widget" id="chat-widget">
    <button class="chat-toggle" id="chat-toggle">
      <span class="chat-icon">💬</span>
      <span class="chat-badge" id="chat-badge">0</span>
    </button>
    
    <div class="chat-window" id="chat-window">
      <div class="chat-header">
        <h4>Chat with <span id="chat-friend-name"></span></h4>
        <button class="chat-close" id="chat-close">✕</button>
      </div>
      
      <div class="chat-messages" id="chat-messages">
        <!-- Messages here -->
      </div>
      
      <form class="chat-form" id="chat-form">
        <input 
          type="text" 
          placeholder="Type a message..." 
          id="chat-input"
          maxlength="500"
          required
        >
        <button type="submit">Send</button>
      </form>
    </div>
  </div>

  <!-- Modals -->
  
  <!-- Comment Modal -->
  <div class="modal" id="comment-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>💬 Leave a Comment</h3>
        <button class="modal-close" data-modal="comment-modal">✕</button>
      </div>
      
      <form class="modal-form" id="comment-form">
        <div class="form-group">
          <label for="comment-name">Your Name *</label>
          <input 
            type="text" 
            id="comment-name" 
            required 
            maxlength="100"
            placeholder="Enter your name"
          >
        </div>
        
        <div class="form-group">
          <label for="comment-email">Email (optional)</label>
          <input 
            type="email" 
            id="comment-email" 
            maxlength="255"
            placeholder="your@email.com"
          >
        </div>
        
        <div class="form-group">
          <label for="comment-text">Your Comment *</label>
          <textarea 
            id="comment-text" 
            required 
            maxlength="1000"
            rows="5"
            placeholder="Share your thoughts..."
          ></textarea>
          <span class="char-count">
            <span id="comment-char-count">0</span>/1000
          </span>
        </div>
        
        <button type="submit" class="btn-submit" id="submit-comment">
          Post Comment
        </button>
      </form>
    </div>
  </div>

  <!-- Note Modal -->
  <div class="modal" id="note-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>📝 Leave a Sticky Note</h3>
        <button class="modal-close" data-modal="note-modal">✕</button>
      </div>
      
      <form class="modal-form" id="note-form">
        <div class="form-group">
          <label for="note-name">Your Name *</label>
          <input 
            type="text" 
            id="note-name" 
            required 
            maxlength="50"
            placeholder="Enter your name"
          >
        </div>
        
        <div class="form-group">
          <label for="note-message">Message *</label>
          <textarea 
            id="note-message" 
            required 
            maxlength="200"
            rows="4"
            placeholder="Keep it short and sweet!"
          ></textarea>
          <span class="char-count">
            <span id="note-char-count">0</span>/200
          </span>
        </div>
        
        <div class="form-group">
          <label>Note Color</label>
          <div class="color-picker">
            <button type="button" class="color-option active" data-color="#FFD700" style="background: #FFD700;"></button>
            <button type="button" class="color-option" data-color="#FF69B4" style="background: #FF69B4;"></button>
            <button type="button" class="color-option" data-color="#87CEEB" style="background: #87CEEB;"></button>
            <button type="button" class="color-option" data-color="#98FB98" style="background: #98FB98;"></button>
            <button type="button" class="color-option" data-color="#DDA0DD" style="background: #DDA0DD;"></button>
            <button type="button" class="color-option" data-color="#F0E68C" style="background: #F0E68C;"></button>
          </div>
          <input type="hidden" id="note-color" value="#FFD700">
        </div>
        
        <button type="submit" class="btn-submit" id="submit-note">
          Post Note
        </button>
      </form>
    </div>
  </div>

  <!-- Toast Notifications -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Scripts -->
  <script src="/js/friend-page.js"></script>
</body>
</html>
```

---

## **PART 4: Friend Page Styling**

```css
/* css/friend-page.css */

/* ===== FRIEND HERO SECTION ===== */
.friend-hero {
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);
  overflow: hidden;
}

.hero-cover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 1;
}

.hero-cover::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, transparent, #1a1a2e);
}

.hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Profile Main */
.profile-main {
  display: flex;
  gap: 3rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.profile-avatar {
  position: relative;
  width: 200px;
  height: 200px;
  flex-shrink: 0;
}

.avatar-border {
  position: absolute;
  inset: -8px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  border-radius: 50%;
  z-index: 1;
  animation: rotate 8s linear infinite;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

#avatar-img {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 6px solid #1a1a2e;
  z-index: 2;
}

/* Profile Info */
.profile-info {
  flex: 1;
  min-width: 300px;
}

.profile-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.profile-name {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.profile-tagline {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

/* Profile Stats */
.profile-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-3px);
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-item strong {
  display: block;
  font-size: 1.5rem;
  color: #667eea;
  font-weight: 800;
}

.stat-item span {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Profile Actions */
.profile-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-action .icon {
  font-size: 1.2rem;
}

.btn-action:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.btn-like.liked {
  background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
  border-color: transparent;
}

.btn-like.liked .icon {
  animation: heartPulse 0.5s ease;
}

@keyframes heartPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

.btn-instagram {
  background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
}

/* ===== BIO SECTION ===== */
.bio-section {
  padding: 4rem 2rem;
  background: #0a0a0a;
}

.bio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.bio-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.bio-card:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-5px);
}

.bio-card h3 {
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.bio-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 2rem;
}

.bio-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
}

.detail-item .label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}

.detail-item .value {
  color: white;
  font-size: 1.1rem;
}

.detail-item blockquote {
  margin: 0;
  padding-left: 1rem;
  border-left: 3px solid #667eea;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
}

.facts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.facts-list li {
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
}

.facts-list li:hover {
  background: rgba(102, 126, 234, 0.1);
  padding-left: 1.5rem;
}

.facts-list strong {
  color: #667eea;
}

/* ===== MEMORIES SECTION ===== */
.memories-section {
  padding: 4rem 2rem;
  background: #1a1a2e;
}

.memories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.memory-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s ease;
  cursor: pointer;
}

.memory-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.memory-image {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
}

.memory-info {
  padding: 1.5rem;
}

.memory-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.memory-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.memory-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.memory-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.memory-likes {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ===== NOTES WALL ===== */
.notes-wall-section {
  padding: 4rem 2rem;
  background: #0a0a0a;
  min-height: 600px;
}

.notes-container {
  position: relative;
  max-width: 1200px;
  margin: 3rem auto;
  min-height: 500px;
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
}

.sticky-note {
  position: absolute;
  width: 200px;
  min-height: 150px;
  padding: 1.5rem;
  background: #FFD700;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  cursor: move;
  transform: rotate(var(--rotate, 0deg));
  transition: all 0.3s ease;
  font-family: 'Comic Sans MS', cursive;
}

.sticky-note:hover {
  transform: rotate(0deg) scale(1.05);
  z-index: 100;
}

.sticky-note::before {
  content: '📌';
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
}

.note-author {
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.8);
}

.note-message {
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.7);
  word-wrap: break-word;
}

.note-date {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 1rem;
  text-align: right;
}

/* ===== COMMENTS SECTION ===== */
.comments-section {
  padding: 4rem 2rem;
  background: #1a1a2e;
}

.comments-list {
  max-width: 800px;
  margin: 3rem auto;
}

.comment-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  animation: slideIn 0.4s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.comment-card:hover {
  background: rgba(255, 255, 255, 0.05);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.comment-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  font-weight: 700;
}

.author-name {
  font-weight: 700;
  color: white;
  font-size: 1.1rem;
}

.comment-date {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.comment-content {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  font-size: 1rem;
}

.btn-load-more {
  display: block;
  margin: 2rem auto 0;
  padding: 1rem 3rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-load-more:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-3px);
}

/* ===== CHAT WIDGET ===== */
.chat-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  position: relative;
  transition: all 0.3s ease;
}

.chat-toggle:hover {
  transform: scale(1.1);
}

.chat-icon {
  font-size: 1.8rem;
}

.chat-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 25px;
  height: 25px;
  background: #ff6b6b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
}

.chat-badge.active {
  opacity: 1;
  transform: scale(1);
}

.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: rgba(26, 26, 46, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

.chat-window.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.chat-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h4 {
  color: white;
  font-size: 1.1rem;
  margin: 0;
}

.chat-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.chat-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.chat-messages {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.chat-message {
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  animation: messageSlide 0.3s ease;
}

@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-message.sent {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.chat-message.received {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.message-sender {
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  opacity: 0.8;
}

.message-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

.message-time {
  font-size: 0.7rem;
  margin-top: 0.25rem;
  opacity: 0.6;
  text-align: right;
}

.chat-form {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 0.5rem;
}

.chat-form input {
  flex: 1;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 0.9rem;
}

.chat-form input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.08);
}

.chat-form button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chat-form button:hover {
  transform: scale(1.05);
}

/* ===== MODALS ===== */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
}

.modal.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: rgba(26, 26, 46, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  transform: scale(0.9);
  transition: transform 0.4s ease;
}

.modal.active .modal-content {
  transform: scale(1);
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  color: white;
  font-size: 1.5rem;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

.modal-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.char-count {
  display: block;
  text-align: right;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.5rem;
}

.color-picker {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.color-option {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: white;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}

.btn-submit {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.btn-submit:active {
  transform: translateY(-1px);
}

/* ===== TOAST NOTIFICATIONS ===== */
.toast-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.toast {
  padding: 1rem 1.5rem;
  background: rgba(26, 26, 46, 0.98);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 1rem;
  animation: toastSlide 0.4s ease;
  min-width: 250px;
}

@keyframes toastSlide {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.toast.success {
  border-left: 4px solid #10b981;
}

.toast.error {
  border-left: 4px solid #ef4444;
}

.toast.info {
  border-left: 4px solid #3b82f6;
}

.toast-icon {
  font-size: 1.5rem;
}

/* ===== LOADING SCREEN ===== */
.loading-screen {
  position: fixed;
  inset: 0;
  background: #0a0a0a;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease;
}

.loading-screen.hidden {
  opacity: 0;
  pointer-events: none;
}

.loader {
  text-align: center;
}

.loader-circle {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(102, 126, 234, 0.2);
  border-top-color: #667eea;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

.loader p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .profile-main {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .profile-avatar {
    width: 150px;
    height: 150px;
  }
  
  .profile-stats {
    justify-content: center;
  }
  
  .profile-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .btn-action {
    width: 100%;
    justify-content: center;
  }
  
  .chat-window {
    width: calc(100vw - 4rem);
    right: 50%;
    transform: translateX(50%) translateY(20px);
  }
  
  .chat-window.active {
    transform: translateX(50%) translateY(0);
  }
  
  .toast-container {
    top: auto;
    bottom: 2rem;
    left: 1rem;
    right: 1rem;
  }
  
  .toast {
    min-width: auto;
  }
  
  .sticky-note {
    width: 150px;
    min-height: 120px;
    padding: 1rem;
  }
}
```

---
# 🚀 PART 5: Complete JavaScript Implementation

## **1. Friend Page Main JavaScript**

```javascript
// js/friend-page.js

class FriendPage {
  constructor() {
    this.friendSlug = this.getFriendSlug();
    this.friendId = null;
    this.friendData = null;
    this.apiBase = '/.netlify/functions';
    this.currentUser = this.getOrCreateUser();
    
    this.init();
  }

  async init() {
    try {
      await this.loadFriendData();
      this.renderFriendInfo();
      this.setupEventListeners();
      this.trackPageView();
      this.initChat();
      this.hideLoading();
    } catch (error) {
      console.error('Error initializing page:', error);
      this.showError('Failed to load friend data');
      this.hideLoading();
    }
  }

  getFriendSlug() {
    const path = window.location.pathname;
    const match = path.match(/\/friends\/([^\/]+)\.html/);
    return match ? match[1] : null;
  }

  getOrCreateUser() {
    let user = localStorage.getItem('walle_user');
    if (!user) {
      user = {
        id: this.generateUserId(),
        name: null,
        visitedAt: new Date().toISOString()
      };
      localStorage.setItem('walle_user', JSON.stringify(user));
    } else {
      user = JSON.parse(user);
    }
    return user;
  }

  generateUserId() {
    return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
  }

  // ===== DATA LOADING =====

  async loadFriendData() {
    try {
      const response = await fetch(`${this.apiBase}/get-friend?slug=${this.friendSlug}`);
      
      if (!response.ok) {
        throw new Error('Friend not found');
      }

      const data = await response.json();
      
      this.friendData = data.friend;
      this.friendId = data.friend.id;
      this.comments = data.comments;
      this.likeCount = data.likeCount;
      this.notes = data.notes;
      this.memories = data.memories;

      return data;
    } catch (error) {
      console.error('Error loading friend:', error);
      throw error;
    }
  }

  // ===== RENDERING =====

  renderFriendInfo() {
    const friend = this.friendData;

    // Update meta tags
    document.title = `${friend.name} - ${friend.tagline} | Walle Pals`;
    document.getElementById('page-description').content = friend.bio || friend.tagline;
    document.getElementById('og-title').content = `${friend.name} - Walle Pals`;
    document.getElementById('og-description').content = friend.tagline;
    document.getElementById('og-image').content = friend.profile_image || '/assets/default-avatar.jpg';

    // Hero section
    document.getElementById('hero-cover').style.background = 
      friend.cover_image ? `url(${friend.cover_image})` : 
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    document.getElementById('avatar-img').src = friend.profile_image || '/assets/default-avatar.jpg';
    document.getElementById('avatar-img').alt = friend.name;
    
    document.getElementById('friend-emoji').textContent = friend.emoji || '🎯';
    document.getElementById('friend-name').textContent = friend.name;
    document.getElementById('friend-tagline').textContent = friend.tagline;

    // Stats
    document.getElementById('view-count').textContent = this.formatNumber(friend.view_count || 0);
    document.getElementById('like-count').textContent = this.formatNumber(this.likeCount || 0);
    document.getElementById('comment-count').textContent = this.comments.length;

    // Bio section
    document.getElementById('friend-bio').textContent = friend.bio || 'No bio available yet.';
    
    if (friend.birthday) {
      document.getElementById('friend-birthday').textContent = 
        new Date(friend.birthday).toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric' 
        });
    }

    if (friend.hobbies && friend.hobbies.length) {
      document.getElementById('friend-hobbies').textContent = friend.hobbies.join(', ');
    }

    if (friend.favorite_quote) {
      document.getElementById('friend-quote').textContent = friend.favorite_quote;
    }

    if (friend.join_date) {
      document.getElementById('join-date').textContent = 
        new Date(friend.join_date).getFullYear();
    }

    document.getElementById('memory-count').textContent = this.memories.length;

    // Instagram link
    if (friend.instagram) {
      const instagramBtn = document.getElementById('btn-instagram');
      instagramBtn.href = `https://instagram.com/${friend.instagram.replace('@', '')}`;
    }

    // Render sections
    this.renderMemories();
    this.renderNotes();
    this.renderComments();

    // Check if user already liked
    this.checkLikeStatus();
  }

  renderMemories() {
    const container = document.getElementById('memories-grid');
    
    if (!this.memories.length) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">📸</span>
          <h3>No memories yet</h3>
          <p>Be the first to share a memory!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.memories.map(memory => `
      <div class="memory-card" data-memory-id="${memory.id}">
        ${memory.image_url ? `
          <img src="${memory.image_url}" alt="${memory.title}" class="memory-image" loading="lazy">
        ` : `
          <div class="memory-placeholder">
            <span>📸</span>
          </div>
        `}
        <div class="memory-info">
          <h3 class="memory-title">${this.escapeHtml(memory.title || 'Untitled Memory')}</h3>
          ${memory.description ? `
            <p class="memory-description">${this.escapeHtml(memory.description)}</p>
          ` : ''}
          <div class="memory-meta">
            <span class="memory-date">
              📅 ${memory.memory_date ? new Date(memory.memory_date).toLocaleDateString() : 'No date'}
            </span>
            <span class="memory-likes">
              ❤️ ${memory.likes || 0}
            </span>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderNotes() {
    const container = document.getElementById('notes-container');
    
    if (!this.notes.length) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">📝</span>
          <h3>No notes yet</h3>
          <p>Leave the first sticky note!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.notes.map((note, index) => {
      const rotation = (Math.random() - 0.5) * 10; // -5 to 5 degrees
      const left = note.position_x || (Math.random() * 70 + 5);
      const top = note.position_y || (Math.random() * 70 + 5);

      return `
        <div class="sticky-note" 
             style="--rotate: ${rotation}deg; left: ${left}%; top: ${top}%; background: ${note.color};"
             data-note-id="${note.id}">
          <div class="note-author">${this.escapeHtml(note.author_name)}</div>
          <div class="note-message">${this.escapeHtml(note.message)}</div>
          <div class="note-date">${this.timeAgo(note.created_at)}</div>
        </div>
      `;
    }).join('');

    // Make notes draggable (optional)
    this.makeNotesDraggable();
  }

  renderComments() {
    const container = document.getElementById('comments-list');
    document.getElementById('comments-count').textContent = this.comments.length;
    
    if (!this.comments.length) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">💬</span>
          <h3>No comments yet</h3>
          <p>Be the first to leave a comment!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.comments.map(comment => `
      <div class="comment-card" data-comment-id="${comment.id}">
        <div class="comment-header">
          <div class="comment-author">
            <div class="author-avatar">${this.getInitials(comment.author_name)}</div>
            <div>
              <div class="author-name">${this.escapeHtml(comment.author_name)}</div>
              <div class="comment-date">${this.timeAgo(comment.created_at)}</div>
            </div>
          </div>
        </div>
        <div class="comment-content">${this.escapeHtml(comment.content)}</div>
      </div>
    `).join('');
  }

  // ===== EVENT LISTENERS =====

  setupEventListeners() {
    // Like button
    document.getElementById('btn-like').addEventListener('click', () => {
      this.toggleLike();
    });

    // Comment button
    document.getElementById('btn-comment').addEventListener('click', () => {
      this.openModal('comment-modal');
    });

    // Note button
    document.getElementById('btn-note').addEventListener('click', () => {
      this.openModal('note-modal');
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.closeModal(e.target.dataset.modal);
      });
    });

    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal.id);
        }
      });
    });

    // Comment form
    document.getElementById('comment-form').addEventListener('submit', (e) => {
      this.handleCommentSubmit(e);
    });

    // Note form
    document.getElementById('note-form').addEventListener('submit', (e) => {
      this.handleNoteSubmit(e);
    });

    // Color picker
    document.querySelectorAll('.color-option').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('note-color').value = btn.dataset.color;
      });
    });

    // Character counters
    this.setupCharacterCounter('comment-text', 'comment-char-count');
    this.setupCharacterCounter('note-message', 'note-char-count');

    // Chat toggle
    document.getElementById('chat-toggle').addEventListener('click', () => {
      this.toggleChat();
    });

    document.getElementById('chat-close').addEventListener('click', () => {
      this.closeChat();
    });

    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
          this.closeModal(modal.id);
        });
        this.closeChat();
      }
    });
  }

  setupCharacterCounter(textareaId, counterId) {
    const textarea = document.getElementById(textareaId);
    const counter = document.getElementById(counterId);
    
    textarea.addEventListener('input', () => {
      counter.textContent = textarea.value.length;
    });
  }

  // ===== INTERACTIONS =====

  async toggleLike() {
    const btn = document.getElementById('btn-like');
    const likeCountEl = document.getElementById('like-count');
    
    // Optimistic UI update
    const wasLiked = btn.classList.contains('liked');
    btn.classList.toggle('liked');
    btn.disabled = true;

    try {
      const response = await fetch(`${this.apiBase}/toggle-like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId: this.friendId })
      });

      const data = await response.json();

      if (data.success) {
        likeCountEl.textContent = this.formatNumber(data.likeCount);
        this.likeCount = data.likeCount;
        
        // Save like status
        const likeStatus = data.action === 'liked';
        localStorage.setItem(`liked_${this.friendId}`, likeStatus);

        this.showToast(
          data.action === 'liked' ? 'Liked! ❤️' : 'Like removed',
          'success'
        );
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert optimistic update
      btn.classList.toggle('liked');
      this.showToast('Failed to update like', 'error');
    } finally {
      btn.disabled = false;
    }
  }

  async checkLikeStatus() {
    const liked = localStorage.getItem(`liked_${this.friendId}`);
    if (liked === 'true') {
      document.getElementById('btn-like').classList.add('liked');
    }
  }

  async handleCommentSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-comment');
    const name = document.getElementById('comment-name').value.trim();
    const email = document.getElementById('comment-email').value.trim();
    const content = document.getElementById('comment-text').value.trim();

    if (!name || !content) {
      this.showToast('Please fill in all required fields', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Posting...';

    try {
      const response = await fetch(`${this.apiBase}/add-comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          friendId: this.friendId,
          authorName: name,
          authorEmail: email || null,
          content: content
        })
      });

      const data = await response.json();

      if (data.success) {
        this.showToast(data.message, 'success');
        this.closeModal('comment-modal');
        
        // Add comment to list if approved
        if (data.comment.is_approved) {
          this.comments.unshift(data.comment);
          this.renderComments();
        }

        // Reset form
        e.target.reset();
        document.getElementById('comment-char-count').textContent = '0';

        // Save user name for next time
        this.currentUser.name = name;
        localStorage.setItem('walle_user', JSON.stringify(this.currentUser));
      } else {
        this.showToast(data.error || 'Failed to post comment', 'error');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      this.showToast('Failed to post comment', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Post Comment';
    }
  }

  async handleNoteSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-note');
    const name = document.getElementById('note-name').value.trim();
    const message = document.getElementById('note-message').value.trim();
    const color = document.getElementById('note-color').value;

    if (!name || !message) {
      this.showToast('Please fill in all fields', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Posting...';

    try {
      const response = await fetch(`${this.apiBase}/add-note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          friendId: this.friendId,
          authorName: name,
          message: message,
          color: color,
          positionX: Math.random() * 70 + 5,
          positionY: Math.random() * 70 + 5
        })
      });

      const data = await response.json();

      if (data.success) {
        this.showToast('Note posted! 📝', 'success');
        this.closeModal('note-modal');
        
        // Add note to wall
        this.notes.push(data.note);
        this.renderNotes();

        // Reset form
        e.target.reset();
        document.getElementById('note-char-count').textContent = '0';
      } else {
        this.showToast(data.error || 'Failed to post note', 'error');
      }
    } catch (error) {
      console.error('Error posting note:', error);
      this.showToast('Failed to post note', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Post Note';
    }
  }

  async trackPageView() {
    try {
      await fetch(`${this.apiBase}/track-view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId: this.friendId })
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  }

  // ===== CHAT FUNCTIONALITY =====

  async initChat() {
    document.getElementById('chat-friend-name').textContent = this.friendData.name;
    
    // Load existing messages
    await this.loadChatMessages();

    // Setup chat form
    document.getElementById('chat-form').addEventListener('submit', (e) => {
      this.handleChatSubmit(e);
    });

    // Poll for new messages every 5 seconds
    this.chatInterval = setInterval(() => {
      if (document.getElementById('chat-window').classList.contains('active')) {
        this.loadChatMessages(true);
      }
    }, 5000);
  }

  async loadChatMessages(silent = false) {
    try {
      const response = await fetch(`${this.apiBase}/get-chats?friendId=${this.friendId}`);
      const data = await response.json();

      if (data.messages) {
        this.chatMessages = data.messages;
        this.renderChatMessages();
        
        // Update badge
        const unreadCount = this.chatMessages.filter(m => !m.read_status && m.is_friend).length;
        const badge = document.getElementById('chat-badge');
        if (unreadCount > 0) {
          badge.textContent = unreadCount;
          badge.classList.add('active');
        } else {
          badge.classList.remove('active');
        }
      }
    } catch (error) {
      if (!silent) {
        console.error('Error loading chat:', error);
      }
    }
  }

  renderChatMessages() {
    const container = document.getElementById('chat-messages');
    
    if (!this.chatMessages.length) {
      container.innerHTML = `
        <div class="empty-state" style="text-align: center; padding: 2rem;">
          <span style="font-size: 3rem;">💬</span>
          <p style="color: rgba(255,255,255,0.6); margin-top: 1rem;">
            Start a conversation!
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.chatMessages.map(msg => `
      <div class="chat-message ${msg.is_friend ? 'received' : 'sent'}">
        <div class="message-sender">${this.escapeHtml(msg.sender_name)}</div>
        <div class="message-text">${this.escapeHtml(msg.message)}</div>
        <div class="message-time">${this.formatTime(msg.created_at)}</div>
      </div>
    `).join('');

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
  }

  async handleChatSubmit(e) {
    e.preventDefault();
    
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (!message) return;

    // Get or ask for user name
    let userName = this.currentUser.name;
    if (!userName) {
      userName = prompt('Please enter your name:');
      if (!userName) return;
      this.currentUser.name = userName;
      localStorage.setItem('walle_user', JSON.stringify(this.currentUser));
    }

    // Clear input immediately
    input.value = '';

    try {
      const response = await fetch(`${this.apiBase}/send-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          friendId: this.friendId,
          senderName: userName,
          message: message
        })
      });

      const data = await response.json();

      if (data.success) {
        // Add message to chat
        this.chatMessages.push(data.message);
        this.renderChatMessages();
      } else {
        this.showToast('Failed to send message', 'error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      this.showToast('Failed to send message', 'error');
    }
  }

  toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.classList.toggle('active');
    
    if (chatWindow.classList.contains('active')) {
      document.getElementById('chat-input').focus();
      // Mark messages as read
      document.getElementById('chat-badge').classList.remove('active');
    }
  }

  closeChat() {
    document.getElementById('chat-window').classList.remove('active');
  }

  // ===== UTILITIES =====

  makeNotesDraggable() {
    const notes = document.querySelectorAll('.sticky-note');
    
    notes.forEach(note => {
      let isDragging = false;
      let currentX;
      let currentY;
      let initialX;
      let initialY;

      note.addEventListener('mousedown', (e) => {
        if (e.target === note || note.contains(e.target)) {
          isDragging = true;
          initialX = e.clientX - note.offsetLeft;
          initialY = e.clientY - note.offsetTop;
          note.style.cursor = 'grabbing';
        }
      });

      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
          e.preventDefault();
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
          note.style.left = currentX + 'px';
          note.style.top = currentY + 'px';
        }
      });

      document.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          note.style.cursor = 'move';
        }
      });
    });
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Pre-fill user name if available
    if (this.currentUser.name) {
      const nameInput = modal.querySelector('input[type="text"]');
      if (nameInput && !nameInput.value) {
        nameInput.value = this.currentUser.name;
      }
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlide 0.4s ease reverse';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  hideLoading() {
    const loader = document.getElementById('loading-screen');
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 500);
  }

  showError(message) {
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0a0a0a; color: white; text-align: center; padding: 2rem;">
        <div>
          <h1 style="font-size: 4rem; margin-bottom: 1rem;">😕</h1>
          <h2 style="font-size: 2rem; margin-bottom: 1rem;">Oops!</h2>
          <p style="font-size: 1.2rem; color: rgba(255,255,255,0.6); margin-bottom: 2rem;">${message}</p>
          <a href="/" style="padding: 1rem 2rem; background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">
            Back to Home
          </a>
        </div>
      </div>
    `;
  }

  // Helper functions
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  getInitials(name) {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }

    return 'just now';
  }

  formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new FriendPage();
});
```

---

## **2. Dynamic Friend Page Generator**

```javascript
// scripts/generate-friend-pages.js

const fs = require('fs');
const path = require('path');

class FriendPageGenerator {
  constructor() {
    this.templatePath = path.join(__dirname, '../friends/template.html');
    this.outputDir = path.join(__dirname, '../friends');
    
    this.friends = [
      { name: 'Harsh', slug: 'harsh' },
      { name: 'Parduman', slug: 'parduman' },
      { name: 'Kartik', slug: 'kartik' },
      { name: 'Pankaj', slug: 'pankaj' },
      { name: 'Lakshay', slug: 'lakshay' },
      { name: 'Pasandu', slug: 'pasandu' },
      { name: 'Vishesh', slug: 'vishesh' },
      { name: 'Sahil', slug: 'sahil' },
      { name: 'Tushar', slug: 'tushar' },
      { name: 'Yougank', slug: 'yougank' },
      { name: 'Masum', slug: 'masum' },
      { name: 'Shiv', slug: 'shiv' },
      { name: 'Arijit', slug: 'arijit' },
      { name: 'Pintu', slug: 'pintu' },
      { name: 'Ayush', slug: 'ayush' },
      { name: 'Shivaji', slug: 'shivaji' },
      { name: 'Sachin', slug: 'sachin' },
      { name: 'Varun', slug: 'varun' },
      { name: 'Hani', slug: 'hani' },
      { name: 'Anshul', slug: 'anshul' },
      { name: 'Abhishek', slug: 'abhishek' },
      { name: 'Arjun', slug: 'arjun' },
      { name: 'Dheraj', slug: 'dheraj' },
      { name: 'Rajat', slug: 'rajat' },
      { name: 'Aditya', slug: 'aditya' },
      { name: 'Rudra', slug: 'rudra' },
      { name: 'Mudashir', slug: 'mudashir' },
      { name: 'Ravi', slug: 'ravi' },
      { name: 'Aashish', slug: 'aashish' },
      { name: 'Rijwaan', slug: 'rijwaan' }
    ];
  }

  generate() {
    console.log('🚀 Generating friend pages...\n');

    // Read template
    const template = fs.readFileSync(this.templatePath, 'utf-8');

    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Generate a page for each friend
    this.friends.forEach(friend => {
      const filename = `${friend.slug}.html`;
      const filepath = path.join(this.outputDir, filename);

      // You can customize the template here if needed
      let content = template;
      
      // Write file
      fs.writeFileSync(filepath, content);
      console.log(`✅ Created: ${filename}`);
    });

    console.log(`\n✨ Successfully generated ${this.friends.length} friend pages!`);
    
    // Generate index file
    this.generateIndex();
  }

  generateIndex() {
    const indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>All Friends - Walle Pals</title>
  <link rel="stylesheet" href="/css/main.css">
  <style>
    body {
      background: #0a0a0a;
      color: white;
      font-family: 'Inter', sans-serif;
      padding: 2rem;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      font-size: 3rem;
      margin-bottom: 3rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .friends-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.5rem;
    }
    .friend-link {
      padding: 2rem;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      text-align: center;
      text-decoration: none;
      color: white;
      transition: all 0.3s ease;
    }
    .friend-link:hover {
      background: rgba(102, 126, 234, 0.2);
      transform: translateY(-5px);
    }
    .friend-name {
      font-size: 1.3rem;
      font-weight: 700;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>👥 All Friends</h1>
    <div class="friends-grid">
      ${this.friends.map(friend => `
        <a href="/friends/${friend.slug}.html" class="friend-link">
          <div style="font-size: 3rem;">👤</div>
          <div class="friend-name">${friend.name}</div>
        </a>
      `).join('')}
    </div>
  </div>
</body>
</html>
    `.trim();

    fs.writeFileSync(path.join(this.outputDir, 'index.html'), indexContent);
    console.log('✅ Created: index.html');
  }
}

// Run generator
const generator = new FriendPageGenerator();
generator.generate();
```

**Add to package.json:**
```json
{
  "scripts": {
    "generate:friends": "node scripts/generate-friend-pages.js",
    "build": "npm run generate:friends && netlify-lambda build netlify/functions"
  }
}
```

**Run it:**
```bash
npm run generate:friends
```

---

## **3. Admin Panel for Content Management**

```html
<!-- admin/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Panel - Walle Pals</title>
  <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
  <div class="admin-container">
    <aside class="admin-sidebar">
      <div class="admin-logo">
        <h2>🎓 Admin Panel</h2>
      </div>
      
      <nav class="admin-nav">
        <button class="nav-btn active" data-view="dashboard">
          📊 Dashboard
        </button>
        <button class="nav-btn" data-view="friends">
          👥 Friends
        </button>
        <button class="nav-btn" data-view="comments">
          💬 Comments
        </button>
        <button class="nav-btn" data-view="notes">
          📝 Notes
        </button>
        <button class="nav-btn" data-view="memories">
          📸 Memories
        </button>
        <button class="nav-btn" data-view="analytics">
          📈 Analytics
        </button>
      </nav>
    </aside>

    <main class="admin-main">
      <!-- Dashboard View -->
      <div class="admin-view active" id="dashboard">
        <h1>Dashboard</h1>
        
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <div class="stat-value" id="total-friends">0</div>
              <div class="stat-label">Total Friends</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">💬</div>
            <div class="stat-info">
              <div class="stat-value" id="total-comments">0</div>
              <div class="stat-label">Total Comments</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">❤️</div>
            <div class="stat-info">
              <div class="stat-value" id="total-likes">0</div>
              <div class="stat-label">Total Likes</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">👁️</div>
            <div class="stat-info">
              <div class="stat-value" id="total-views">0</div>
              <div class="stat-label">Total Views</div>
            </div>
          </div>
        </div>

        <div class="recent-activity">
          <h2>Recent Activity</h2>
          <div id="recent-activity-list"></div>
        </div>
      </div>

      <!-- Friends View -->
      <div class="admin-view" id="friends">
        <div class="view-header">
          <h1>Manage Friends</h1>
          <button class="btn-primary" id="btn-add-friend">
            ➕ Add Friend
          </button>
        </div>

        <div class="data-table">
          <table id="friends-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tagline</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Dynamic content -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Comments View -->
      <div class="admin-view" id="comments">
        <div class="view-header">
          <h1>Manage Comments</h1>
          <div class="filter-tabs">
            <button class="tab-btn active" data-filter="pending">
              Pending (<span id="pending-count">0</span>)
            </button>
            <button class="tab-btn" data-filter="approved">
              Approved
            </button>
            <button class="tab-btn" data-filter="all">
              All
            </button>
          </div>
        </div>

        <div class="comments-list" id="admin-comments-list">
          <!-- Dynamic content -->
        </div>
      </div>

      <!-- Notes View -->
      <div class="admin-view" id="notes">
        <h1>Manage Notes</h1>
        <div id="admin-notes-list"></div>
      </div>

      <!-- Memories View -->
      <div class="admin-view" id="memories">
        <div class="view-header">
          <h1>Manage Memories</h1>
          <button class="btn-primary" id="btn-add-memory">
            ➕ Add Memory
          </button>
        </div>
        <div id="admin-memories-list"></div>
      </div>

      <!-- Analytics View -->
      <div class="admin-view" id="analytics">
        <h1>Analytics</h1>
        
        <div class="chart-container">
          <h2>Page Views Over Time</h2>
          <canvas id="views-chart"></canvas>
        </div>

        <div class="chart-container">
          <h2>Top Friends by Views</h2>
          <canvas id="top-friends-chart"></canvas>
        </div>
      </div>
    </main>
  </div>

  <!-- Modals -->
  <div class="modal" id="edit-friend-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Edit Friend</h3>
        <button class="modal-close">✕</button>
      </div>
      
      <form class="admin-form" id="edit-friend-form">
        <input type="hidden" id="edit-friend-id">
        
        <div class="form-group">
          <label>Name *</label>
          <input type="text" id="edit-name" required>
        </div>
        
        <div class="form-group">
          <label>Slug *</label>
          <input type="text" id="edit-slug" required>
        </div>
        
        <div class="form-group">
          <label>Tagline</label>
          <input type="text" id="edit-tagline">
        </div>
        
        <div class="form-group">
          <label>Bio</label>
          <textarea id="edit-bio" rows="4"></textarea>
        </div>
        
        <div class="form-group">
          <label>Emoji</label>
          <input type="text" id="edit-emoji" maxlength="2">
        </div>
        
        <div class="form-group">
          <label>Instagram</label>
          <input type="text" id="edit-instagram" placeholder="@username">
        </div>
        
        <div class="form-group">
          <label>Birthday</label>
          <input type="date" id="edit-birthday">
        </div>
        
        <div class="form-group">
          <label>Hobbies (comma-separated)</label>
          <input type="text" id="edit-hobbies" placeholder="Reading, Gaming, Coding">
        </div>
        
        <div class="form-group">
          <label>Favorite Quote</label>
          <textarea id="edit-quote" rows="2"></textarea>
        </div>
        
        <button type="submit" class="btn-submit">Save Changes</button>
      </form>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script src="/js/admin.js"></script>
</body>
</html>
```

```css
/* css/admin.css */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #0a0a0a;
  color: white;
}

.admin-container {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  background: rgba(26, 26, 46, 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.admin-logo {
  padding: 0 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.admin-logo h2 {
  font-size: 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;
}

.nav-btn {
  padding: 1rem 1.5rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-btn.active {
  background: rgba(102, 126, 234, 0.2);
  color: white;
}

/* Main Content */
.admin-main {
  flex: 1;
  margin-left: 260px;
  padding: 2rem;
  overflow-y: auto;
}

.admin-view {
  display: none;
}

.admin-view.active {
  display: block;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.view-header h1 {
  font-size: 2.5rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-3px);
}

.stat-icon {
  font-size: 3rem;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.25rem;
}

/* Data Table */
.data-table {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: rgba(102, 126, 234, 0.1);
}

th, td {
  padding: 1rem 1.5rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

th {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  color: rgba(255, 255, 255, 0.7);
}

tbody tr {
  transition: background 0.2s ease;
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

/* Buttons */
.btn-primary {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.btn-action {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: white;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0.5rem;
}

.btn-action:hover {
  background: rgba(102, 126, 234, 0.2);
}

.btn-danger {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

.btn-danger:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  gap: 1rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.3);
  color: white;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
}

.modal.active {
  opacity: 1;
  visibility: visible;
}

.modal-content {
  background: rgba(26, 26, 46, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
}

.admin-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.08);
}

.btn-submit {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-submit:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

/* Charts */
.chart-container {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.chart-container h2 {
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-sidebar {
    width: 70px;
  }
  
  .admin-main {
    margin-left: 70px;
  }
  
  .admin-logo h2,
  .nav-btn span {
    display: none;
  }
  
  .nav-btn {
    justify-content: center;
  }
}
```

```javascript
// js/admin.js

class AdminPanel {
  constructor() {
    this.apiBase = '/.netlify/functions';
    this.supabaseUrl = 'YOUR_SUPABASE_URL'; // Set in config
    this.supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
    
    this.checkAuth();
    this.init();
  }

  checkAuth() {
    // Simple password protection
    const password = localStorage.getItem('admin_password');
    if (password !== 'walle2024') { // Change this password!
      const input = prompt('Enter admin password:');
      if (input === 'walle2024') {
        localStorage.setItem('admin_password', input);
      } else {
        alert('Access denied');
        window.location.href = '/';
        return;
      }
    }
  }

  async init() {
    this.setupNavigation();
    await this.loadDashboard();
  }

  setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.dataset.view;
        this.switchView(view);
      });
    });
  }

  switchView(viewName) {
    // Update active states
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
    
    document.querySelectorAll('.admin-view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewName).classList.add('active');

    // Load view data
    switch(viewName) {
      case 'dashboard':
        this.loadDashboard();
        break;
      case 'friends':
        this.loadFriends();
        break;
      case 'comments':
        this.loadComments();
        break;
      case 'notes':
        this.loadNotes();
        break;
      case 'memories':
        this.loadMemories();
        break;
      case 'analytics':
        this.loadAnalytics();
        break;
    }
  }

  async loadDashboard() {
    try {
      // Fetch stats from Supabase
      const response = await fetch(`${this.apiBase}/get-stats`);
      const data = await response.json();

      document.getElementById('total-friends').textContent = data.friendsCount || 30;
      document.getElementById('total-comments').textContent = data.commentsCount || 0;
      document.getElementById('total-likes').textContent = data.likesCount || 0;
      document.getElementById('total-views').textContent = data.viewsCount || 0;

      // Load recent activity
      this.loadRecentActivity();
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  }

  async loadFriends() {
    try {
      const response = await fetch(`${this.apiBase}/get-all-friends`);
      const friends = await response.json();

      const tbody = document.querySelector('#friends-table tbody');
      tbody.innerHTML = friends.map(friend => `
        <tr>
          <td>
            <strong>${friend.name}</strong><br>
            <small style="color: rgba(255,255,255,0.5)">@${friend.slug}</small>
          </td>
          <td>${friend.tagline || '-'}</td>
          <td>${friend.view_count || 0}</td>
          <td>${friend.like_count || 0}</td>
          <td>${friend.comment_count || 0}</td>
          <td>
            <button class="btn-action" onclick="admin.editFriend('${friend.id}')">
              ✏️ Edit
            </button>
            <button class="btn-action btn-danger" onclick="admin.deleteFriend('${friend.id}')">
              🗑️ Delete
            </button>
          </td>
        </tr>
      `).join('');
    } catch (error) {
      console.error('Error loading friends:', error);
    }
  }

  async loadComments(filter = 'pending') {
    try {
      const response = await fetch(`${this.apiBase}/get-all-comments?filter=${filter}`);
      const comments = await response.json();

      const container = document.getElementById('admin-comments-list');
      container.innerHTML = comments.map(comment => `
        <div class="comment-card" style="padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: 12px; margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
            <div>
              <strong>${comment.author_name}</strong>
              <br>
              <small style="color: rgba(255,255,255,0.5);">${new Date(comment.created_at).toLocaleString()}</small>
            </div>
            <div>
              ${comment.is_approved ? 
                '<span style="color: #10b981;">✅ Approved</span>' : 
                '<span style="color: #f59e0b;">⏳ Pending</span>'
              }
            </div>
          </div>
          <p style="color: rgba(255,255,255,0.8); margin-bottom: 1rem;">${comment.content}</p>
          <div>
            ${!comment.is_approved ? `
              <button class="btn-action" onclick="admin.approveComment('${comment.id}')">
                ✅ Approve
              </button>
            ` : ''}
            <button class="btn-action btn-danger" onclick="admin.deleteComment('${comment.id}')">
              🗑️ Delete
            </button>
          </div>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  }

  async approveComment(commentId) {
    if (!confirm('Approve this comment?')) return;

    try {
      const response = await fetch(`${this.apiBase}/approve-comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId })
      });

      if (response.ok) {
        alert('Comment approved!');
        this.loadComments();
      }
    } catch (error) {
      console.error('Error approving comment:', error);
      alert('Failed to approve comment');
    }
  }

  async loadAnalytics() {
    // Implement Chart.js charts here
    console.log('Loading analytics...');
  }
}

// Initialize admin panel
const admin = new AdminPanel();
```

---

## **4. Additional API Functions**

```javascript
// netlify/functions/get-stats.js
const { supabase } = require('./utils/supabase');

exports.handler = async () => {
  try {
    const [friends, comments, likes, views] = await Promise.all([
      supabase.from('friends').select('count'),
      supabase.from('comments').select('count'),
      supabase.from('likes').select('count'),
      supabase.from('page_views').select('count')
    ]);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        friendsCount: friends.count || 0,
        commentsCount: comments.count || 0,
        likesCount: likes.count || 0,
        viewsCount: views.count || 0
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

```javascript
// netlify/functions/approve-comment.js
const { supabase } = require('./utils/supabase');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { commentId } = JSON.parse(event.body);

    const { error } = await supabase
      .from('comments')
      .update({ is_approved: true })
      .eq('id', commentId);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

---

## **5. Deployment Checklist** ✅

```bash
# 1. Install all dependencies
npm install @supabase/supabase-js netlify-lambda

# 2. Set environment variables in Netlify
# Dashboard > Site Settings > Environment Variables:
SUPABASE_URL=your-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# 4. Build functions
npm run build

# 5. Deploy to Netlify
git add .
git commit -m "Complete friend pages with database"
git push origin main

# 6. Verify deployment
# - Check functions are deployed
# - Test API endpoints
# - Test friend pages
```

---

## **Next Steps:**

1. **Test everything locally** using `netlify dev`
2. **Add image upload** functionality (use Cloudinary or Supabase Storage)
3. **Implement real-time** features with Supabase Realtime
4. **Add email notifications** for new comments
5. **Create mobile app** version

- ## MAKE SURE THESE FEATURES ARE ALSO WORKING-
- **Email notification system**
- **Export/backup system**
- **SEO optimization**
