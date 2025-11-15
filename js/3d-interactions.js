/* ===================================
   3D INTERACTIONS & ANIMATIONS
   Enhanced 3D effects and interactions
   =================================== */

class ThreeDInteractions {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupParallax();
    this.setupTiltEffect();
    this.setupParticles();
    this.setupCounterAnimations();
    this.setup3DCards();
    this.setupMouseFollower();
  }
  
  // Parallax Effect on Mouse Move
  setupParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    });
    
    const animate = () => {
      // Smooth interpolation
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      
      // Apply parallax to hero content
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent) {
        const translateX = currentX * 20;
        const translateY = currentY * 20;
        const rotateY = currentX * 5;
        const rotateX = -currentY * 5;
        
        heroContent.style.transform = `
          translateX(${translateX}px) 
          translateY(${translateY}px) 
          rotateY(${rotateY}deg) 
          rotateX(${rotateX}deg)
          translateZ(30px)
        `;
      }
      
      // Apply parallax to floating shapes
      const shapes = hero.querySelectorAll('.floating-shape');
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const translateX = currentX * 30 * speed;
        const translateY = currentY * 30 * speed;
        
        shape.style.transform = `
          translateX(${translateX}px) 
          translateY(${translateY}px)
          translateZ(${speed * 20}px)
        `;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  // 3D Tilt Effect for Cards
  setupTiltEffect() {
    const tiltElements = document.querySelectorAll('.highlight-card, .memory-card, .friend-frame');
    
    tiltElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.style.transition = 'none';
      });
      
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(20px)
          scale3d(1.05, 1.05, 1.05)
        `;
        
        // Add shine effect
        const shine = element.querySelector('.shine') || this.createShine(element);
        if (shine) {
          shine.style.background = `
            radial-gradient(
              circle at ${x}px ${y}px,
              rgba(255, 255, 255, 0.3),
              transparent 50%
            )
          `;
        }
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        element.style.transform = '';
        
        const shine = element.querySelector('.shine');
        if (shine) {
          shine.style.background = '';
        }
      });
    });
  }
  
  // Create shine overlay for cards
  createShine(element) {
    const shine = document.createElement('div');
    shine.className = 'shine';
    shine.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      border-radius: inherit;
      z-index: 1;
    `;
    element.style.position = 'relative';
    element.appendChild(shine);
    return shine;
  }
  
  // Animated Particles Background
  setupParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random size
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random animation delay and duration
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      
      particlesContainer.appendChild(particle);
    }
  }
  
  // Counter Animation for Stats
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    };
    
    // Intersection Observer for triggering animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  }
  
  // 3D Card Carousel Setup
  setup3DCards() {
    const card3d = document.querySelector('.card-3d');
    if (!card3d) return;
    
    let rotation = 0;
    let isHovered = false;
    
    card3d.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    
    card3d.addEventListener('mouseleave', () => {
      isHovered = false;
    });
    
    const animate = () => {
      if (!isHovered) {
        rotation += 0.2;
        card3d.style.transform = `rotateY(${rotation}deg)`;
      }
      requestAnimationFrame(animate);
    };
    
    animate();
  }
  
  // Mouse Follower Effect
  setupMouseFollower() {
    // Create cursor follower
    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    follower.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.5), transparent);
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease;
      display: none;
    `;
    document.body.appendChild(follower);
    
    // Only show on desktop
    if (window.innerWidth > 1024) {
      follower.style.display = 'block';
      
      let mouseX = 0;
      let mouseY = 0;
      let followerX = 0;
      let followerY = 0;
      
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      
      const animateFollower = () => {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX - 10 + 'px';
        follower.style.top = followerY - 10 + 'px';
        
        requestAnimationFrame(animateFollower);
      };
      
      animateFollower();
      
      // Scale up on interactive elements
      const interactiveElements = document.querySelectorAll('a, button, .friend-frame, .highlight-card');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          follower.style.transform = 'scale(2)';
          follower.style.background = 'radial-gradient(circle, rgba(240, 147, 251, 0.5), transparent)';
        });
        
        element.addEventListener('mouseleave', () => {
          follower.style.transform = 'scale(1)';
          follower.style.background = 'radial-gradient(circle, rgba(102, 126, 234, 0.5), transparent)';
        });
      });
    }
  }
}

// Scroll-triggered 3D Animations
class ScrollAnimations {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupScrollReveal();
    this.setupParallaxScroll();
  }
  
  setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => observer.observe(element));
  }
  
  setupParallaxScroll() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.fps = 0;
    this.lastTime = performance.now();
    this.frames = 0;
    this.init();
  }
  
  init() {
    this.measureFPS();
    this.optimizeForDevice();
  }
  
  measureFPS() {
    const measure = () => {
      const currentTime = performance.now();
      this.frames++;
      
      if (currentTime >= this.lastTime + 1000) {
        this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
        this.frames = 0;
        this.lastTime = currentTime;
        
        // Reduce effects if FPS is low
        if (this.fps < 30) {
          this.reducedEffects();
        }
      }
      
      requestAnimationFrame(measure);
    };
    
    measure();
  }
  
  reducedEffects() {
    document.body.classList.add('reduced-effects');
    console.warn('Low FPS detected, reducing effects');
  }
  
  optimizeForDevice() {
    // Detect device capabilities
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    
    if (isMobile || isLowEnd) {
      document.body.classList.add('low-end-device');
      
      // Reduce particle count
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        if (index > 20) particle.remove();
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ThreeDInteractions();
  new ScrollAnimations();
  new PerformanceMonitor();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThreeDInteractions, ScrollAnimations, PerformanceMonitor };
}
