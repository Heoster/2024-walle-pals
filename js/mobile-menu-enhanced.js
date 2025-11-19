// ENHANCED MOBILE MENU FOR FRIEND PAGES
class EnhancedMobileMenu {
  constructor() {
    this.menuOverlay = document.querySelector('.mobile-menu-overlay');
    this.menuPanel = document.querySelector('.mobile-menu-panel');
    this.floatingBtn = document.querySelector('.floating-menu-btn');
    this.closeBtn = document.querySelector('.mobile-menu-close');
    this.menuItems = document.querySelectorAll('.mobile-menu-item');
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    this.init();
  }

  init() {
    try {
      this.setupEventListeners();
      this.setupTouchGestures();
      this.setupMenuItems();
      this.setupScrollLock();
    } catch (error) {
      console.error('Error initializing enhanced mobile menu:', error);
    }
  }

  setupEventListeners() {
    // Floating button click
    if (this.floatingBtn) {
      this.floatingBtn.addEventListener('click', () => this.toggleMenu());
    }

    // Close button click
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeMenu());
    }

    // Overlay click
    if (this.menuOverlay) {
      this.menuOverlay.addEventListener('click', () => this.closeMenu());
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  setupTouchGestures() {
    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    // Swipe left - close menu
    if (diff > swipeThreshold && this.isOpen) {
      this.closeMenu();
    }

    // Swipe right - open menu
    if (diff < -swipeThreshold && !this.isOpen) {
      this.openMenu();
    }
  }

  setupMenuItems() {
    this.menuItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Don't close if it's an external link
        if (item.target === '_blank') {
          return;
        }

        // Update active state
        this.menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Close menu after selection
        setTimeout(() => this.closeMenu(), 300);
      });
    });
  }

  setupScrollLock() {
    // Prevent body scroll when menu is open
    this.originalOverflow = document.body.style.overflow;
  }

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    
    if (this.menuOverlay) {
      this.menuOverlay.classList.add('active');
    }
    
    if (this.menuPanel) {
      this.menuPanel.classList.add('active');
    }
    
    if (this.floatingBtn) {
      this.floatingBtn.style.transform = 'rotate(45deg)';
    }

    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Announce to screen readers
    this.announceToScreenReader('Navigation menu opened');
  }

  closeMenu() {
    this.isOpen = false;
    
    if (this.menuOverlay) {
      this.menuOverlay.classList.remove('active');
    }
    
    if (this.menuPanel) {
      this.menuPanel.classList.remove('active');
    }
    
    if (this.floatingBtn) {
      this.floatingBtn.style.transform = 'rotate(0deg)';
    }

    // Unlock scroll
    document.body.style.overflow = this.originalOverflow;

    // Announce to screen readers
    this.announceToScreenReader('Navigation menu closed');
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
  }

  // Public method to update active menu item
  setActiveMenuItem(selector) {
    this.menuItems.forEach(item => item.classList.remove('active'));
    const activeItem = document.querySelector(selector);
    if (activeItem) {
      activeItem.classList.add('active');
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new EnhancedMobileMenu();
  });
} else {
  new EnhancedMobileMenu();
}
