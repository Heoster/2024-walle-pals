// Share Website Functionality with Stability Improvements

class WebsiteSharer {
  constructor() {
    this.modal = null;
    this.shareBtn = null;
    this.closeBtn = null;
    this.copyBtn = null;
    this.linkInput = null;
    this.shareOptions = null;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    try {
      // Get elements
      this.modal = document.getElementById('shareModal');
      this.shareBtn = document.getElementById('shareWebsiteBtn');
      this.closeBtn = document.getElementById('closeShareModal');
      this.copyBtn = document.getElementById('copyLinkBtn');
      this.linkInput = document.getElementById('shareLinkInput');
      this.shareOptions = document.querySelectorAll('.share-option-btn');

      // Check if elements exist
      if (!this.modal || !this.shareBtn) {
        console.warn('Share elements not found');
        return;
      }

      // Set the website URL
      this.linkInput.value = window.location.href;

      // Add event listeners
      this.addEventListeners();
    } catch (error) {
      console.error('Error setting up share functionality:', error);
    }
  }

  addEventListeners() {
    // Open modal
    this.shareBtn.addEventListener('click', () => this.openModal());

    // Close modal
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Close on overlay click
    const overlay = this.modal.querySelector('.share-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeModal());
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Copy link
    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => this.copyLink());
    }

    // Share options
    this.shareOptions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const platform = e.currentTarget.dataset.share;
        this.shareOn(platform);
      });
    });
  }

  openModal() {
    try {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Update URL in case it changed
      this.linkInput.value = window.location.href;
    } catch (error) {
      console.error('Error opening share modal:', error);
    }
  }

  closeModal() {
    try {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    } catch (error) {
      console.error('Error closing share modal:', error);
    }
  }

  async copyLink() {
    try {
      const url = this.linkInput.value;
      
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        this.showCopySuccess();
      } else {
        // Fallback for older browsers
        this.linkInput.select();
        this.linkInput.setSelectionRange(0, 99999); // For mobile
        document.execCommand('copy');
        this.showCopySuccess();
      }
    } catch (error) {
      console.error('Error copying link:', error);
      this.showCopyError();
    }
  }

  showCopySuccess() {
    const originalText = this.copyBtn.innerHTML;
    this.copyBtn.classList.add('copied');
    this.copyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied!
    `;

    setTimeout(() => {
      this.copyBtn.classList.remove('copied');
      this.copyBtn.innerHTML = originalText;
    }, 2000);
  }

  showCopyError() {
    const originalText = this.copyBtn.innerHTML;
    this.copyBtn.innerHTML = 'Failed to copy';
    
    setTimeout(() => {
      this.copyBtn.innerHTML = originalText;
    }, 2000);
  }

  shareOn(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('2024 Walle Pals - Our Amazing Friend Circle');
    const text = encodeURIComponent('Check out our 2024 Walle Pals website!');

    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${title}&body=${text}%20${url}`;
        break;
      default:
        console.warn('Unknown share platform:', platform);
        return;
    }

    // Open share URL
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  }
}

// Initialize the sharer
let websiteSharer;
try {
  websiteSharer = new WebsiteSharer();
} catch (error) {
  console.error('Failed to initialize website sharer:', error);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WebsiteSharer;
}
