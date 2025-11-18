// Universal Image Loader with Encoding Fix
class ImageLoader {
  constructor() {
    this.retryAttempts = 3;
    this.retryDelay = 1000; // ms
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupImageHandling());
    } else {
      this.setupImageHandling();
    }
  }

  setupImageHandling() {
    // Handle all images with data-src attribute (lazy loading)
    this.setupLazyImages();
    
    // Handle profile avatars
    this.setupProfileAvatars();
    
    // Handle gallery images
    this.setupGalleryImages();
  }

  setupLazyImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img, img.dataset.src);
            imageObserver.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => {
        this.loadImage(img, img.dataset.src);
      });
    }
  }

  setupProfileAvatars() {
    const avatars = document.querySelectorAll('.profile-avatar');
    
    avatars.forEach(avatar => {
      // Add error handler
      avatar.addEventListener('error', (e) => {
        this.handleImageError(e.target);
      });
      
      // Add load handler
      avatar.addEventListener('load', (e) => {
        this.handleImageLoad(e.target);
      });
      
      // If image is already loaded, check if it's valid
      if (avatar.complete) {
        if (avatar.naturalHeight === 0) {
          this.handleImageError(avatar);
        } else {
          this.handleImageLoad(avatar);
        }
      }
    });
  }

  setupGalleryImages() {
    const galleryImages = document.querySelectorAll('.gallery-grid img, .memory-card img');
    
    galleryImages.forEach(img => {
      img.addEventListener('error', (e) => {
        this.handleImageError(e.target);
      });
      
      img.addEventListener('load', (e) => {
        this.handleImageLoad(e.target);
      });
    });
  }

  loadImage(img, src, attempt = 0) {
    if (!src) return;
    
    const tempImg = new Image();
    
    tempImg.onload = () => {
      img.src = src;
      img.classList.add('image-loaded');
      console.log('✅ Image loaded:', src);
    };
    
    tempImg.onerror = () => {
      if (attempt < this.retryAttempts) {
        console.warn(`⚠️ Retry ${attempt + 1}/${this.retryAttempts} for:`, src);
        setTimeout(() => {
          this.loadImage(img, src, attempt + 1);
        }, this.retryDelay);
      } else {
        console.error('❌ Failed to load image after retries:', src);
        this.handleImageError(img);
      }
    };
    
    tempImg.src = src;
  }

  handleImageError(img) {
    console.warn('Image error:', img.src);
    
    // Set fallback image
    const fallback = img.dataset.fallback || '../assets/favicon.ico';
    img.src = fallback;
    img.style.opacity = '0.8';
    img.classList.add('image-error');
    
    // Add error indicator
    if (!img.parentElement.querySelector('.image-error-indicator')) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'image-error-indicator';
      errorDiv.innerHTML = '📷';
      errorDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        opacity: 0.5;
      `;
      img.parentElement.style.position = 'relative';
      img.parentElement.appendChild(errorDiv);
    }
  }

  handleImageLoad(img) {
    img.classList.add('image-loaded');
    img.style.opacity = '1';
    console.log('✅ Image loaded successfully:', img.src);
  }

  // Retry loading a specific image
  retryImage(img) {
    if (img.dataset.src) {
      this.loadImage(img, img.dataset.src);
    } else {
      this.loadImage(img, img.src);
    }
  }

  // Preload images
  preloadImages(urls) {
    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.imageLoader = new ImageLoader();
  });
} else {
  window.imageLoader = new ImageLoader();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageLoader;
}
