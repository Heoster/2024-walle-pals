// Performance Monitor for Enhanced Page Stability
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 60,
      memoryUsage: 0,
      loadTime: 0,
      renderTime: 0,
      interactionDelay: 0
    };
    
    this.thresholds = {
      minFPS: 30,
      maxMemory: 100 * 1024 * 1024, // 100MB
      maxLoadTime: 3000, // 3 seconds
      maxRenderTime: 16, // 16ms for 60fps
      maxInteractionDelay: 100 // 100ms
    };
    
    this.isMonitoring = false;
    this.frameCount = 0;
    this.lastFrameTime = performance.now();
    this.performanceIssues = [];
    
    this.init();
  }
  
  init() {
    try {
      this.measureInitialLoad();
      this.startFPSMonitoring();
      this.monitorMemoryUsage();
      this.monitorInteractions();
      this.setupPerformanceObserver();
      
      console.log('Performance monitor initialized');
    } catch (error) {
      console.error('Failed to initialize performance monitor:', error);
    }
  }
  
  // Measure initial page load performance
  measureInitialLoad() {
    window.addEventListener('load', () => {
      try {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          this.metrics.loadTime = navigation.loadEventEnd - navigation.fetchStart;
          
          if (this.metrics.loadTime > this.thresholds.maxLoadTime) {
            this.reportIssue('slow-load', `Page load took ${this.metrics.loadTime}ms`);
          }
          
          console.log(`Page load time: ${this.metrics.loadTime}ms`);
        }
      } catch (error) {
        console.error('Error measuring load time:', error);
      }
    });
  }
  
  // Monitor FPS for smooth animations
  startFPSMonitoring() {
    this.isMonitoring = true;
    
    const measureFPS = (currentTime) => {
      if (!this.isMonitoring) return;
      
      this.frameCount++;
      
      if (currentTime - this.lastFrameTime >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastFrameTime));
        
        if (this.metrics.fps < this.thresholds.minFPS) {
          this.reportIssue('low-fps', `FPS dropped to ${this.metrics.fps}`);
          this.optimizeForPerformance();
        }
        
        this.frameCount = 0;
        this.lastFrameTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }
  
  // Monitor memory usage
  monitorMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        try {
          const memory = performance.memory;
          this.metrics.memoryUsage = memory.usedJSHeapSize;
          
          if (memory.usedJSHeapSize > this.thresholds.maxMemory) {
            this.reportIssue('high-memory', `Memory usage: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB`);
            this.optimizeMemoryUsage();
          }
        } catch (error) {
          console.error('Error monitoring memory:', error);
        }
      }, 5000); // Check every 5 seconds
    }
  }
  
  // Monitor user interactions
  monitorInteractions() {
    const interactionTypes = ['click', 'keydown', 'touchstart'];
    
    interactionTypes.forEach(type => {
      document.addEventListener(type, (event) => {
        const startTime = performance.now();
        
        // Measure interaction delay
        requestAnimationFrame(() => {
          const endTime = performance.now();
          const delay = endTime - startTime;
          
          this.metrics.interactionDelay = delay;
          
          if (delay > this.thresholds.maxInteractionDelay) {
            this.reportIssue('slow-interaction', `${type} interaction took ${delay}ms`);
          }
        });
      }, { passive: true });
    });
  }
  
  // Setup Performance Observer for detailed metrics
  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      try {
        // Observe paint metrics
        const paintObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach(entry => {
            if (entry.name === 'first-contentful-paint') {
              console.log(`First Contentful Paint: ${entry.startTime}ms`);
            }
            if (entry.name === 'largest-contentful-paint') {
              console.log(`Largest Contentful Paint: ${entry.startTime}ms`);
            }
          });
        });
        
        paintObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
        
        // Observe layout shifts
        const layoutObserver = new PerformanceObserver((list) => {
          let cumulativeScore = 0;
          
          list.getEntries().forEach(entry => {
            if (!entry.hadRecentInput) {
              cumulativeScore += entry.value;
            }
          });
          
          if (cumulativeScore > 0.1) {
            this.reportIssue('layout-shift', `Cumulative Layout Shift: ${cumulativeScore}`);
          }
        });
        
        layoutObserver.observe({ entryTypes: ['layout-shift'] });
        
      } catch (error) {
        console.error('Error setting up performance observer:', error);
      }
    }
  }
  
  // Report performance issues
  reportIssue(type, message) {
    const issue = {
      type,
      message,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    this.performanceIssues.push(issue);
    console.warn(`Performance Issue [${type}]:`, message);
    
    // Keep only last 20 issues
    if (this.performanceIssues.length > 20) {
      this.performanceIssues.splice(0, this.performanceIssues.length - 20);
    }
    
    // Store in localStorage for debugging
    try {
      localStorage.setItem('performance_issues', JSON.stringify(this.performanceIssues));
    } catch (error) {
      console.warn('Could not store performance issues:', error);
    }
  }
  
  // Optimize for performance when issues detected
  optimizeForPerformance() {
    console.log('Optimizing for performance...');
    
    // Reduce animation complexity
    document.body.classList.add('performance-mode');
    
    // Pause non-critical animations
    const complexAnimations = document.querySelectorAll('.animate-float, .animate-pulse, .animate-glow');
    complexAnimations.forEach(element => {
      element.style.animationPlayState = 'paused';
    });
    
    // Reduce parallax effects
    const parallaxElements = document.querySelectorAll('.floating-shape');
    parallaxElements.forEach(element => {
      element.style.transform = 'none';
    });
    
    // Disable hover effects on touch devices
    if ('ontouchstart' in window) {
      document.body.classList.add('touch-device');
    }
  }
  
  // Optimize memory usage
  optimizeMemoryUsage() {
    console.log('Optimizing memory usage...');
    
    // Clear unused images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!this.isElementVisible(img)) {
        const placeholder = img.src;
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        img.dataset.originalSrc = placeholder;
      }
    });
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }
  
  // Check if element is visible in viewport
  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top < windowHeight &&
      rect.bottom > 0 &&
      rect.left < windowWidth &&
      rect.right > 0
    );
  }
  
  // Get current performance metrics
  getMetrics() {
    return { ...this.metrics };
  }
  
  // Get performance issues
  getIssues() {
    return [...this.performanceIssues];
  }
  
  // Stop monitoring
  stopMonitoring() {
    this.isMonitoring = false;
  }
  
  // Resume monitoring
  resumeMonitoring() {
    if (!this.isMonitoring) {
      this.startFPSMonitoring();
    }
  }
  
  // Generate performance report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: this.getMetrics(),
      issues: this.getIssues(),
      browser: {
        userAgent: navigator.userAgent,
        memory: performance.memory ? {
          used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        } : null,
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink
        } : null
      }
    };
    
    console.log('Performance Report:', report);
    return report;
  }
}

// Initialize performance monitor
document.addEventListener('DOMContentLoaded', () => {
  window.performanceMonitor = new PerformanceMonitor();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (window.performanceMonitor) {
    if (document.hidden) {
      window.performanceMonitor.stopMonitoring();
    } else {
      window.performanceMonitor.resumeMonitoring();
    }
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceMonitor;
}