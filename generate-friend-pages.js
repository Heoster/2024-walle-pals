// GENERATE ALL FRIEND PAGES
const fs = require('fs');
const path = require('path');

// Friend data with correct Instagram handles
const friends = {
  harsh: { name: 'Harsh', instagram: 'codeex._.heoster', emoji: '🌟', tagline: 'The Adventurous Spirit', story: 'Every adventure begins with a single step, and Harsh is always the first to take it. His courage inspires us all.' },
  parduman: { name: 'Parduman', instagram: 'kittu_pandat001', emoji: '🤝', tagline: 'Always Ready to Help', story: 'True friendship means being there when it matters most. Parduman embodies this spirit every single day.' },
  kartik: { name: 'Kartik', instagram: 'kartik_bharadwaj72', emoji: '🎨', tagline: 'The Creative Genius', story: 'Creativity flows through everything Kartik touches, turning ordinary moments into extraordinary memories.' },
  pankaj: { name: 'Pankaj', instagram: '__pankajthakur2', emoji: '😄', tagline: 'Master of Good Vibes', story: 'Laughter is the soundtrack of friendship, and Pankaj is the DJ who keeps it playing.' },
  lakshay: { name: 'Lakshay', instagram: '1__numbri__', emoji: '🛡️', tagline: 'The Loyal Companion', story: 'Through thick and thin, Lakshay stands by his friends with unwavering loyalty.' },
  nawajish: { name: 'Nawajish', instagram: 'official_nawajish_295', emoji: '☀️', tagline: 'Brings Joy Everywhere', story: 'Like sunshine breaking through clouds, Nawajish brightens every moment with his infectious energy and warmth.' },
  vishesh: { name: 'Vishesh', instagram: 'vishesh_soam_07', emoji: '🦉', tagline: 'The Wise Counselor', story: 'Wisdom comes not from age but from understanding, and Vishesh has mastered this art.' },
  sahil: { name: 'Sahil', instagram: '_imkhansahil_', emoji: '🎢', tagline: 'Always Up for Fun', story: 'Life is an adventure, and Sahil makes sure we enjoy every twist and turn.' },
  tushar: { name: 'Tushar', instagram: 'rjput_tushar.0007', emoji: '🧩', tagline: 'The Problem Solver', story: 'Every puzzle has a solution, and Tushar has the patience to find it.' },
  yougank: { name: 'Yougank', instagram: 'kaju_rana_0001', emoji: '🎁', tagline: 'Full of Surprises', story: 'The best moments in life are unexpected, just like Yougank.' },
  masum: { name: 'Masum', instagram: 'masummalik30', emoji: '🕊️', tagline: 'The Gentle Soul', story: 'Kindness is a language everyone understands, and Masum speaks it fluently.' },
  shiv: { name: 'Shiv', instagram: 'rajputana_shiv_', emoji: '💪', tagline: 'Strength and Kindness', story: 'True strength lies in lifting others up, and Shiv does this effortlessly.' },
  pintu: { name: 'Pintu', instagram: 'rajput._.boy_0001', emoji: '😊', tagline: 'Always Positive', story: 'Optimism is contagious, and Pintu spreads it wherever he goes.' },
  ayush: { name: 'Ayush', instagram: 'thakur__ayush__soam', emoji: '⚡', tagline: 'The Energetic One', story: 'Energy and enthusiasm are the fuel of friendship, and Ayush has an endless supply.' },
  shivaji: { name: 'Shivaji', instagram: 'shiva_ji_00', emoji: '👑', tagline: 'Natural Born Leader', story: 'Leadership is not about being in charge, but taking care of those in your charge.' },
  sachin: { name: 'Sachin', instagram: 'its_saini0002', emoji: '⚽', tagline: 'The Sports Enthusiast', story: 'Teamwork makes the dream work, and Sachin knows how to bring the team together.' },
  varun: { name: 'Varun', instagram: 'varunrajput6290', emoji: '😄', tagline: 'Quick Wit and Humor', story: 'A good laugh is sunshine in the house, and Varun brings it daily.' },
  hani: { name: 'Hani', instagram: 'its_honey_kashyap_ak47', emoji: '💭', tagline: 'The Thoughtful Friend', story: 'Thoughtfulness is remembering what matters to others, and Hani never forgets.' },
  anshul: { name: 'Anshul', instagram: 'anshulgujjar8776', emoji: '📣', tagline: 'Always Encouraging', story: 'Encouragement is oxygen to the soul, and Anshul provides it generously.' },
  abhishek: { name: 'Abhishek', instagram: 'itx__abhishek_302', emoji: '🛡️', tagline: 'The Reliable One', story: 'Reliability is the foundation of trust, and Abhishek is rock solid.' },
  arjun: { name: 'Arjun', instagram: 'arjundhaka479', emoji: '🎯', tagline: 'Focused and Determined', story: 'Focus is the art of knowing what to ignore, and Arjun has mastered it.' },
  dheraj: { name: 'Dheraj', instagram: 'dheeraj_som__2110', emoji: '☮️', tagline: 'The Peacemaker', story: 'Peace is not the absence of conflict, but the presence of understanding.' },
  rajat: { name: 'Rajat', instagram: 'rajatchoudhary3496', emoji: '💡', tagline: 'Full of Ideas', story: 'Ideas are the currency of innovation, and Rajat is wealthy beyond measure.' },
  mudashir: { name: 'Mudashir', instagram: 'the.shaaan___', emoji: '📖', tagline: 'The Storyteller', story: 'Stories connect us across time and space, and Mudashir weaves them beautifully.' },
  aashish: { name: 'Aashish', instagram: 'ashish__jayant', emoji: '🌠', tagline: 'The Optimistic Dreamer', story: 'Dreams are the seeds of reality, and Aashish plants them with hope.' },
  rijwaan: { name: 'Rijwaan', instagram: 'riwan.chaudhary', emoji: '💝', tagline: 'The Caring Heart', story: 'Care is love made visible, and Rijwaan shows it in every action.' }
};

