// Homepage Enhancements

// Particle System
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
  }
}

// Animated Counter
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

// Scroll Reveal Animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(element => {
    observer.observe(element);
  });
}

// Smooth Scroll for CTA buttons
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Parallax Effect for Hero
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = hero.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
  });
}

// Highlight Cards Tilt Effect
function initTiltEffect() {
  const cards = document.querySelectorAll('.highlight-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Initialize Stats Counter when visible
function initStatsCounter() {
  const statValues = document.querySelectorAll('.stat-value');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  statValues.forEach(stat => {
    observer.observe(stat);
  });
}

// Add floating animation to hero shapes
function animateHeroShapes() {
  const shapes = document.querySelectorAll('.floating-shape');
  
  shapes.forEach((shape, index) => {
    const randomX = Math.random() * 100 - 50;
    const randomY = Math.random() * 100 - 50;
    const duration = 5 + Math.random() * 5;
    
    shape.style.animation = `float ${duration}s ease-in-out infinite`;
    shape.style.animationDelay = `${index * 0.5}s`;
  });
}

// Loading Animation
function initLoadingAnimation() {
  document.body.classList.add('loaded');
  
  // Trigger animations after a short delay
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-badge');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, 100);
}

// Initialize all enhancements
function init() {
  // Check if we're on the homepage
  if (!document.querySelector('.hero')) return;
  
  createParticles();
  initSmoothScroll();
  revealOnScroll();
  initParallax();
  initTiltEffect();
  initStatsCounter();
  animateHeroShapes();
  initLoadingAnimation();
  
  // Add scroll indicator hide on scroll
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    });
  }
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { init, createParticles, animateCounter };
}
