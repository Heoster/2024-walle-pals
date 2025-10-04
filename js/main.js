// Main JavaScript functionality with enhanced stability
class WallePalsApp {
  constructor() {
    this.currentTheme = 'light';
    this.isInitialized = false;
    this.errorCount = 0;
    this.maxErrors = 5;
    
    // Bind methods to preserve context
    this.handleError = this.handleError.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    
    this.init();
  }
  
  init() {
    try {
      // Check if already initialized
      if (this.isInitialized) {
        console.warn('App already initialized');
        return;
      }
      
      // Setup global error handling
      this.setupErrorHandling();
      
      // Initialize components with error boundaries
      this.safeExecute(() => this.setupNavigation(), 'Navigation setup');
      this.safeExecute(() => this.setupScrollAnimations(), 'Scroll animations setup');
      this.safeExecute(() => this.setupMobileMenu(), 'Mobile menu setup');
      this.safeExecute(() => this.setupSmoothScrolling(), 'Smooth scrolling setup');
      this.safeExecute(() => this.setupPerformanceOptimizations(), 'Performance optimizations');
      this.safeExecute(() => this.setupThemeToggle(), 'Theme toggle setup');
      this.safeExecute(() => this.setupAccessibility(), 'Accessibility features');
      
      this.isInitialized = true;
      console.log('Walle Pals app initialized successfully');
      
      // Dispatch initialization event
      document.dispatchEvent(new CustomEvent('appInitialized', {
        detail: { timestamp: Date.now() }
      }));
      
    } catch (error) {
      this.handleError(error, 'App initialization');
    }
  }
  
  // Safe execution wrapper
  safeExecute(fn, context = 'Unknown operation') {
    try {
      return fn();
    } catch (error) {
      this.handleError(error, context);
      return null;
    }
  }
  
