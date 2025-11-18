// Share Button Functionality
class ShareButton {
  constructor() {
    this.modal = null;
    this.shareBtn = null;
    this.init();
  }

  init() {
    try {
      this.createShareModal();
      this.setupShareButton();
      this.setupShareOptions();
    } catch (error) {
      console.error('Error initializing share button:', error);
    }
  }

  createShareModal() {
    // Check if modal already exists
    if (document.getElementById('shareModal')) {
      this.modal = document.getElementById('shareModal');
      return;
    }

    const modalHTML = `
      <div class="share-modal" id="shareModal">
        <div class="share-modal-overlay"></div>
        <div class="share-modal-content">
          <button class="share-modal-close" aria-label="Close share modal">&times;</button>
          
          <h3>Share 2024 Walle Pals</h3>
          <p class="share-description">Share this amazing friend circle with others!</p>
          
          <div class="share-link-container">
            <input 
              type="text" 
              class="share-link-input" 
              id="shareLink" 
              readonly 
              value="${window.location.href}"
              aria-label="Share link"
            >
            <button class="copy-link-btn" id="copyLinkBtn" aria-label="Copy link to clipboard">
              <span>📋</span>
              <span>Copy Link</span>
            </button>
          </div>
          
          <div class="share-options">
            <button class="share-option-btn whatsapp" id="shareWhatsApp" aria-label="Share on WhatsApp">
              <span>💬</span>
              <span>WhatsApp</span>
            </button>
            <button class="share-option-btn facebook" id="shareFacebook" aria-label="Share on Facebook">
              <span>👍</span>
              <span>Facebook</span>
            </button>
            <button class="share-option-btn twitter" id="shareTwitter" aria-label="Share on Twitter">
              <span>𝕏</span>
              <span>Twitter</span>
            </button>
            <button class="share-option-btn email" id="shareEmail" aria-label="Share via Email">
              <span>📧</span>
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('shareModal');
  }

  setupShareButton() {
    // Find or create share button
    this.shareBtn = document.querySelector('.share-btn');
    
    if (!this.shareBtn) {
      // Create share button if it doesn't exist
      const footerActions = document.querySelector('.footer-actions');
      if (footerActions) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'share-btn';
        shareBtn.setAttribute('aria-label', 'Share this page');
        shareBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span>Share</span>
        `;
        footerActions.appendChild(shareBtn);
        this.shareBtn = shareBtn;
      }
    }

    if (this.shareBtn) {
      this.shareBtn.addEventListener('click', () => this.openModal());
    }

    // Setup modal close button
    const closeBtn = this.modal.querySelector('.share-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Close modal when clicking overlay
    const overlay = this.modal.querySelector('.share-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeModal());
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  setupShareOptions() {
    const shareLink = document.getElementById('shareLink').value;
    const shareTitle = '2024 Walle Pals - Friends Forever';
    const shareDescription = 'Check out our amazing friend circle and memories!';

    // Copy Link Button
    const copyBtn = document.getElementById('copyLinkBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copyToClipboard(shareLink, copyBtn));
    }

    // WhatsApp Share
    const whatsappBtn = document.getElementById('shareWhatsApp');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        const text = `${shareTitle}\n${shareDescription}\n${shareLink}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank', 'width=600,height=400');
      });
    }

    // Facebook Share
    const facebookBtn = document.getElementById('shareFacebook');
    if (facebookBtn) {
      facebookBtn.addEventListener('click', () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
      });
    }

    // Twitter Share
    const twitterBtn = document.getElementById('shareTwitter');
    if (twitterBtn) {
      twitterBtn.addEventListener('click', () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareLink)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
      });
    }

    // Email Share
    const emailBtn = document.getElementById('shareEmail');
    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        const subject = encodeURIComponent(shareTitle);
        const body = encodeURIComponent(`${shareDescription}\n\n${shareLink}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
      });
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus on close button for accessibility
      const closeBtn = this.modal.querySelector('.share-modal-close');
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
      }
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // Return focus to share button
      if (this.shareBtn) {
        this.shareBtn.focus();
      }
    }
  }

  copyToClipboard(text, button) {
    // Use modern Clipboard API if available
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showCopyFeedback(button);
      }).catch(() => {
        this.fallbackCopyToClipboard(text, button);
      });
    } else {
      this.fallbackCopyToClipboard(text, button);
    }
  }

  fallbackCopyToClipboard(text, button) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      this.showCopyFeedback(button);
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy link. Please try again.');
    }
    
    document.body.removeChild(textarea);
  }

  showCopyFeedback(button) {
    const originalHTML = button.innerHTML;
    const originalClass = button.className;
    
    // Show success state
    button.innerHTML = '<span>✅</span><span>Copied!</span>';
    button.classList.add('copied');
    
    // Reset after 2 seconds
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.className = originalClass;
    }, 2000);
  }
}

// Initialize share button when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.shareButton = new ShareButton();
});

// Also initialize if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.shareButton = new ShareButton();
  });
} else {
  window.shareButton = new ShareButton();
}
