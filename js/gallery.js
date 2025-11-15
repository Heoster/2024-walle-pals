// Gallery JavaScript functionality
class GalleryManager {
  constructor() {
    this.currentTab = 'public';
    this.currentFilter = 'all';
    this.isPrivateUnlocked = false;
    this.currentLightboxIndex = 0;
    this.currentGalleryType = 'public';

    // Password for private gallery (2024pals)
    this.privatePassword = '2024pals';

    // Gallery data
    this.publicGallery = [
      {
        type: 'photo',
        title: 'School Memory 1',
        description: 'Precious moment 1 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery1.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 2',
        description: 'Precious moment 2 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery2.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 3',
        description: 'Precious moment 3 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery3.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 4',
        description: 'Precious moment 4 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery4.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 5',
        description: 'Precious moment 5 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery5.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 6',
        description: 'Precious moment 6 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery6.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 7',
        description: 'Precious moment 7 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery7.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 8',
        description: 'Precious moment 8 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery8.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 9',
        description: 'Precious moment 9 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery9.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 10',
        description: 'Precious moment 10 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery10.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 11',
        description: 'Precious moment 11 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery11.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 12',
        description: 'Precious moment 12 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery12.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 13',
        description: 'Precious moment 13 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery13.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 14',
        description: 'Precious moment 14 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery14.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 15',
        description: 'Precious moment 15 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery15.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 16',
        description: 'Precious moment 16 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery16.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 17',
        description: 'Precious moment 17 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery17.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 18',
        description: 'Precious moment 18 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery18.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 19',
        description: 'Precious moment 19 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery19.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 20',
        description: 'Precious moment 20 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery20.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 21',
        description: 'Precious moment 21 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery21.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 22',
        description: 'Precious moment 22 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery22.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 23',
        description: 'Precious moment 23 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery23.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 24',
        description: 'Precious moment 24 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery24.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 25',
        description: 'Precious moment 25 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery25.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 26',
        description: 'Precious moment 26 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery26.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 27',
        description: 'Precious moment 27 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery27.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 28',
        description: 'Precious moment 28 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery28.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 29',
        description: 'Precious moment 29 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery29.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 30',
        description: 'Precious moment 30 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery30.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 31',
        description: 'Precious moment 31 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery31.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 32',
        description: 'Precious moment 32 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery32.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 33',
        description: 'Precious moment 33 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery33.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 34',
        description: 'Precious moment 34 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery34.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 35',
        description: 'Precious moment 35 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery35.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 36',
        description: 'Precious moment 36 from our school days',
        category: ["photos", "fun"],
        src: 'assets/school/gallery36.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 37',
        description: 'Precious moment 37 from our school days',
        category: ["photos", "events"],
        src: 'assets/school/gallery37.jpg'
      }
    ];

    this.privateGallery = [
      {
        type: 'photo',
        title: 'School Memory 21',
        description: 'Precious moment 21 from our school days',
        category: ["photos", "personal"],
        src: 'assets/school/gallery21.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 22',
        description: 'Precious moment 22 from our school days',
        category: ["photos", "personal"],
        src: 'assets/school/gallery22.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 23',
        description: 'Precious moment 23 from our school days',
        category: ["photos", "personal"],
        src: 'assets/school/gallery23.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 24',
        description: 'Precious moment 24 from our school days',
        category: ["photos", "personal"],
        src: 'assets/school/gallery24.jpg'
      },
      {
        type: 'photo',
        title: 'School Memory 25',
        description: 'Precious moment 25 from our school days',
        category: ["photos", "personal"],
        src: 'assets/school/gallery25.jpg'
      },
      {
        type: 'video',
        title: 'Memory Video 1',
        description: 'Special video memory 1',
        category: ["videos", "exclusive"],
        src: 'assets/video/20250121_131759.mp4',
        poster: 'assets/school/gallery14.jpg'
      },
      {
        type: 'video',
        title: 'Memory Video 2',
        description: 'Special video memory 2',
        category: ["videos", "exclusive"],
        src: 'assets/video/20250121_132212.mp4',
        poster: 'assets/school/gallery15.jpg'
      },
      {
        type: 'video',
        title: 'Memory Video 3',
        description: 'Special video memory 3',
        category: ["videos", "exclusive"],
        src: 'assets/video/20250121_132312.mp4',
        poster: 'assets/school/gallery16.jpg'
      }
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollAnimations();
    this.initializeFilters();
    }

  setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.gallery-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabType = e.currentTarget.dataset.tab;
        this.switchTab(tabType);
      });
    });

    // Filter buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        const filter = e.target.dataset.filter;
        this.applyFilter(filter, e.target);
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeLightbox();
      }
      if (document.getElementById('lightbox').classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
          this.previousMedia();
        }
        if (e.key === 'ArrowRight') {
          this.nextMedia();
        }
      }
    });

    // Password form
    const passwordForm = document.querySelector('.password-form');
    if (passwordForm) {
      passwordForm.addEventListener('submit', (e) => {
        this.checkPassword(e);
      });
    }
  }

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

    // Observe gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
      observer.observe(item);
    });
  }

  switchTab(tabType) {
    // Update tab buttons
    document.querySelectorAll('.gallery-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabType}"]`).classList.add('active');

    // Update sections
    document.querySelectorAll('.gallery-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(`${tabType}-gallery`).classList.add('active');

    this.currentTab = tabType;

    // Reset filters
    this.resetFilters();

    // Add transition animation
    const activeSection = document.getElementById(`${tabType}-gallery`);
    activeSection.style.opacity = '0';
    activeSection.style.transform = 'translateY(20px)';

    setTimeout(() => {
      activeSection.style.transition = 'all 0.5s ease';
      activeSection.style.opacity = '1';
      activeSection.style.transform = 'translateY(0)';
    }, 50);
  }

  initializeFilters() {
    // Set up initial filter state
    this.resetFilters();
  }

  resetFilters() {
    const activeSection = document.querySelector('.gallery-section.active');
    if (activeSection) {
      const filterBtns = activeSection.querySelectorAll('.filter-btn');
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === 'all') {
          btn.classList.add('active');
        }
      });
    }
    this.applyFilter('all');
  }

  applyFilter(filter, buttonElement = null) {
    this.currentFilter = filter;

    // Update button states
    if (buttonElement) {
      const parentSection = buttonElement.closest('.gallery-section');
      parentSection.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      buttonElement.classList.add('active');
    }

    // Filter gallery items
    const activeSection = document.querySelector('.gallery-section.active');
    const galleryItems = activeSection.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
      const categories = item.dataset.category ? item.dataset.category.split(' ') : [];
      const shouldShow = filter === 'all' || categories.includes(filter);

      if (shouldShow) {
        item.style.display = 'block';
        item.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
      } else {
        item.style.display = 'none';
      }
    });
  }

  checkPassword(event) {
    event.preventDefault();

    const passwordInput = document.getElementById('gallery-password');
    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === this.privatePassword) {
      this.unlockPrivateGallery();
    } else {
      this.showPasswordError();
    }
  }

  unlockPrivateGallery() {
    this.isPrivateUnlocked = true;

    const passwordScreen = document.getElementById('password-screen');
    const privateContent = document.getElementById('private-content');

    // Animate unlock
    passwordScreen.style.transition = 'all 0.5s ease';
    passwordScreen.style.opacity = '0';
    passwordScreen.style.transform = 'scale(0.9)';

    setTimeout(() => {
      passwordScreen.style.display = 'none';
      privateContent.style.display = 'block';
      privateContent.style.opacity = '0';
      privateContent.style.transform = 'translateY(20px)';

      setTimeout(() => {
        privateContent.style.transition = 'all 0.5s ease';
        privateContent.style.opacity = '1';
        privateContent.style.transform = 'translateY(0)';
      }, 50);
    }, 500);

    // Show success message
    this.showNotification('🔓 Private gallery unlocked!', 'success');
  }

  showPasswordError() {
    const passwordInput = document.getElementById('gallery-password');

    // Shake animation
    passwordInput.style.animation = 'shake 0.5s ease-in-out';
    passwordInput.style.borderColor = '#ff4757';

    setTimeout(() => {
      passwordInput.style.animation = '';
      passwordInput.style.borderColor = '';
      passwordInput.value = '';
    }, 500);

    this.showNotification('❌ Incorrect password. Try again!', 'error');
  }

  logout() {
    this.isPrivateUnlocked = false;

    const passwordScreen = document.getElementById('password-screen');
    const privateContent = document.getElementById('private-content');

    // Animate lock
    privateContent.style.transition = 'all 0.5s ease';
    privateContent.style.opacity = '0';
    privateContent.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      privateContent.style.display = 'none';
      passwordScreen.style.display = 'flex';
      passwordScreen.style.opacity = '0';
      passwordScreen.style.transform = 'scale(1.1)';

      setTimeout(() => {
        passwordScreen.style.transition = 'all 0.5s ease';
        passwordScreen.style.opacity = '1';
        passwordScreen.style.transform = 'scale(1)';
      }, 50);
    }, 500);

    // Clear password field
    document.getElementById('gallery-password').value = '';

    this.showNotification('🔒 Private gallery locked', 'info');
  }

  openLightbox(galleryType, index) {
    this.currentGalleryType = galleryType;
    this.currentLightboxIndex = index;

    const gallery = galleryType === 'public' ? this.publicGallery : this.privateGallery;
    const item = gallery[index];

    if (!item) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxMedia = document.getElementById('lightbox-media');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    // Set content
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;

    // Create media content
    if (item.type === 'video') {
      lightboxMedia.innerHTML = `
        <video controls style="width: 100%; height: 100%; object-fit: contain;" ${item.poster ? `poster="${item.poster}"` : ''}>
          <source src="${item.src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    } else {
      lightboxMedia.innerHTML = `
        <img src="${item.src}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: contain;">
      `;
    }

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  previousMedia() {
    const gallery = this.currentGalleryType === 'public' ? this.publicGallery : this.privateGallery;
    this.currentLightboxIndex = (this.currentLightboxIndex - 1 + gallery.length) % gallery.length;
    this.openLightbox(this.currentGalleryType, this.currentLightboxIndex);
  }

  nextMedia() {
    const gallery = this.currentGalleryType === 'public' ? this.publicGallery : this.privateGallery;
    this.currentLightboxIndex = (this.currentLightboxIndex + 1) % gallery.length;
    this.openLightbox(this.currentGalleryType, this.currentLightboxIndex);
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#2ed573' : type === 'error' ? '#ff4757' : '#4facfe'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      z-index: 3000;
      animation: slideInRight 0.3s ease-out;
      font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}

// Global functions for HTML onclick handlers
function checkPassword(event) {
  window.galleryManager.checkPassword(event);
}

function logout() {
  window.galleryManager.logout();
}

function openLightbox(galleryType, index) {
  window.galleryManager.openLightbox(galleryType, index);
}

function closeLightbox() {
  window.galleryManager.closeLightbox();
}

function previousMedia() {
  window.galleryManager.previousMedia();
}

function nextMedia() {
  window.galleryManager.nextMedia();
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;
document.head.appendChild(notificationStyles);

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.galleryManager = new GalleryManager();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GalleryManager;
}