// Create friends directory if it doesn't exist
const friendsDir = path.join(__dirname, 'friends');
if (!fs.existsSync(friendsDir)) {
  fs.mkdirSync(friendsDir);
}

// Generate HTML for each friend
Object.keys(friends).forEach(slug => {
  const friend = friends[slug];
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${friend.name} - 2024 Walle Pals</title>
  <meta name="description" content="${friend.tagline} - ${friend.story}">
  
  <!-- Styles -->
  <link rel="stylesheet" href="../css/main.css">
  <link rel="stylesheet" href="../css/3d-animations.css">
  <link rel="stylesheet" href="../css/hero-enhanced.css">
  <link rel="stylesheet" href="../css/navbar-premium.css">
  <link rel="stylesheet" href="../css/friend-page-premium.css">
  <link rel="stylesheet" href="../css/friendship-quotes.css">
  <link rel="stylesheet" href="../css/responsive-enhanced.css">
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
  
  <link rel="icon" href="../assets/favicon.ico">
</head>
<body class="friend-page" data-friend="${slug}">
  
  <!-- Page Loader -->
  <div class="page-loader" id="pageLoader">
    <div class="loader">
      <div class="loader-ring"></div>
      <div class="loader-ring"></div>
      <div class="loader-ring"></div>
    </div>
    <p>Loading ${friend.name}'s Page...</p>
  </div>

  <!-- Navigation -->
  <header class="header navbar-premium">
    <nav class="nav">
      <div class="nav-brand">
        <a href="../index.html" class="nav-logo">
          <div class="logo-icon">
            <span class="logo-emoji">🎓</span>
            <div class="logo-pulse"></div>
          </div>
          <div class="logo-text">
            <span class="logo-title">Walle Pals</span>
            <span class="logo-subtitle">2024</span>
          </div>
        </a>
      </div>
      <ul class="nav-menu">
        <li><a href="../index.html" class="nav-link">🏠 Home</a></li>
        <li><a href="../index.html#wall-of-frames" class="nav-link">👥 Friends</a></li>
        <li><a href="../memories.html" class="nav-link">📸 Memories</a></li>
        <li><a href="../gallery.html" class="nav-link">🎨 Gallery</a></li>
      </ul>
      <button class="nav-toggle" id="hamburger">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </nav>
  </header>

  <!-- Friend Hero -->
  <section class="friend-hero-premium">
    <div class="hero-background-animated">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <canvas id="particles-canvas"></canvas>
    </div>
    
    <div class="hero-content-friend">
      <div class="profile-card-3d">
        <div class="profile-avatar-wrapper">
          <div class="avatar-glow"></div>
          <img src="../assets/friends/${slug}.jpg" alt="${friend.name}" class="profile-avatar" onerror="this.src='../assets/favicon.ico'">
        </div>
        
        <div class="profile-info">
          <div class="profile-emoji">${friend.emoji}</div>
          <h1 class="profile-name">${friend.name}</h1>
          <p class="profile-tagline">${friend.tagline}</p>
          
          <!-- Instagram Link with Animation -->
          <a href="https://instagram.com/${friend.instagram}" target="_blank" class="instagram-link-animated">
            <span class="instagram-icon">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </span>
            <span class="instagram-text">@${friend.instagram}</span>
            <span class="instagram-shine"></span>
          </a>
          
          <!-- Story Quote -->
          <div class="friend-story">
            <div class="story-icon">💭</div>
            <blockquote class="story-text">"${friend.story}"</blockquote>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Photo Gallery -->
  <section class="friend-gallery-section">
    <div class="container">
      <h2 class="section-title">📸 Memories with ${friend.name}</h2>
      <div class="gallery-grid" id="gallery-grid">
        <!-- Photos will be loaded here -->
      </div>
    </div>
  </section>

  <!-- Friendship Quotes Section -->
  <section class="friendship-quotes-section">
    <div class="container">
      <div class="quotes-header">
        <h2>✨ Friendship Wisdom</h2>
        <p>Celebrating the bonds that make life beautiful</p>
      </div>
      
      <div class="quotes-carousel">
        <!-- Quotes will be loaded here by JavaScript -->
      </div>

      <div class="quotes-navigation">
        <button class="quote-nav-btn quote-prev" aria-label="Previous quote">‹</button>
        <div class="quote-dots">
          <span class="quote-dot active"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
          <span class="quote-dot"></span>
        </div>
        <button class="quote-nav-btn quote-next" aria-label="Next quote">›</button>
      </div>

      <div style="text-align: center;">
        <button class="random-quote-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
          </svg>
          Random Quote
        </button>
      </div>
    </div>
  </section>

  <!-- Comments Section -->
  <section class="comments-section-premium">
    <div class="container">
      <h2 class="section-title">💬 Leave a Message</h2>
      
      <form class="comment-form-premium" id="commentForm">
        <div class="form-group">
          <input type="text" placeholder="Your Name" required id="commentName" maxlength="50">
        </div>
        <div class="form-group">
          <input type="email" placeholder="Your Email (optional)" id="commentEmail">
        </div>
        <div class="form-group">
          <textarea placeholder="Your message for ${friend.name}..." required id="commentMessage" rows="4" maxlength="500"></textarea>
        </div>
        <button type="submit" class="btn-submit-comment">
          <span>Send Message</span>
          <span class="btn-arrow">→</span>
        </button>
      </form>

      <div class="comments-list" id="commentsList">
        <!-- Comments will appear here -->
      </div>
    </div>
  </section>

  <!-- Back to Friends -->
  <section class="back-section">
    <div class="container">
      <a href="../index.html#wall-of-frames" class="btn-back">
        <span>←</span>
        <span>Back to All Friends</span>
      </a>
    </div>
  </section>

  <!-- Toast Notifications -->
  <div class="toast-container" id="toastContainer"></div>

  <!-- Scripts -->
  <script src="../js/hero-enhanced.js"></script>
  <script src="../js/navbar-premium.js"></script>
  <script src="../js/friendship-quotes.js"></script>
  <script src="../js/friend-page.js"></script>
</body>
</html>`;

  // Write file
  const filePath = path.join(friendsDir, `${slug}.html`);
  fs.writeFileSync(filePath, html);
  console.log(`✅ Created ${slug}.html`);
});

console.log('\n🎉 All friend pages generated successfully!');
