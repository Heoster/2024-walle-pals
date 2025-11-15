// ENHANCED HERO SECTION
class HeroEnhanced {
  constructor() {
    this.init();
  }

  init() {
    this.setupTypewriter();
    this.setupCounters();
    this.setupParticles();
    this.setupCTAButtons();
  }

  setupTypewriter() {
    const typewriterText = "Where friendships come alive through memories and connections";
    const typewriterElement = document.getElementById('typewriter-text');
    
    if (!typewriterElement) return;
    
    let charIndex = 0;
    
    const typeWriter = () => {
      if (charIndex < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }

  setupCounters() {
    const animateCounter = (element) => {
      const target = parseInt(element.dataset.target);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      };

      updateCounter();
    };

    const statNumbers = document.querySelectorAll('.stat-value[data-target], .stat-number[data-target]');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target);
        }
      });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
  }

  setupParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = window.innerWidth < 768 ? 30 : 50;
    const particles = Array.from({ length: particleCount }, () => new Particle());

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  setupCTAButtons() {
    document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary').forEach(button => {
      button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HeroEnhanced();
});
