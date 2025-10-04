// Script to update all friend pages with advanced structure and styling

const fs = require('fs');
const path = require('path');

// Friend data configuration
const friendsData = {
    'harsh.html': {
        name: 'Harsh',
        tagline: 'The Adventurous Spirit',
        bio: 'Always ready for the next adventure, Harsh brings excitement and courage to every journey we take together.',
        initial: 'H',
        emoji: '🌟',
        image: 'harsh.jpg',
        stats: [
            { icon: '🏔️', number: '25', label: 'Adventures' },
            { icon: '⚡', number: '100', label: 'Energy Level' },
            { icon: '🎯', number: '∞', label: 'Determination' }
        ],
        floatingEmojis: ['❤️', '💫', '🌟', '✨', '🎯'],
        quote: 'Life is either a daring adventure or nothing at all. Let\'s make every moment count!',
        instagram: 'https://instagram.com/codeex._.heoster',
        handle: '@codeex._.heoster',
        memories: [
            {
                image: 'harsh.jpg',
                title: 'Mountain Expeditions',
                description: 'Leading us through challenging trails with unwavering determination.'
            },
            {
                image: 'gallery1.jpg',
                title: 'Spontaneous Adventures',
                description: 'Always the first to suggest "Let\'s try something new!"'
            },
            {
                image: 'gallery11.jpg',
                title: 'Early Morning Quests',
                description: 'Convincing us all to wake up early for the best sunrise views.'
            }
        ]
    },
    'sachin.html': {
        name: 'Sachin',
        tagline: 'The Sports Enthusiast',
        bio: 'Bringing competitive spirit and teamwork to everything we do. Sachin teaches us that winning isn\'t everything, but playing together is.',
        initial: 'S',
        emoji: '⚽',
        image: 'sachin.jpg',
        stats: [
            { icon: '🏆', number: '15', label: 'Victories' },
            { icon: '⚽', number: '500', label: 'Goals Scored' },
            { icon: '🤝', number: '100', label: 'Team Spirit' }
        ],
        floatingEmojis: ['🏆', '⚽', '🏃', '🎯', '💪'],
        quote: 'True victory comes not from winning, but from playing with honor and bringing out the best in your team.',
        instagram: 'https://instagram.com/its_saini0002',
        handle: '@its_saini0002',
        memories: [
            {
                image: 'gallery10.jpg',
                title: 'Team Captain',
                description: 'Leading by example and bringing out the best in every teammate.'
            },
            {
                image: 'gallery1.jpg',
                title: 'Game Night Champion',
                description: 'Turning every game into an epic battle of strategy and skill.'
            },
            {
                image: 'gallery11.jpg',
                title: 'Fair Play',
                description: 'Teaching us that true victory comes from playing with honor.'
            }
        ]
    },
    'vishesh.html': {
        name: 'Vishesh',
        tagline: 'The Wise Counselor',
        bio: 'With wisdom beyond his years, Vishesh is our go-to person for advice and deep conversations that matter.',
        initial: 'V',
        emoji: '🧠',
        image: 'vishesh.jpg',
        stats: [
            { icon: '📚', number: '200', label: 'Books Read' },
            { icon: '💭', number: '∞', label: 'Deep Thoughts' },
            { icon: '🎯', number: '95', label: 'Accuracy Rate' }
        ],
        floatingEmojis: ['📚', '💭', '🧠', '✨', '🎯'],
        quote: 'Wisdom is not about having all the answers, but asking the right questions.',
        instagram: 'https://instagram.com/vishesh_example',
        handle: '@vishesh_example',
        memories: [
            {
                image: 'vishesh.jpg',
                title: 'Deep Conversations',
                description: 'Always ready with thoughtful insights and meaningful discussions.'
            },
            {
                image: 'gallery2.jpg',
                title: 'Problem Solver',
                description: 'Finding solutions when everyone else sees only obstacles.'
            },
            {
                image: 'gallery3.jpg',
                title: 'Mentor Moments',
                description: 'Guiding us through life\'s challenges with patience and wisdom.'
            }
        ]
    }
};

