// ADVANCED 3D CAROUSEL
class Carousel3D {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.carousel-track');
    this.items = [];
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.radius = 600;
    
    this.init();
  }

  init() {
    this.createItems();
    this.createDots();
    this.setupControls();
    this.updateCarousel();
    this.startAutoplay();
  }

  createItems() {
    const images = [
      'memories1.jpg', 'memories2.jpg', 'memories3.jpg',
      'memories4.jpg', 'memories5.jpg', 'memories6.jpg',
      'memories7.jpg', 'memories8.jpg', 'memories9.jpg', 'memories10.jpg'
    ];

    images.forEach((src, index) => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.innerHTML = `
        <img src="assets/memories/${src}" alt="Memory ${index + 1}" loading="lazy">
        <div class="carousel-caption">
          <h3>Memory ${index + 1}</h3>
          <p>An amazing moment from our journey</p>
        </div>
      `;
      this.track.appendChild(item);
      this.items.push(item);
    });
  }

  createDots() {
    const dotsContainer = document.getElementById('carousel-dots');
    if (!dotsContainer) return;
    
    this.items.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  setupControls() {
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) this.next();
      if (touchEndX > touchStartX + 50) this.prev();
    });
  }

  updateCarousel() {
    const angle = 360 / this.items.length;

    this.items.forEach((item, index) => {
      const itemAngle = angle * index;
      const rotateY = itemAngle - (this.currentIndex * angle);
      
      const translateZ = index === this.currentIndex ? this.radius + 100 : this.radius;
      const scale = index === this.currentIndex ? 1.1 : 1;
      const opacity = Math.abs(index - this.currentIndex) <= 2 ? 1 : 0;

      item.style.transform = `
        translateX(-50%)
        translateY(-50%)
        rotateY(${rotateY}deg)
        translateZ(${translateZ}px)
        scale(${scale})
      `;
      item.style.opacity = opacity;
      item.classList.toggle('active', index === this.currentIndex);
    });

    this.updateProgress();
    this.updateDots();
  }

  updateProgress() {
    const progressBar = document.getElementById('carousel-progress');
    if (progressBar) {
      const progress = ((this.currentIndex + 1) / this.items.length) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }

  updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateCarousel();
    this.resetAutoplay();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateCarousel();
    this.resetAutoplay();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
    this.resetAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.getElementById('carousel-3d');
  if (carouselContainer) {
    new Carousel3D(carouselContainer);
  }
});
