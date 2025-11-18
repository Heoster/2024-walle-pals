// Special Friends Enhancement Script

class SpecialFriendsManager {
  constructor() {
    this.specialFriends = ['harsh', 'pankaj', 'kartik', 'parduman', 'lakshay'];
    this.friendData = {
      harsh: {
        title: 'The Adventurous Spirit',
        stats: { adventures: 15, memories: 42, friends: 26 },
        specialImages: 5,
        quote: 'Every adventure begins with a single step, and Harsh is always the first to take it.'
      },
      pankaj: {
        title: 'Master of Good Vibes',
        stats: { laughs: 1000, vibes: 100, moments: 89 },
        specialImages: 5,
        quote: 'Laughter is the best medicine, and Pankaj is the doctor we all need.'
      },
      kartik: {
        title: 'The Creative Genius',
        stats: { ideas: 500, creations: 200, inspirations: 150 },
        specialImages: 5,
        quote: 'Creativity flows through everything Kartik touches, turning ordinary into extraordinary.'
      },
      parduman: {
        title: 'Always Ready to Help',
        stats: { helps: 999, hearts: 100, support: 24 },
        specialImages: 5,
        quote: 'True friendship means being there when it matters most, and Parduman never misses.'
      },
      lakshay: {
        title: 'The Loyal Companion',
        stats: { loyalty: 100, bonds: 26, years: 5 },
        specialImages: 5,
        quote: 'Through thick and thin, Lakshay stands by his friends with unwavering loyalty.'
      }
    };

    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    try {
      const friendSlug = document.body.dataset.friend;
      
      if (this.specialFriends.includes(friendSlug)) {
        this.enhanceSpecialFriend(friendSlug);
      }
    } catch (error) {
      console.error('Error setting up special friends:', error);
    }
  }

  enhanceSpecialFriend(friendSlug) {
    const data = this.friendData[friendSlug];
    if (!data) return;

    // Add special badge
    this.addSpecialBadge();

    // Add stats section
    this.addStatsSection(data.stats);

    // Add special quote
    this.addSpecialQuote(data.quote);

    // Enhance gallery with special images
    this.enhanceGallery(friendSlug, data.specialImages);

    // Add special animations
    this.addSpecialAnimations();
  }

  addSpecialBadge() {
    const heroContent = document.querySelector('.profile-info');
    if (!heroContent) return;

    const badge = document.createElement('div');
    badge.className = 'special-friend-badge';
    badge.innerHTML = '⭐ SPECIAL FRIEND ⭐';
    
    const profileName = heroContent.querySelector('.profile-name');
    if (profileName) {
      profileName.parentNode.insertBefore(badge, profileName);
    }
  }

  addStatsSection(stats) {
    const gallerySection = document.querySelector('.friend-gallery-section');
    if (!gallerySection) return;

    const statsHTML = `
      <section class="special-friend-stats-section" style="padding: 3rem 0;">
        <div class="container">
          <h2 class="section-title">📊 ${document.body.dataset.friend.charAt(0).toUpperCase() + document.body.dataset.friend.slice(1)} Stats</h2>
          <div class="special-friend-stats">
            ${Object.entries(stats).map(([key, value]) => `
              <div class="stat-item">
                <div class="stat-number">${value}</div>
                <div class="stat-label">${key}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    gallerySection.insertAdjacentHTML('afterend', statsHTML);
  }

  addSpecialQuote(quote) {
    const gallerySection = document.querySelector('.friend-gallery-section');
    if (!gallerySection) return;

    const quoteHTML = `
      <section style="padding: 2rem 0;">
        <div class="container">
          <div class="special-friend-quote">
            "${quote}"
          </div>
        </div>
      </section>
    `;

    gallerySection.insertAdjacentHTML('beforebegin', quoteHTML);
  }

  enhanceGallery(friendSlug, specialImageCount) {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    // Add special gallery wrapper
    galleryGrid.parentElement.classList.add('special-friend-gallery');

    // Add glow effect to gallery items
    const items = galleryGrid.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add('special-gallery-item');
    });
  }

  addSpecialAnimations() {
    // Add parallax effect on scroll
    const profileCard = document.querySelector('.profile-card-3d');
    if (profileCard) {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        profileCard.style.transform = `translateY(${scrollY * 0.5}px)`;
      });
    }

    // Add mouse tracking effect
    const heroSection = document.querySelector('.friend-hero-premium');
    if (heroSection) {
      document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 10;
        const y = (e.clientY / window.innerHeight) * 10;
        heroSection.style.backgroundPosition = `${x}% ${y}%`;
      });
    }
  }

  // Add confetti effect for special moments
  static triggerConfetti() {
    if (typeof confetti === 'undefined') {
      console.log('Confetti library not loaded');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Add special friend interaction
  static addInteraction(friendSlug) {
    const interactions = {
      harsh: () => {
        console.log('🏔️ Adventure awaits!');
        this.triggerConfetti();
      },
      pankaj: () => {
        console.log('😄 Good vibes only!');
        this.triggerConfetti();
      },
      kartik: () => {
        console.log('🎨 Creativity unleashed!');
        this.triggerConfetti();
      },
      parduman: () => {
        console.log('🤝 Always here to help!');
        this.triggerConfetti();
      },
      lakshay: () => {
        console.log('💎 Loyalty forever!');
        this.triggerConfetti();
      }
    };

    if (interactions[friendSlug]) {
      interactions[friendSlug]();
    }
  }
}

// Initialize special friends manager
let specialFriendsManager;
try {
  specialFriendsManager = new SpecialFriendsManager();
  window.specialFriendsManager = specialFriendsManager;
} catch (error) {
  console.error('Failed to initialize special friends manager:', error);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpecialFriendsManager;
}
