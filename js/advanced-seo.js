// Advanced SEO Optimization for 2024 Walle Pals

class AdvancedSEO {
  constructor() {
    this.keywords = {
      primary: ['2024wallepals', 'heoster', 'codeex', 'friendship', 'friends', 'memories'],
      friends: [
        'harsh', 'parduman', 'kartik', 'pankaj', 'lakshay', 'nawajish',
        'vishesh', 'sahil', 'tushar', 'yougank', 'masum', 'shiv',
        'pintu', 'ayush', 'shivaji', 'sachin', 'varun', 'hani',
        'anshul', 'abhishek', 'arjun', 'dheraj', 'rajat', 'mudashir',
        'aashish', 'rijwaan'
      ],
      secondary: [
        'friend circle', 'social network', 'memory collection', 'interactive website',
        'friendship quotes', 'friend gallery', 'shared moments', 'friend memories',
        'adventure spirit', 'good vibes', 'creative genius', 'loyal companion'
      ]
    };

    this.init();
  }

  init() {
    this.addStructuredDataForFriends();
    this.optimizeImageSEO();
    this.addBreadcrumbSchema();
    this.addFAQSchema();
    this.setupKeywordTracking();
  }

  addStructuredDataForFriends() {
    const friendSlug = document.body.dataset.friend;
    if (!friendSlug) return;

    const friendData = this.getFriendData(friendSlug);
    if (!friendData) return;

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": friendData.name,
      "description": friendData.tagline,
      "image": `https://2024wallepals.netlify.app/assets/friends/${friendSlug}.jpg`,
      "url": `https://2024wallepals.netlify.app/friends/${friendSlug}.html`,
      "sameAs": [
        `https://instagram.com/${friendData.instagram}`
      ],
      "memberOf": {
        "@type": "Organization",
        "name": "2024 Walle Pals",
        "url": "https://2024wallepals.netlify.app"
      }
    };

    this.injectSchema(personSchema);

