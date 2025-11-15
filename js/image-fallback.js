// Image Fallback System for Enhanced Stability
class ImageFallbackManager {
  constructor() {
    this.fallbackImages = {
      'harsh.jpg': ['../assets/school/harsh.jpg', '../assets/school/gallery1.jpg', '../assets/memories/harsh.jpg'],
      'kartik.jpg': ['../assets/school/kartik.jpg', '../assets/school/gallery3.jpg'],
      'pankaj.jpg': ['../assets/school/pankaj.jpg', '../assets/school/gallery4.jpg'],
      'nawajish.jpg': ['../assets/school/nawajish (1).jpg', '../assets/school/nawajish (2).jpg', '../assets/school/gallery6.jpg'],
      'vishesh.jpg': ['../assets/school/vishesh.jpg', '../assets/school/gallery7.jpg'],
      'sahil.jpg': ['../assets/school/sahil.jpg', '../assets/school/gallery8.jpg'],
      'mudashir.jpg': ['../assets/school/mudahsir.jpg', '../assets/school/gallery27.jpg']
    };
    
    this.defaultFallback = '../assets/school/gallery1.jpg';
    this.loadingPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+';
    
    this.init();
  }
  
  init() {
    try {
      this.setupImageObserver();
      this.setupGlobalErrorHandler();
      this.preloadCriticalImages();
      } catch (error) {
      console.error('Failed to initialize image fallback manager:', error);
    }
  }
  
  // Setup intersection observer for lazy loading
  setupImageObserver() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      this.loadAllImages();
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      observer.observe(img);
    });
  }
  
  // Setup global error handler for images
  setupGlobalErrorHandler() {
    document.addEventListener('error', (event) => {
      if (event.target.tagName === 'IMG') {
        this.handleImageError(event.target);
      }
    }, true);
  }
  
  // Handle image loading errors with fallback chain
  handleImageError(img) {
    try {
      const currentSrc = img.src;
      const imgName = this.extractImageName(currentSrc);
      
      // Get fallback chain for this image
      const fallbacks = this.fallbackImages[imgName] || [this.defaultFallback];
      
      // Find next fallback that hasn't been tried
      const currentIndex = fallbacks.indexOf(currentSrc);
      const nextIndex = currentIndex + 1;
      
      if (nextIndex < fallbacks.length) {
        img.src = fallbacks[nextIndex];
      } else {
        // All fallbacks failed, show placeholder
        this.showImagePlaceholder(img);
      }
      
    } catch (error) {
      console.error('Error in image fallback handler:', error);
      this.showImagePlaceholder(img);
    }
  }
  
  // Extract image name from URL
  extractImageName(url) {
    try {
      const parts = url.split('/');
      return parts[parts.length - 1];
    } catch (error) {
      return 'unknown.jpg';
    }
  }
  
  // Show placeholder when all fallbacks fail
  showImagePlaceholder(img) {
    const container = img.parentElement;
    
    // Create placeholder element
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = `
      <div class="placeholder-content">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21,15 16,10 5,21"/>
        </svg>
        <p>Image unavailable</p>
      </div>
    `;
    
    // Replace image with placeholder
    if (container) {
      container.appendChild(placeholder);
      img.style.display = 'none';
    }
  }
  
  // Load image with fallback support
  loadImage(img) {
    return new Promise((resolve, reject) => {
      const src = img.dataset.src || img.src;
      
      // Show loading state
      img.style.opacity = '0.5';
      
      const tempImg = new Image();
      
      tempImg.onload = () => {
        img.src = src;
        img.style.opacity = '1';
        img.classList.add('loaded');
        resolve(img);
      };
      
      tempImg.onerror = () => {
        this.handleImageError(img);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      tempImg.src = src;
    });
  }
  
  // Preload critical images
  preloadCriticalImages() {
    const criticalImages = [
      '../assets/favicon.ico',
      '../assets/school/gallery1.jpg',
      '../assets/school/gallery2.jpg',
      '../assets/school/gallery3.jpg'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
  
  // Load all images (fallback for older browsers)
  loadAllImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
  
  // Public method to retry failed images
  retryFailedImages() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    placeholders.forEach(placeholder => {
      const container = placeholder.parentElement;
      const img = container.querySelector('img[style*="display: none"]');
      
      if (img) {
        // Remove placeholder and retry image
        placeholder.remove();
        img.style.display = '';
        this.loadImage(img);
      }
    });
  }
  
  // Check if image exists before loading
  async checkImageExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
  
  // Optimize image loading based on connection
  optimizeForConnection() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Disable lazy loading for slow connections
        this.loadAllImages();
      }
    }
  }
}

// Initialize image fallback manager
document.addEventListener('DOMContentLoaded', () => {
  window.imageFallbackManager = new ImageFallbackManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ImageFallbackManager;
}
