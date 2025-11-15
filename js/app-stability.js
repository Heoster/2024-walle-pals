// App Stability Enhancements

class AppStability {
  constructor() {
    this.errorCount = 0;
    this.maxErrors = 10;
    this.init();
  }

  init() {
    this.setupErrorHandling();
    this.setupPerformanceMonitoring();
    this.setupResourceLoading();
    this.preventMemoryLeaks();
  }

  setupErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.errorCount++;
      console.error('Global error caught:', event.error);
      
      // Prevent too many errors from crashing the app
      if (this.errorCount > this.maxErrors) {
        console.warn('Too many errors detected. Some features may be disabled.');
        return;
      }

      // Log error details
      this.logError({
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });

      // Prevent default error handling for non-critical errors
      if (!this.isCriticalError(event.error)) {
        event.preventDefault();
      }
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.logError({
        type: 'unhandledRejection',
        reason: event.reason
      });
      event.preventDefault();
    });
  }

  setupPerformanceMonitoring() {
    // Monitor page load performance
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          if (perfData) {
            console.log('Page Load Performance:', {
              loadTime: perfData.loadEventEnd - perfData.loadEventStart,
              domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
              totalTime: perfData.loadEventEnd - perfData.fetchStart
            });
          }
        }, 0);
      });
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration + 'ms');
            }
          }
        });
        observer.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // PerformanceObserver not supported for longtask
      }
    }
  }

  setupResourceLoading() {
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

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }

    // Preload critical resources
    this.preloadCriticalResources();
  }

  preloadCriticalResources() {
    const criticalImages = [
      'assets/favicon.ico',
      'assets/school/gallery1.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  preventMemoryLeaks() {
    // Clean up event listeners on page unload
    window.addEventListener('beforeunload', () => {
      // Remove all custom event listeners
      this.cleanup();
    });

    // Throttle scroll events
    let scrollTimeout;
    const originalScroll = window.onscroll;
    window.onscroll = function(e) {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        if (originalScroll) {
          originalScroll.call(this, e);
        }
      }, 100);
    };
  }

  isCriticalError(error) {
    if (!error) return false;
    
    const criticalPatterns = [
      'Cannot read property',
      'is not a function',
      'undefined is not an object'
    ];

    const errorMessage = error.message || error.toString();
    return criticalPatterns.some(pattern => errorMessage.includes(pattern));
  }

  logError(errorData) {
    // Store errors in sessionStorage for debugging
    try {
      const errors = JSON.parse(sessionStorage.getItem('app_errors') || '[]');
      errors.push({
        ...errorData,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 20 errors
      if (errors.length > 20) {
        errors.shift();
      }
      
      sessionStorage.setItem('app_errors', JSON.stringify(errors));
    } catch (e) {
      console.error('Failed to log error:', e);
    }
  }

  cleanup() {
    // Clear any intervals or timeouts
    const highestId = setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
      clearTimeout(i);
      clearInterval(i);
    }
  }

  // Public method to get error logs
  getErrorLogs() {
    try {
      return JSON.parse(sessionStorage.getItem('app_errors') || '[]');
    } catch (e) {
      return [];
    }
  }

  // Public method to clear error logs
  clearErrorLogs() {
    try {
      sessionStorage.removeItem('app_errors');
      this.errorCount = 0;
    } catch (e) {
      console.error('Failed to clear error logs:', e);
    }
  }
}

// Initialize stability enhancements
let appStability;
try {
  appStability = new AppStability();
  window.appStability = appStability; // Make it globally accessible
} catch (error) {
  console.error('Failed to initialize app stability:', error);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppStability;
}
