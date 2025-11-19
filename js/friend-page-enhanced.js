// Enhanced Friend Page Interactions

class EnhancedFriendPage {
  constructor() {
    this.friendSlug = document.body.dataset.friend;
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupGalleryLightbox();
    this.setupFormValidation();
    this.setupSocialSharing();
    this.setupPageTransitions();
    this.setupAccessibility();
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.gallery-item, .comment-item, .section-title').forEach(el => {
      observer.observe(el);
    });
  }

  setupGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.openLightbox(item, index);
      });

      // Keyboard navigation
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightbox(item, index);
        }
      });
    });
  }

  openLightbox(item, index) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">✕</button>
        <button class="lightbox-prev" aria-label="Previous image">‹</button>
        <div class="lightbox-media">
          ${item.querySelector('img') ? `<img src="${item.querySelector('img').src}" alt="${item.querySelector('img').alt}">` : `<video controls><source src="${item.querySelector('video source').src}"></video>`}
        </div>
        <button class="lightbox-next" aria-label="Next image">›</button>
        <div class="lightbox-counter">${index + 1} / ${document.querySelectorAll('.gallery-item').length}</div>
      </div>
    `;

    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Close handlers
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      lightbox.remove();
      document.body.style.overflow = '';
    });

    lightbox.querySelector('.lightbox-overlay').addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.remove();
        document.body.style.overflow = '';
      }
    });

    // Keyboard close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.parentElement) {
        lightbox.remove();
        document.body.style.overflow = '';
      }
    });
  }

  setupFormValidation() {
    const form = document.getElementById('commentForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('commentName').value.trim();
      const email = document.getElementById('commentEmail').value.trim();
      const message = document.getElementById('commentMessage').value.trim();

      // Validation
      if (!name) {
        this.showError('Please enter your name');
        return;
      }

      if (name.length < 2) {
        this.showError('Name must be at least 2 characters');
        return;
      }

      if (message.length < 10) {
        this.showError('Message must be at least 10 characters');
        return;
      }

      if (email && !this.isValidEmail(email)) {
        this.showError('Please enter a valid email');
        return;
      }

      // Submit
      this.submitComment(name, email, message);
    });
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  submitComment(name, email, message) {
    const comment = {
      id: Date.now(),
      friend: this.friendSlug,
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    const comments = JSON.parse(localStorage.getItem('friendComments') || '[]');
    comments.push(comment);
    localStorage.setItem('friendComments', JSON.stringify(comments));

    this.showSuccess('Comment posted successfully!');
    document.getElementById('commentForm').reset();
    this.loadComments();
  }

  loadComments() {
    const comments = JSON.parse(localStorage.getItem('friendComments') || '[]');
    const friendComments = comments.filter(c => c.friend === this.friendSlug);
    const commentsList = document.getElementById('commentsList');

    if (friendComments.length === 0) {
      commentsList.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5);">No comments yet. Be the first!</p>';
      return;
    }

    commentsList.innerHTML = friendComments.map(c => `
      <div class="comment-item">
        <div class="comment-header">
          <div class="comment-avatar">${c.name.charAt(0).toUpperCase()}</div>
          <div>
            <div class="comment-author">${this.escapeHtml(c.name)}</div>
            <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5);">${new Date(c.timestamp).toLocaleDateString()}</div>
          </div>
        </div>
        <div class="comment-text">${this.escapeHtml(c.message)}</div>
      </div>
    `).join('');
  }

  setupSocialSharing() {
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const friendName = document.querySelector('.profile-name')?.textContent || 'Friend';
        const url = window.location.href;
        const text = `Check out ${friendName} on 2024 Walle Pals!`;

        if (navigator.share) {
          navigator.share({
            title: friendName,
            text: text,
            url: url
          });
        }
      });
    }
  }

  setupPageTransitions() {
    // Smooth page transitions
    document.querySelectorAll('a').forEach(link => {
      if (link.href && !link.href.includes('#') && link.target !== '_blank') {
        link.addEventListener('click', (e) => {
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            document.body.style.opacity = '0';
            setTimeout(() => {
              window.location.href = link.href;
            }, 300);
          }
        });
      }
    });

    // Fade in on load
    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
    });
  }

  setupAccessibility() {
    // Add keyboard navigation for gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      item.setAttribute('aria-label', `Gallery item ${index + 1}`);
    });

    // Add ARIA labels to form
    const form = document.getElementById('commentForm');
    if (form) {
      form.setAttribute('aria-label', 'Comment form');
    }
  }

  showError(message) {
    this.showNotification(message, 'error');
  }

  showSuccess(message) {
    this.showNotification(message, 'success');
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      background: ${type === 'error' ? '#ef4444' : '#10b981'};
      color: white;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize enhanced friend page
document.addEventListener('DOMContentLoaded', () => {
  new EnhancedFriendPage();
});