  // Enhanced error handling
  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError(event.error, 'Global error', event.filename, event.lineno);
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(event.reason, 'Unhandled promise rejection');
      event.preventDefault(); // Prevent console error
    });
    
    // Page visibility change handler
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }
  
  // Centralized error handling
  handleError(error, context = 'Unknown', filename = '', lineno = 0) {
    this.errorCount++;
    
    const errorInfo = {
      message: error.message || error,
      context,
      filename,
      lineno,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.error('App Error:', errorInfo);
    
    // Show user-friendly error message for critical errors
    if (this.errorCount >= this.maxErrors) {
      this.showCriticalErrorMessage();
    }
    
    // Optional: Send error to logging service
    this.logError(errorInfo);
  }
  
  // Show critical error message to user
  showCriticalErrorMessage() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'critical-error-message';
    errorDiv.innerHTML = `
      <div class="error-content">
        <h3>Something went wrong</h3>
        <p>We're experiencing technical difficulties. Please refresh the page.</p>
        <button onclick="window.location.reload()" class="error-retry-btn">Refresh Page</button>
      </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 10000);
  }
  
  // Log error (placeholder for actual logging service)
  logError(errorInfo) {
    // In production, send to logging service
    // For now, just store in localStorage for debugging
    try {
      const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
      errors.push(errorInfo);
      // Keep only last 10 errors
      if (errors.length > 10) {
        errors.splice(0, errors.length - 10);
      }
      localStorage.setItem('app_errors', JSON.stringify(errors));
    } catch (e) {
      console.warn('Could not log error to localStorage:', e);
    }
  }
  
  // Handle page visibility changes for performance
  handleVisibilityChange() {
    try {
      if (document.hidden) {
        // Page is hidden - pause heavy operations
        this.pauseAnimations();
      } else {
        // Page is visible - resume operations
        this.resumeAnimations();
      }
    } catch (error) {
      this.handleError(error, 'Visibility change handler');
    }
  }
  
  // Pause animations for performance
  pauseAnimations() {
    document.body.classList.add('page-hidden');
    // Pause any running intervals or animations
  }
  
  // Resume animations
  resumeAnimations() {
    document.body.classList.remove('page-hidden');
    // Resume paused animations
  }
  
  // Setup accessibility features
  setupAccessibility() {
    // Skip link for keyboard navigation
    this.addSkipLink();
    
    // Focus management
    this.setupFocusManagement();
    
    // ARIA live regions
    this.setupLiveRegions();
  }
  
  // Add skip link for accessibility
  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  // Setup focus management
  setupFocusManagement() {
    // Trap focus in modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('.modal.active');
        if (modal) {
          this.trapFocus(e, modal);
        }
      }
    });
  }
  
  // Setup ARIA live regions for dynamic content
  setupLiveRegions() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }
  
  // Announce message to screen readers
  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }
  
  // Navigation functionality
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
      // Highlight current page
      if (link.getAttribute('href') === currentPath || 
          (currentPath === '/' && link.getAttribute('href') === '#home')) {
        link.classList.add('active');
      }
      
      // Smooth scroll for anchor links
      if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      }
    });
  }
  
  // Theme toggle functionality
  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else if (systemPrefersDark) {
      this.currentTheme = 'dark';
    }
    
    // Apply theme
    this.applyTheme(this.currentTheme);
    
    // Add event listener
    themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
      }
    });
  }
  
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
  
  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      // Update toggle icon to sun
      this.updateToggleIcon('sun');
    } else {
      document.documentElement.removeAttribute('data-theme');
      // Update toggle icon to moon
      this.updateToggleIcon('moon');
    }
  }
  
  updateToggleIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const svg = themeToggle.querySelector('svg');
    if (theme === 'sun') {
      // Sun icon
      svg.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    } else {
      // Moon icon
      svg.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }
  }
  
  // Mobile menu functionality
  setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
      // Toggle menu
      navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMobileMenu(navToggle, navMenu);
      });
      
      // Close menu when clicking nav links
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.closeMobileMenu(navToggle, navMenu);
        });
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          this.closeMobileMenu(navToggle, navMenu);
        }
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          this.closeMobileMenu(navToggle, navMenu);
        }
      });
      
      // Handle window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          this.closeMobileMenu(navToggle, navMenu);
        }
      });
    }
  }
  
  toggleMobileMenu(navToggle, navMenu) {
    const isActive = navToggle.classList.contains('active');
    
    if (isActive) {
      this.closeMobileMenu(navToggle, navMenu);
    } else {
      this.openMobileMenu(navToggle, navMenu);
    }
  }
  
  openMobileMenu(navToggle, navMenu) {
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Animate menu items
    const menuItems = navMenu.querySelectorAll('li');
    menuItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
  
  closeMobileMenu(navToggle, navMenu) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Reset menu items
    const menuItems = navMenu.querySelectorAll('li');
    menuItems.forEach(item => {
      item.style.transition = '';
      item.style.opacity = '';
      item.style.transform = '';
    });
  }
  
  // Scroll-triggered animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Add staggered animation for child elements
          const children = entry.target.querySelectorAll('.reveal, .friend-frame');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('active');
            }, index * 100);
          });
        }
      });
    }, observerOptions);
    
    // Observe elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));
    
    // Observe sections for general animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));
  }
  
  // Smooth scrolling enhancements
  setupSmoothScrolling() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Performance optimizations
  setupPerformanceOptimizations() {
    // Lazy load images when they're added
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('loading');
              imageObserver.unobserve(img);
            }
          }
        });
      });
      
      // Observe all images with data-src attribute
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
    
    // Optimize animations for performance
    this.optimizeAnimations();
    
    // Handle reduced motion preference
    this.handleReducedMotion();
  }
  
  // Animation performance optimization
  optimizeAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"], .friend-frame');
    
    animatedElements.forEach(element => {
      // Add GPU acceleration
      element.style.willChange = 'transform, opacity';
      element.style.transform = 'translateZ(0)';
      
      // Remove will-change after animation completes
      element.addEventListener('animationend', () => {
        element.style.willChange = 'auto';
      });
    });
  }
  
  // Handle reduced motion preference
  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
      
      // Disable complex animations
      const complexAnimations = document.querySelectorAll('.animate-float, .animate-pulse, .animate-glow');
      complexAnimations.forEach(element => {
        element.style.animation = 'none';
      });
    }
    
    // Listen for changes in motion preference
    prefersReducedMotion.addEventListener('change', (e) => {
      if (e.matches) {
        document.body.classList.add('reduced-motion');
      } else {
        document.body.classList.remove('reduced-motion');
      }
    });
  }
  
  // Utility method to add loading states
  addLoadingState(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
  }
  
  // Utility method to remove loading states
  removeLoadingState(element) {
    element.classList.remove('loading');
    element.style.pointerEvents = 'auto';
  }
  
  // Method to handle page transitions
  handlePageTransition(url) {
    return new Promise((resolve) => {
      // Add page transition effect
      document.body.style.opacity = '0';
      document.body.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        window.location.href = url;
        resolve();
      }, 300);
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.wallePalsApp = new WallePalsApp();
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.classList.add('page-hidden');
  } else {
    // Resume animations when page becomes visible
    document.body.classList.remove('page-hidden');
  }
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WallePalsApp;
}