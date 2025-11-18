// SEO Optimization Script

class SEOOptimization {
  constructor() {
    this.init();
  }

  init() {
    this.addStructuredData();
    this.optimizePagePerformance();
    this.trackPageMetrics();
  }

  addStructuredData() {
    // Add JSON-LD structured data for Organization
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "2024 Walle Pals",
      "url": "https://2024wallepals.netlify.app",
      "logo": "https://2024wallepals.netlify.app/assets/favicon.ico",
      "description": "A modern interactive website celebrating friendship through a beautiful wall of frames, memories, and shared moments.",
      "sameAs": [
        "https://www.instagram.com/",
        "https://www.facebook.com/",
        "https://twitter.com/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Support",
        "url": "https://2024wallepals.netlify.app/contact.html"
      }
    };

    // Add JSON-LD structured data for WebSite
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "2024 Walle Pals",
      "url": "https://2024wallepals.netlify.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://2024wallepals.netlify.app/?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Add JSON-LD structured data for BreadcrumbList
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://2024wallepals.netlify.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Friends",
          "item": "https://2024wallepals.netlify.app/#wall-of-frames"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Gallery",
          "item": "https://2024wallepals.netlify.app/gallery.html"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Memories",
          "item": "https://2024wallepals.netlify.app/memories.html"
        }
      ]
    };

    // Inject schemas into the page
    this.injectSchema(organizationSchema);
    this.injectSchema(websiteSchema);
    this.injectSchema(breadcrumbSchema);
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

  optimizePagePerformance() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px'
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Preload critical resources
    this.preloadCriticalResources();

    // Defer non-critical CSS
    this.deferNonCriticalCSS();
  }

  preloadCriticalResources() {
    const criticalResources = [
      { rel: 'preload', as: 'style', href: 'css/main.css' },
      { rel: 'preload', as: 'style', href: 'css/hero-enhanced.css' },
      { rel: 'preload', as: 'font', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap', crossorigin: true }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      Object.keys(resource).forEach(key => {
        link.setAttribute(key, resource[key]);
      });
      document.head.appendChild(link);
    });
  }

  deferNonCriticalCSS() {
    const nonCriticalCSS = [
      'css/animations.css',
      'css/responsive.css',
      'css/instagram-display.css'
    ];

    nonCriticalCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = function() {
        this.media = 'all';
      };
      document.head.appendChild(link);
    });
  }

  trackPageMetrics() {
    // Track Core Web Vitals
    if ('web-vital' in window) {
      try {
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
          });
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }

        // First Input Delay
        document.addEventListener('click', (e) => {
          const now = performance.now();
          console.log('FID:', now);
        }, { once: true });

        // Cumulative Layout Shift
        let clsValue = 0;
        if ('PerformanceObserver' in window) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
                console.log('CLS:', clsValue);
              }
            }
          });
          observer.observe({ entryTypes: ['layout-shift'] });
        }
      } catch (error) {
        console.error('Error tracking metrics:', error);
      }
    }
  }

  // Generate meta tags dynamically
  static generateMetaTags(page) {
    const metaTags = {
      home: {
        title: '2024 Walle Pals - Friends Forever | Interactive Friendship Website',
        description: 'A modern interactive website celebrating friendship through a beautiful wall of frames, memories, and shared moments with 26+ friends.',
        keywords: 'friendship, friends, memories, social network, friend circle, 2024'
      },
      gallery: {
        title: 'Gallery - 2024 Walle Pals | Photo Collection',
        description: 'Explore our beautiful gallery of memories and moments shared with friends.',
        keywords: 'gallery, photos, memories, friends, collection'
      },
      memories: {
        title: 'Memories - 2024 Walle Pals | Shared Moments',
        description: 'Relive our cherished memories and special moments together.',
        keywords: 'memories, moments, friends, shared, collection'
      }
    };

    return metaTags[page] || metaTags.home;
  }
}

// Initialize SEO optimization
try {
  const seoOptimization = new SEOOptimization();
  window.seoOptimization = seoOptimization;
} catch (error) {
  console.error('Failed to initialize SEO optimization:', error);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SEOOptimization;
}
