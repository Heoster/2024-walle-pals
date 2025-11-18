// PREMIUM NAVIGATION BAR - Production Ready
class PremiumNavbar {
  constructor() {
    this.navbar = document.querySelector('.navbar-premium') || document.querySelector('.header');
    this.hamburger = document.querySelector('.nav-toggle') || document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.lastScroll = 0;
    this.scrollTimeout = null;
    this.init();
  }

  init() {
    try {
      this.setupScrollBehavior();
      this.setupMobileMenu();
      this.setupSearch();
      this.setupActiveLinks();
      this.setupTouchHandling();
      this.setupResponsive();
    } catch (error) {
      console.error('Error initializing navbar:', error);
    }
  }

  setupScrollBehavior() {
    window.addEventListener('scroll', () => {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }
        
        if (currentScroll > this.lastScroll && currentScroll > 100) {
          this.navbar.style.transform = 'translateY(-100%)';
        } else {
          this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScroll = currentScroll;
      }, 10);
    }, { passive: true });
  }

  setupMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;

    // Toggle menu on hamburger click
    this.hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close menu when clicking on a link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('mobile-active')) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navMenu.classList.contains('mobile-active')) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('mobile-active');
    document.body.style.overflow = 
      this.navMenu.classList.contains('mobile-active') ? 'hidden' : '';
  }

  closeMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('mobile-active');
    document.body.style.overflow = '';
  }

  setupSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    
    if (searchToggle && searchOverlay) {
      searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        const searchInput = searchOverlay.querySelector('input');
        if (searchInput) searchInput.focus();
      });
      
      if (searchClose) {
        searchClose.addEventListener('click', () => {
          searchOverlay.classList.remove('active');
        });
      }
      
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          searchOverlay.classList.remove('active');
        }
      });
    }
  }

  setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    
    const updateActiveLink = () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      this.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  setupTouchHandling() {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      // Swipe left - close menu
      if (diff > swipeThreshold && this.navMenu.classList.contains('mobile-active')) {
        this.closeMenu();
      }

      // Swipe right - open menu
      if (diff < -swipeThreshold && !this.navMenu.classList.contains('mobile-active')) {
        this.toggleMenu();
      }
    };

    this.handleSwipe = handleSwipe;
  }

  setupResponsive() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Close menu on resize to desktop
        if (window.innerWidth > 768) {
          this.closeMenu();
        }
      }, 250);
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PremiumNavbar();
  });
} else {
  new PremiumNavbar();
}