    // Add Article schema for friend pages
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${friendData.name} - ${friendData.tagline}`,
      "description": friendData.story,
      "image": `https://2024wallepals.netlify.app/assets/friends/${friendSlug}.jpg`,
      "author": {
        "@type": "Organization",
        "name": "2024 Walle Pals"
      },
      "publisher": {
        "@type": "Organization",
        "name": "2024 Walle Pals",
        "logo": {
          "@type": "ImageObject",
          "url": "https://2024wallepals.netlify.app/assets/favicon.ico"
        }
      },
      "datePublished": new Date().toISOString(),
      "keywords": [friendData.name, friendData.tagline, '2024wallepals', 'friend', 'memories']
    };

    this.injectSchema(articleSchema);
  }

  optimizeImageSEO() {
    const images = document.querySelectorAll('img');
    
    images.forEach((img, index) => {
      // Add descriptive alt text if missing
      if (!img.alt || img.alt.trim() === '') {
        const context = img.closest('[data-friend]');
        const friendName = context?.dataset.friend || 'Friend';
        img.alt = `${friendName} - 2024 Walle Pals Memory ${index + 1}`;
      }

      // Add title attribute for better SEO
      if (!img.title) {
        img.title = img.alt;
      }

      // Add data attributes for image schema
      img.setAttribute('data-seo-image', 'true');
      img.setAttribute('data-keywords', this.generateImageKeywords(img));
    });

    // Add Image schema for all images
    this.addImageSchema();
  }

  addImageSchema() {
    const images = document.querySelectorAll('img[data-seo-image="true"]');
    
    images.forEach((img, index) => {
      const imageSchema = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "name": img.alt,
        "description": img.title,
        "url": img.src,
        "uploadDate": new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": "2024 Walle Pals"
        }
      };

      // Only inject first 5 images to avoid too many schemas
      if (index < 5) {
        this.injectSchema(imageSchema);
      }
    });
  }

  generateImageKeywords(img) {
    const alt = img.alt.toLowerCase();
    const keywords = [];

    // Add primary keywords if relevant
    this.keywords.primary.forEach(keyword => {
      if (alt.includes(keyword)) {
        keywords.push(keyword);
      }
    });

    // Add friend names if relevant
    this.keywords.friends.forEach(friend => {
      if (alt.includes(friend)) {
        keywords.push(friend);
      }
    });

    return keywords.join(', ');
  }

  addBreadcrumbSchema() {
    const breadcrumbs = [];
    const path = window.location.pathname;

    // Home
    breadcrumbs.push({
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://2024wallepals.netlify.app"
    });

    // Friends section
    if (path.includes('/friends/')) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Friends",
        "item": "https://2024wallepals.netlify.app/#wall-of-frames"
      });

      // Individual friend
      const friendName = document.querySelector('.profile-name')?.textContent || 'Friend';
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 3,
        "name": friendName,
        "item": window.location.href
      });
    }

    if (breadcrumbs.length > 1) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs
      };

      this.injectSchema(breadcrumbSchema);
    }
  }

  addFAQSchema() {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is 2024 Walle Pals?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "2024 Walle Pals is an interactive website celebrating friendship through a beautiful wall of frames, memories, and shared moments with 26+ friends."
          }
        },
        {
          "@type": "Question",
          "name": "Who built this website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This website was professionally designed and developed by CODEEX, a web development team."
          }
        },
        {
          "@type": "Question",
          "name": "Can I share this website?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can share this website using the share button in the footer. It works on WhatsApp, Facebook, Twitter, and Email."
          }
        },
        {
          "@type": "Question",
          "name": "Are the images copyrighted?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all images are copyrighted by their respective owners. Please see our disclaimer page for more information about image rights."
          }
        }
      ]
    };

    this.injectSchema(faqSchema);
  }

  injectSchema(schema) {
    try {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error injecting schema:', error);
    }
  }

  setupKeywordTracking() {
    // Track keyword mentions on page
    const pageContent = document.body.innerText.toLowerCase();
    const foundKeywords = [];

    this.keywords.primary.forEach(keyword => {
      if (pageContent.includes(keyword)) {
        foundKeywords.push(keyword);
      }
    });

    this.keywords.friends.forEach(friend => {
      if (pageContent.includes(friend)) {
        foundKeywords.push(friend);
      }
    });

    // Store for analytics
    window.seoKeywords = foundKeywords;
  }

  getFriendData(slug) {
    const friendsData = {
      harsh: { name: 'Harsh', tagline: 'The Adventurous Spirit', instagram: 'codeex._.heoster', story: 'Every adventure begins with a single step, and Harsh is always the first to take it.' },
      parduman: { name: 'Parduman', tagline: 'Always Ready to Help', instagram: 'kittu_pandat001', story: 'True friendship means being there when it matters most.' },
      kartik: { name: 'Kartik', tagline: 'The Creative Genius', instagram: 'kartik_bharadwaj72', story: 'Creativity flows through everything Kartik touches.' },
      pankaj: { name: 'Pankaj', tagline: 'Master of Good Vibes', instagram: '__pankajthakur2', story: 'Laughter is the soundtrack of friendship.' },
      lakshay: { name: 'Lakshay', tagline: 'The Loyal Companion', instagram: '1__numbri__', story: 'Through thick and thin, Lakshay stands by his friends.' },
      nawajish: { name: 'Nawajish', tagline: 'Brings Joy Everywhere', instagram: 'official_nawajish_295', story: 'Like sunshine breaking through clouds, Nawajish brightens every moment.' }
    };

    return friendsData[slug];
  }

  // Public method to get SEO keywords
  static getPageKeywords() {
    return window.seoKeywords || [];
  }

  // Public method to add custom keywords
  static addCustomKeywords(keywords) {
    if (!window.seoKeywords) {
      window.seoKeywords = [];
    }
    window.seoKeywords = [...new Set([...window.seoKeywords, ...keywords])];
  }
}

// Initialize advanced SEO
let advancedSEO;
try {
  advancedSEO = new AdvancedSEO();
  window.advancedSEO = advancedSEO;
} catch (error) {
  console.error('Failed to initialize advanced SEO:', error);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdvancedSEO;
}
