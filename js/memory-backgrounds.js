// Memory Backgrounds - Random Image Management
class MemoryBackgrounds {
  constructor() {
    this.memoryImages = [
      'assets/memories/memories1.jpg',
      'assets/memories/memories2.jpg',
      'assets/memories/memories3.jpg',
      'assets/memories/memories4.jpg',
      'assets/memories/memories5.jpg',
      'assets/memories/memories6.jpg',
      'assets/memories/memories7.jpg',
      'assets/memories/memories8.jpg',
      'assets/memories/memories9.jpg',
      'assets/memories/memories10.jpg',
      'assets/memories/memories11.jpg',
      'assets/memories/memories12.jpg',
      'assets/memories/memories13.jpg',
      'assets/memories/memories14.jpg',
      'assets/memories/memories15.jpg',
      'assets/memories/memories16.jpg',
      'assets/memories/memories17.jpg',
      'assets/memories/memories18.jpg',
      'assets/memories/memories19.jpg',
      'assets/memories/memories20.jpg',
      'assets/memories/memories21.jpg',
      'assets/memories/memories22.jpg',
      'assets/memories/memories23.jpg',
      'assets/memories/memories25.jpg',
      'assets/memories/memories26.jpg',
      'assets/memories/memories28.jpg',
      'assets/memories/memories29.jpg',
      'assets/memories/memories30.jpg',
      'assets/memories/memories32.jpg',
      'assets/memories/memories33.jpg',
      'assets/memories/memories34.jpg',
      'assets/memories/memories35.jpg'
    ];

    this.currentImageIndex = 0;
    this.rotationInterval = 8000; // Change image every 8 seconds
    this.init();
  }

  init() {
    this.createBackgroundContainer();
    this.startImageRotation();
    this.setupScrollListener();
  }

  createBackgroundContainer() {
    // Create pattern background
    const pattern = document.createElement('div');
    pattern.className = 'memory-bg-pattern';
    document.body.insertBefore(pattern, document.body.firstChild);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'memory-bg-overlay';
    document.body.insertBefore(overlay, document.body.firstChild);

    // Create main background container
    const container = document.createElement('div');
    container.className = 'memory-bg-container';
    document.body.insertBefore(container, document.body.firstChild);

    // Create initial background items
    for (let i = 0; i < 2; i++) {
      const item = document.createElement('div');
      item.className = 'memory-bg-item';
      if (i === 0) item.classList.add('active');
      container.appendChild(item);
    }

    // Create memory indicator
    this.createMemoryIndicator();
  }

  createMemoryIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'memory-indicator';
    indicator.innerHTML = `
      <div class="memory-indicator-dot"></div>
      <span id="memoryCount">1 / ${this.memoryImages.length}</span>
    `;
    document.body.appendChild(indicator);
  }

  getRandomImage() {
    const randomIndex = Math.floor(Math.random() * this.memoryImages.length);
    return this.memoryImages[randomIndex];
  }

  startImageRotation() {
    // Set initial image
    this.setBackgroundImage(this.getRandomImage());

    // Rotate images periodically
    setInterval(() => {
      this.rotateImage();
    }, this.rotationInterval);
  }

  rotateImage() {
    const container = document.querySelector('.memory-bg-container');
    const items = container.querySelectorAll('.memory-bg-item');
    const activeItem = container.querySelector('.memory-bg-item.active');
    const inactiveItem = Array.from(items).find(item => !item.classList.contains('active'));

    if (!inactiveItem) return;

    // Get new random image
    const newImage = this.getRandomImage();

    // Set new image on inactive item
    inactiveItem.style.backgroundImage = `url('${newImage}')`;

    // Transition
    activeItem.classList.add('transitioning');
    activeItem.classList.remove('active');

    setTimeout(() => {
      inactiveItem.classList.add('active');
      activeItem.classList.remove('transitioning');
    }, 100);

    // Update counter
    this.currentImageIndex = (this.currentImageIndex + 1) % this.memoryImages.length;
    const counter = document.getElementById('memoryCount');
    if (counter) {
      counter.textContent = `${this.currentImageIndex + 1} / ${this.memoryImages.length}`;
    }
  }

  setBackgroundImage(imagePath) {
    const container = document.querySelector('.memory-bg-container');
    const activeItem = container.querySelector('.memory-bg-item.active');
    if (activeItem) {
      activeItem.style.backgroundImage = `url('${imagePath}')`;
    }
  }

  setupScrollListener() {
    // Adjust background opacity based on scroll position for better readability
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateBackgroundOpacity();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  updateBackgroundOpacity() {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrolled / maxScroll;

    // Slightly increase opacity as user scrolls for visual feedback
    const overlay = document.querySelector('.memory-bg-overlay');
    if (overlay) {
      const opacity = 0.88 + scrollPercent * 0.04;
      overlay.style.opacity = Math.min(opacity, 0.96);
    }
  }

  // Method to manually change rotation speed
  setRotationSpeed(milliseconds) {
    this.rotationInterval = milliseconds;
  }

  // Method to get current background image
  getCurrentImage() {
    const activeItem = document.querySelector('.memory-bg-item.active');
    return activeItem ? activeItem.style.backgroundImage : null;
  }

  // Method to preload images for better performance
  preloadImages() {
    this.memoryImages.forEach(imagePath => {
      const img = new Image();
      img.src = imagePath;
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const memoryBg = new MemoryBackgrounds();
  
  // Preload images in background
  setTimeout(() => {
    memoryBg.preloadImages();
  }, 2000);

  // Make available globally for debugging
  window.memoryBackgrounds = memoryBg;
});
