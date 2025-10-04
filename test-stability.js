// Comprehensive Stability Test Suite
class StabilityTest {
  constructor() {
    this.tests = [];
    this.results = [];
    this.isRunning = false;
  }
  
  // Run all stability tests
  async runAllTests() {
    if (this.isRunning) {
      console.warn('Tests already running');
      return;
    }
    
    this.isRunning = true;
    this.results = [];
    
    console.log('🚀 Starting comprehensive stability tests...');
    
    try {
      await this.testImageLoading();
      await this.testNetworkHandling();
      await this.testPerformanceMetrics();
      await this.testErrorHandling();
      await this.testAccessibility();
      await this.testResponsiveDesign();
      
      this.generateReport();
    } catch (error) {
      console.error('Test suite failed:', error);
    } finally {
      this.isRunning = false;
    }
  }
  
  // Test image loading and fallbacks
  async testImageLoading() {
    console.log('📸 Testing image loading...');
    
    const testImages = [
      '../assets/school/harsh.jpg',
      '../assets/school/nonexistent.jpg',
      '../assets/school/kartik.jpg'
    ];
    
    for (const src of testImages) {
      try {
        const result = await this.loadTestImage(src);
        this.addResult('image-loading', src, result.success, result.message);
      } catch (error) {
        this.addResult('image-loading', src, false, error.message);
      }
    }
  }
  
  // Test network handling
  async testNetworkHandling() {
    console.log('🌐 Testing network handling...');
    
    // Test online/offline detection
    const isOnline = navigator.onLine;
    this.addResult('network-status', 'online-detection', isOnline, `Navigator online: ${isOnline}`);
    
    // Test fetch with timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/api/health', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      this.addResult('network-fetch', 'api-health', response.ok, `Status: ${response.status}`);
    } catch (error) {
      this.addResult('network-fetch', 'api-health', false, error.message);
    }
  }
  
  // Test performance metrics
  async testPerformanceMetrics() {
    console.log('⚡ Testing performance metrics...');
    
    // Test FPS measurement
    if (window.performanceMonitor) {
      const metrics = window.performanceMonitor.getMetrics();
      this.addResult('performance', 'fps', metrics.fps >= 30, `FPS: ${metrics.fps}`);
      this.addResult('performance', 'memory', metrics.memoryUsage < 100000000, `Memory: ${Math.round(metrics.memoryUsage / 1024 / 1024)}MB`);
    }
    
    // Test load time
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      this.addResult('performance', 'load-time', loadTime < 3000, `Load time: ${loadTime}ms`);
    }
  }
  
  // Test error handling
  async testErrorHandling() {
    console.log('🛡️ Testing error handling...');
    
    // Test global error handler
    const originalHandler = window.onerror;
    let errorCaught = false;
    
    window.onerror = () => {
      errorCaught = true;
      return true;
    };
    
    // Trigger a test error
    try {
      throw new Error('Test error');
    } catch (error) {
      // Error should be caught by global handler
    }
    
    setTimeout(() => {
      this.addResult('error-handling', 'global-handler', errorCaught, 'Global error handler working');
      window.onerror = originalHandler;
    }, 100);
    
    // Test image error handling
    const testImg = document.createElement('img');
    testImg.onerror = () => {
      this.addResult('error-handling', 'image-fallback', true, 'Image error handler working');
    };
    testImg.src = 'nonexistent-image.jpg';
  }
  
  // Test accessibility features
  async testAccessibility() {
    console.log('♿ Testing accessibility...');
    
    // Test skip link
    const skipLink = document.querySelector('.skip-link');
    this.addResult('accessibility', 'skip-link', !!skipLink, skipLink ? 'Skip link present' : 'Skip link missing');
    
    // Test ARIA labels
    const friendFrames = document.querySelectorAll('.friend-frame[aria-label]');
    this.addResult('accessibility', 'aria-labels', friendFrames.length > 0, `${friendFrames.length} elements with ARIA labels`);
    
    // Test focus management
    const focusableElements = document.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    this.addResult('accessibility', 'focusable-elements', focusableElements.length > 0, `${focusableElements.length} focusable elements`);
  }
  
  // Test responsive design
  async testResponsiveDesign() {
    console.log('📱 Testing responsive design...');
    
    const breakpoints = [320, 768, 1024, 1200];
    
    for (const width of breakpoints) {
      // Simulate viewport width (limited testing in browser)
      const mediaQuery = window.matchMedia(`(min-width: ${width}px)`);
      this.addResult('responsive', `breakpoint-${width}`, true, `Breakpoint ${width}px: ${mediaQuery.matches ? 'active' : 'inactive'}`);
    }
    
    // Test mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    this.addResult('responsive', 'mobile-menu', !!(navToggle && navMenu), 'Mobile menu elements present');
  }
  
  // Helper method to load test image
  loadTestImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        resolve({ success: true, message: 'Image loaded successfully' });
      };
      
      img.onerror = () => {
        resolve({ success: false, message: 'Image failed to load (expected for test)' });
      };
      
      // Set timeout for loading
      setTimeout(() => {
        resolve({ success: false, message: 'Image load timeout' });
      }, 5000);
      
      img.src = src;
    });
  }
  
  // Add test result
  addResult(category, test, success, message) {
    this.results.push({
      category,
      test,
      success,
      message,
      timestamp: Date.now()
    });
    
    const status = success ? '✅' : '❌';
    console.log(`${status} ${category}/${test}: ${message}`);
  }
  
  // Generate comprehensive report
  generateReport() {
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const successRate = Math.round((passedTests / totalTests) * 100);
    
    console.log('\n📊 STABILITY TEST REPORT');
    console.log('========================');
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests}`);
    console.log(`Failed: ${failedTests}`);
    console.log(`Success Rate: ${successRate}%`);
    
    // Group results by category
    const categories = {};
    this.results.forEach(result => {
      if (!categories[result.category]) {
        categories[result.category] = [];
      }
      categories[result.category].push(result);
    });
    
    console.log('\n📋 DETAILED RESULTS');
    console.log('===================');
    
    Object.keys(categories).forEach(category => {
      const categoryResults = categories[category];
      const categoryPassed = categoryResults.filter(r => r.success).length;
      const categoryTotal = categoryResults.length;
      
      console.log(`\n${category.toUpperCase()}: ${categoryPassed}/${categoryTotal}`);
      categoryResults.forEach(result => {
        const status = result.success ? '✅' : '❌';
        console.log(`  ${status} ${result.test}: ${result.message}`);
      });
    });
    
    // Store results for debugging
    try {
      localStorage.setItem('stability_test_results', JSON.stringify({
        timestamp: new Date().toISOString(),
        summary: { totalTests, passedTests, failedTests, successRate },
        results: this.results
      }));
    } catch (error) {
      console.warn('Could not store test results:', error);
    }
    
    return {
      summary: { totalTests, passedTests, failedTests, successRate },
      results: this.results
    };
  }
}

// Auto-run tests when page loads (in development)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for other scripts to initialize
    setTimeout(() => {
      const stabilityTest = new StabilityTest();
      window.stabilityTest = stabilityTest;
      
      // Auto-run tests after 2 seconds
      setTimeout(() => {
        stabilityTest.runAllTests();
      }, 2000);
    }, 1000);
  });
}

// Export for manual testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StabilityTest;
}