// Function to update a friend page
function updateFriendPage(filename, data) {
    const filePath = path.join('friends', filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`File ${filename} not found, skipping...`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Update CSS links
    content = content.replace(
        /<link rel="stylesheet" href="\.\.\/css\/main\.css">\s*<link rel="stylesheet" href="\.\.\/css\/animations\.css">\s*<link rel="stylesheet" href="\.\.\/css\/candle-animations\.css">\s*<link rel="stylesheet" href="\.\.\/css\/instagram-button\.css">[\s\S]*?(?=<link rel="preconnect"|<\/head>)/,
        `<link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/friends-advanced.css">
    <link rel="stylesheet" href="../css/animations.css">
    <link rel="stylesheet" href="../css/candle-animations.css">
    <link rel="stylesheet" href="../css/instagram-button.css">
    `
    );

    // Add loading screen after <body>
    if (!content.includes('loading-screen')) {
        content = content.replace(
            /<body>/,
            `<body>
    <!-- Loading Screen -->
    <div id="loading-screen" class="loading-screen">
        <div class="loading-spinner"></div>
        <p>Loading ${data.name}'s story...</p>
    </div>`
        );
    }

    // Update hero section with stats
    const heroSection = `        <section class="friend-hero">
            <div class="container">
                <div class="friend-intro animate-fade-in-up">
                    <h1 class="friend-title">${data.name}</h1>
                    <p class="friend-tagline">${data.tagline}</p>
                    <p class="friend-bio">${data.bio}</p>
                    
                    <!-- Enhanced Stats Section -->
                    <div class="friend-stats">
                        ${data.stats.map(stat => `
                        <div class="stat-card">
                            <span class="stat-icon">${stat.icon}</span>
                            <div class="stat-number">${stat.number}</div>
                            <div class="stat-label">${stat.label}</div>
                        </div>`).join('')}
                    </div>
                </div>
            </div>
        </section>

        <!-- Enhanced Profile Section -->
        <section class="friend-profile-section">
            <div class="container">
                <div class="friend-image-container">
                    <img src="../assets/school/${data.image}" 
                         alt="${data.name} - ${data.tagline}" 
                         class="friend-profile-image" 
                         loading="lazy"
                         onerror="this.onerror=null; this.src='../assets/school/gallery1.jpg';">
                </div>
            </div>
        </section>`;

    content = content.replace(
        /<section class="friend-hero">[\s\S]*?<\/section>/,
        heroSection
    );

    // Update floating hearts in animation section
    const heartsContainer = `                    <div class="hearts-container">
                        ${data.floatingEmojis.map(emoji => `<div class="floating-heart">${emoji}</div>`).join('\n                        ')}
                    </div>`;

    content = content.replace(
        /<div class="hearts-container">[\s\S]*?<\/div>/,
        heartsContainer
    );

    // Update character emoji
    content = content.replace(
        /<div class="character character-2">[\s\S]*?<\/div>/,
        `                    <div class="character character-2">
                        <div class="character-eyes">
                            <div class="eye"></div>
                            <div class="eye"></div>
                        </div>
                        <div class="character-mouth"></div>
                        ${data.emoji}
                    </div>`
    );

    // Update character initial
    content = content.replace(
        /(<div class="character character-1">[\s\S]*?<div class="character-mouth"><\/div>\s*)[A-Z]/,
        `$1${data.initial}`
    );

    // Add quote section before Instagram section
    if (!content.includes('friend-quote-section')) {
        const quoteSection = `
        <!-- Enhanced Quote Section -->
        <section class="friend-quote-section">
            <div class="container">
                <blockquote class="friend-quote">
                    <p>${data.quote}</p>
                    <cite>- ${data.name}</cite>
                </blockquote>
            </div>
        </section>`;

        content = content.replace(
            /(<\/main>\s*)/,
            `$1${quoteSection}
    `
        );
    }

    // Update Instagram section
    content = content.replace(
        /<section class="instagram-section">[\s\S]*?<\/section>/,
        `    <section class="instagram-section">
        <div class="container">
            <h3>Connect with ${data.name}</h3>
            <p>Follow on Instagram for more updates</p>
            <a href="${data.instagram}" target="_blank" class="instagram-button" rel="noopener noreferrer">
                <svg viewBox="0 0 16 16" class="bi bi-instagram" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                </svg>
                <span>${data.handle}</span>
            </a>
        </div>
    </section>`
    );

    // Update footer
    content = content.replace(
        /<footer class="footer">[\s\S]*?<\/footer>/,
        `    <!-- Enhanced Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>2024 Walle Pals</h4>
                    <p>Celebrating friendship, memories, and the bonds that unite us.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="../index.html#wall-of-frames">Friends</a></li>
                        <li><a href="../memories.html">Memories</a></li>
                        <li><a href="../gallery.html">Gallery</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Connect</h4>
                    <div class="social-links">
                        <a href="#" aria-label="Instagram">📸</a>
                        <a href="#" aria-label="Facebook">📘</a>
                        <a href="#" aria-label="Twitter">🐦</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Walle Pals. Made with ❤️ for our amazing friend circle.</p>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" class="back-to-top" aria-label="Back to top">
        <svg fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
    </button>`
    );

    // Add advanced JavaScript
    if (!content.includes('friends-advanced.js')) {
        content = content.replace(
            /<script src="\.\.\/js\/animations\.js"><\/script>/,
            `<script src="../js/animations.js"></script>
    <script src="../js/friends-advanced.js"></script>`
        );
    }

    // Write updated content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filename} with advanced structure`);
}

// Update all friend pages
console.log('🚀 Starting advanced friends page updates...\n');

Object.entries(friendsData).forEach(([filename, data]) => {
    updateFriendPage(filename, data);
});

console.log('\n✨ All friend pages have been enhanced with advanced structure and styling!');
console.log('\n📋 New features added:');
console.log('   • Loading screens with personalized messages');
console.log('   • Enhanced hero sections with statistics');
console.log('   • Floating profile images with animations');
console.log('   • Interactive character animations');
console.log('   • Inspirational quote sections');
console.log('   • Advanced footer with social links');
console.log('   • Back-to-top buttons');
console.log('   • Enhanced accessibility features');
console.log('   • Dark theme support');
console.log('   • Mobile-optimized responsive design');
console.log('\n🎨 Advanced CSS features:');
console.log('   • Gradient backgrounds and animations');
console.log('   • Glassmorphism effects');
console.log('   • Parallax scrolling');
console.log('   • Smooth transitions and micro-interactions');
console.log('   • Custom scrollbars');
console.log('   • Print-friendly styles');
console.log('\n⚡ JavaScript enhancements:');
console.log('   • Intersection Observer animations');
console.log('   • Counter animations');
console.log('   • Interactive sound effects');
console.log('   • Performance monitoring');
console.log('   • Theme persistence');
console.log('   • Image lazy loading');