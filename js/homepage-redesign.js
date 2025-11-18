// Homepage Redesign - Interactive Features
class HomepageRedesign {
  constructor() {
    this.init();
  }

  init() {
    this.setupCarousel();
    this.setupConnectionMap();
    this.setupStatCounters();
    this.setupScrollAnimations();
  }

  // Enhanced Memory Carousel
  setupCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track) return;

    const items = track.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    // Create dots
    items.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => this.goToSlide(index, track, items, dotsContainer));
      dotsContainer.appendChild(dot);
    });

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update dots
      document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    });

    // Auto-advance carousel
    setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      updateCarousel();
    }, 5000);
  }

  goToSlide(index, track, items, dotsContainer) {
    track.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Connection Map with animated nodes
  setupConnectionMap() {
    const canvas = document.getElementById('connectionCanvas');
    if (!canvas) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    canvas.appendChild(svg);

    // Create nodes
    const nodeCount = 8;
    const nodes = [];
    const centerX = canvas.offsetWidth / 2;
    const centerY = canvas.offsetHeight / 2;
    const radius = Math.min(centerX, centerY) - 60;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      const node = document.createElement('div');
      node.className = 'connection-node';
      node.style.left = x + 'px';
      node.style.top = y + 'px';
      node.style.transform = 'translate(-50%, -50%)';
      node.textContent = ['👥', '💬', '🎉', '📸', '🌟', '💪', '🎓', '❤️'][i];
      node.style.animationDelay = (i * 0.2) + 's';
      canvas.appendChild(node);

      nodes.push({ x, y, element: node });
    }

    // Draw connecting lines
    nodes.forEach((node, i) => {
      const nextNode = nodes[(i + 1) % nodes.length];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', node.x);
      line.setAttribute('y1', node.y);
      line.setAttribute('x2', nextNode.x);
      line.setAttribute('y2', nextNode.y);
      line.setAttribute('class', 'connection-line');
      line.style.animationDelay = (i * 0.1) + 's';
      svg.appendChild(line);
    });

    // Add center node
    const centerNode = document.createElement('div');
    centerNode.className = 'connection-node';
    centerNode.style.left = centerX + 'px';
    centerNode.style.top = centerY + 'px';
    centerNode.style.transform = 'translate(-50%, -50%)';
    centerNode.style.width = '70px';
    centerNode.style.height = '70px';
    centerNode.style.fontSize = '2rem';
    centerNode.textContent = '🤝';
    centerNode.style.animation = 'none';
    canvas.appendChild(centerNode);

    // Connect center to all nodes
    nodes.forEach((node, i) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', centerX);
      line.setAttribute('y1', centerY);
      line.setAttribute('x2', node.x);
      line.setAttribute('y2', node.y);
      line.setAttribute('class', 'connection-line');
      line.style.opacity = '0.15';
      line.style.animationDelay = (i * 0.15) + 's';
      svg.appendChild(line);
    });
  }

  // Animated stat counters
  setupStatCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    const animateCounter = (element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000;
      const start = Date.now();

      const update = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(target * progress);
        element.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      update();
    };

    // Observe counters and animate when visible
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

  // Scroll animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HomepageRedesign();
});
