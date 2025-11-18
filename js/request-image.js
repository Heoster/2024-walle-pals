// Request Image Modal System
class RequestImageModal {
  constructor() {
    this.modal = null;
    this.button = null;
    this.friendName = null;
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
    // Get friend name from page
    const friendPage = document.querySelector('.friend-page');
    if (!friendPage) return;

    this.friendName = friendPage.getAttribute('data-friend');
    if (!this.friendName) return;

    // Create modal
    this.createModal();
    
    // Setup button
    this.setupButton();
  }

  createModal() {
    // Check if modal already exists
    if (document.getElementById('requestImageModal')) {
      this.modal = document.getElementById('requestImageModal');
      return;
    }

    const modalHTML = `
      <div class="request-image-modal" id="requestImageModal">
        <div class="request-image-overlay"></div>
        <div class="request-image-content">
          <button class="request-image-close" aria-label="Close request image modal">&times;</button>
          
          <h3>📸 Request Profile Image</h3>
          <p class="request-image-description">
            Help us complete ${this.friendName}'s profile by sharing their photo!
          </p>
          
          <div class="request-image-info">
            <strong>Why?</strong> Profile images make the friend pages more personal and special. 
            If you have a great photo of ${this.friendName}, we'd love to add it!
          </div>
          
          <div class="request-image-methods">
            <div class="request-method">
              <div class="request-method-icon">📧</div>
              <div class="request-method-content">
                <h4>Email</h4>
                <p>Send the image to <a href="mailto:codeex.care@gmail.com" class="request-method-link">codeex.care@gmail.com</a></p>
              </div>
            </div>
            
            <div class="request-method">
              <div class="request-method-icon">💬</div>
              <div class="request-method-content">
                <h4>WhatsApp</h4>
                <p>Share directly via WhatsApp to Heoster</p>
              </div>
            </div>
            
            <div class="request-method">
              <div class="request-method-icon">📱</div>
              <div class="request-method-content">
                <h4>Instagram DM</h4>
                <p>Send a message on Instagram to <a href="https://instagram.com/codeex._.heoster" target="_blank" class="request-method-link">@codeex._.heoster</a></p>
              </div>
            </div>
          </div>
          
          <div class="request-image-buttons">
            <button class="request-btn primary" id="emailBtn">
              <span>📧 Send Email</span>
            </button>
            <button class="request-btn secondary" id="closeBtn">
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('requestImageModal');
    
    // Setup event listeners
    this.setupModalEvents();
  }

  setupButton() {
    // Find or create request image button
    this.button = document.querySelector('.request-image-btn');
    
    if (!this.button) {
      // Create button if it doesn't exist
      const profileInfo = document.querySelector('.profile-info');
      if (profileInfo) {
        const btn = document.createElement('button');
        btn.className = 'request-image-btn';
        btn.setAttribute('aria-label', 'Request profile image');
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <span>Request Image</span>
        `;
        profileInfo.appendChild(btn);
        this.button = btn;
      }
    }

    if (this.button) {
      this.button.addEventListener('click', () => this.openModal());
    }
  }

  setupModalEvents() {
    // Close button
    const closeBtn = this.modal.querySelector('.request-image-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // Close button in footer
    const closeBtnFooter = this.modal.querySelector('#closeBtn');
    if (closeBtnFooter) {
      closeBtnFooter.addEventListener('click', () => this.closeModal());
    }

    // Email button
    const emailBtn = this.modal.querySelector('#emailBtn');
    if (emailBtn) {
      emailBtn.addEventListener('click', () => this.sendEmail());
    }

    // Close modal when clicking overlay
    const overlay = this.modal.querySelector('.request-image-overlay');
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

  openModal() {
    if (this.modal) {
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Focus on close button for accessibility
      const closeBtn = this.modal.querySelector('.request-image-close');
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 100);
      }
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
      
      // Return focus to button
      if (this.button) {
        this.button.focus();
      }
    }
  }

  sendEmail() {
    const subject = encodeURIComponent(`Image Request for ${this.friendName} - 2024 Walle Pals`);
    const body = encodeURIComponent(
      `Hi Heoster,\n\n` +
      `I'd like to contribute a profile image for ${this.friendName} on the 2024 Walle Pals website.\n\n` +
      `Please let me know if you need any additional information.\n\n` +
      `Thanks!`
    );
    
    window.location.href = `mailto:codeex.care@gmail.com?subject=${subject}&body=${body}`;
    
    // Close modal after a short delay
    setTimeout(() => this.closeModal(), 500);
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.requestImageModal = new RequestImageModal();
  });
} else {
  window.requestImageModal = new RequestImageModal();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RequestImageModal;
}
