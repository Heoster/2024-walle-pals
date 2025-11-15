// Advanced animation controller
class AnimationController {
  constructor() {
    this.activeAnimations = new Set();
    this.observedElements = new Map();
    this.animationQueue = [];
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupHoverAnimations();
    this.monitorPerformance();
    }
  
  // Setup intersection observer for scroll-triggered animations
  setupIntersectionObserver() {
    const options = {
      threshold: [0.1, 0.3, 0.5, 0.7],
      rootMargin: '0px 0px -10% 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const animationType = element.dataset.animation || 'fadeInUp';
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          this.triggerAnimation(element, animationType);
        }
      });
    }, options);
    
    // Observe all elements with animation data attributes
    document.querySelectorAll('[data-animation]').forEach(el => {
      this.observer.observe(el);
    });
  }
  
  // Setup scroll-based animations
  setupScrollAnimations() {
    let ticking = false;
    
    const updateScrollAnimations = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Parallax effect for hero shapes
      const heroShapes = document.querySelectorAll('.floating-shape');
      heroShapes.forEach((shape, index) => {
        if (!this.isReducedMotion) {
          const speed = 0.5 + (index * 0.2);
          const yPos = -(scrollY * speed);
          shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
      
      // Update progress indicators if they exist
      const progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        bar.style.transform = `scaleX(${progress})`;
      });
      
      ticking = false;
    };
    
    const requestScrollUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  }
  
  // Setup hover animations
  setupHoverAnimations() {
    const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-glow, .hover-rotate');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        if (!this.isReducedMotion) {
          this.addHoverEffect(e.target);
        }
      });
      
      element.addEventListener('mouseleave', (e) => {
        this.removeHoverEffect(e.target);
      });
    });
  }
  
  // Trigger animation on element
  triggerAnimation(element, animationType = 'fadeInUp') {
    if (this.isReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }
    
    // Prevent duplicate animations
    if (this.activeAnimations.has(element)) {
      return;
    }
    
    this.activeAnimations.add(element);
    
    // Add animation class
    element.classList.add(`animate-${animationType}`);
    element.classList.add('will-animate');
    
    // Handle staggered children
    const children = element.querySelectorAll('[data-stagger]');
    children.forEach((child, index) => {
      const delay = parseInt(child.dataset.stagger) || (index * 100);
      setTimeout(() => {
        child.classList.add(`animate-${animationType}`);
      }, delay);
    });
    
    // Clean up after animation
    const cleanup = () => {
      element.classList.remove('will-animate');
      this.activeAnimations.delete(element);
      element.removeEventListener('animationend', cleanup);
    };
    
    element.addEventListener('animationend', cleanup);
  }
  
  // Add hover effect
  addHoverEffect(element) {
    element.style.willChange = 'transform';
    
    if (element.classList.contains('hover-lift')) {
      element.style.transform = 'translateY(-5px)';
    }
    
    if (element.classList.contains('hover-scale')) {
      element.style.transform = 'scale(1.05)';
    }
    
    if (element.classList.contains('hover-rotate')) {
      element.style.transform = 'rotate(5deg)';
    }
    
    if (element.classList.contains('hover-glow')) {
      element.style.boxShadow = '0 10px 30px rgba(79, 172, 254, 0.3)';
    }
  }
  
  // Remove hover effect
  removeHoverEffect(element) {
    element.style.willChange = 'auto';
    element.style.transform = '';
    element.style.boxShadow = '';
  }
  
  // Create custom animation
  createCustomAnimation(element, keyframes, options = {}) {
    if (this.isReducedMotion) {
      return Promise.resolve();
    }
    
    const defaultOptions = {
      duration: 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    };
    
    const animationOptions = { ...defaultOptions, ...options };
    
    return element.animate(keyframes, animationOptions);
  }
  
  // Stagger animation for multiple elements
  staggerAnimation(elements, animationType, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        this.triggerAnimation(element, animationType);
      }, index * delay);
    });
  }
  
  // Chain animations
  chainAnimations(element, animations) {
    return animations.reduce((promise, animation) => {
      return promise.then(() => {
        return this.createCustomAnimation(element, animation.keyframes, animation.options);
      });
    }, Promise.resolve());
  }
  
  // Performance monitoring
  monitorPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkFrameRate = (currentTime) => {
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // If FPS drops below 30, reduce animation complexity
        if (fps < 30) {
          this.reduceAnimationComplexity();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkFrameRate);
    };
    
    requestAnimationFrame(checkFrameRate);
  }
  
  // Reduce animation complexity for performance
  reduceAnimationComplexity() {
    console.warn('Reducing animation complexity due to low FPS');
    
    // Disable complex animations
    const complexAnimations = document.querySelectorAll('.animate-float, .animate-pulse, .animate-glow');
    complexAnimations.forEach(element => {
      element.style.animation = 'none';
    });
    
    // Reduce parallax effects
    const parallaxElements = document.querySelectorAll('.floating-shape');
    parallaxElements.forEach(element => {
      element.style.transform = 'none';
    });
  }
  
  // Cleanup method
  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    this.activeAnimations.clear();
    this.observedElements.clear();
    this.animationQueue = [];
  }
}

// Utility functions for common animations
const AnimationUtils = {
  // Fade in animation
  fadeIn(element, duration = 500) {
    return element.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], {
      duration,
      easing: 'ease-out',
      fill: 'forwards'
    });
  },
  
  // Slide in animation
  slideIn(element, direction = 'up', duration = 500) {
    const transforms = {
      up: ['translateY(30px)', 'translateY(0)'],
      down: ['translateY(-30px)', 'translateY(0)'],
      left: ['translateX(-30px)', 'translateX(0)'],
      right: ['translateX(30px)', 'translateX(0)']
    };
    
    return element.animate([
      { 
        opacity: 0, 
        transform: transforms[direction][0] 
      },
      { 
        opacity: 1, 
        transform: transforms[direction][1] 
      }
    ], {
      duration,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards'
    });
  },
  
  // Scale animation
  scale(element, from = 0.8, to = 1, duration = 300) {
    return element.animate([
      { 
        opacity: 0, 
        transform: `scale(${from})` 
      },
      { 
        opacity: 1, 
        transform: `scale(${to})` 
      }
    ], {
      duration,
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      fill: 'forwards'
    });
  },
  
  // Bounce animation
  bounce(element, intensity = 1) {
    const keyframes = [
      { transform: 'translateY(0)' },
      { transform: `translateY(-${20 * intensity}px)` },
      { transform: 'translateY(0)' },
      { transform: `translateY(-${10 * intensity}px)` },
      { transform: 'translateY(0)' }
    ];
    
    return element.animate(keyframes, {
      duration: 600,
      easing: 'ease-out'
    });
  }
};

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.animationController = new AnimationController();
  window.AnimationUtils = AnimationUtils;
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AnimationController, AnimationUtils };
}
