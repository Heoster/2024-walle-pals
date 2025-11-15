// FRIEND PAGE FUNCTIONALITY
class FriendPage {
  constructor() {
    this.friendSlug = document.body.dataset.friend;
    this.init();
  }

  init() {
    this.loadGallery();
    this.setupCommentForm();
    this.loadComments();
    this.hideLoader();
  }

  hideLoader() {
    setTimeout(() => {
      const loader = document.getElementById('pageLoader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }
    }, 1000);
  }

  loadGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    // Image counts per friend
    const imageCounts = {
      nawajish: 9, // Nawajish has most images
      harsh: 1,
      kartik: 1,
      lakshay: 1,
      mudashir: 1,
      pankaj: 1,
      sahil: 1,
      vishesh: 1,
      arjun: 1
    };

    const count = imageCounts[this.friendSlug] || 0;
    
    if (count === 0) {
      galleryGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: rgba(255,255,255,0.5);">
          <p style="font-size: 1.2rem;">📸 More photos coming soon!</p>
        </div>
      `;
      return;
    }

    // Load images
    for (let i = 1; i <= count; i++) {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.style.animationDelay = `${i * 0.1}s`;
      
      const imgPath = this.friendSlug === 'nawajish' 
        ? `../assets/nawajish/nawajish${i}.jpg`
        : `../assets/friends/${this.friendSlug}.jpg`;
      
      item.innerHTML = `
        <img src="${imgPath}" alt="Memory ${i}" loading="lazy" onerror="this.parentElement.style.display='none'">
        <div class="gallery-overlay">
          <div class="gallery-caption">Memory #${i}</div>
        </div>
      `;
      
      galleryGrid.appendChild(item);
    }
  }

  setupCommentForm() {
    const form = document.getElementById('commentForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('commentName').value.trim();
      const email = document.getElementById('commentEmail').value.trim();
      const message = document.getElementById('commentMessage').value.trim();

      if (!name || !message) {
        this.showToast('Please fill in all required fields', 'error');
        return;
      }

      // Store comment in localStorage
      const comment = {
        id: Date.now(),
        friend: this.friendSlug,
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      };

      const comments = this.getComments();
      comments.push(comment);
      localStorage.setItem('friendComments', JSON.stringify(comments));

      // Send email notification (if Netlify function exists)
      this.sendEmailNotification(comment);

      // Clear form
      form.reset();

      // Show success message
      this.showToast('Message sent successfully! 🎉', 'success');

      // Reload comments
      this.loadComments();
    });
  }

  async sendEmailNotification(comment) {
    try {
      // Try to send via Netlify function if available
      const response = await fetch('/.netlify/functions/send-comment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
      });
      
      if (response.ok) {
        console.log('Email notification sent');
      }
    } catch (error) {
      // Silently fail if function doesn't exist
      console.log('Email function not available');
    }
  }

  getComments() {
    const stored = localStorage.getItem('friendComments');
    return stored ? JSON.parse(stored) : [];
  }

  loadComments() {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;

    const allComments = this.getComments();
    const friendComments = allComments
      .filter(c => c.friend === this.friendSlug)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (friendComments.length === 0) {
      commentsList.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: rgba(255,255,255,0.5);">
          <p style="font-size: 1.2rem;">💬 Be the first to leave a message!</p>
        </div>
      `;
      return;
    }

    commentsList.innerHTML = friendComments.map(comment => {
      const initial = comment.name.charAt(0).toUpperCase();
      const date = new Date(comment.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      return `
        <div class="comment-item">
          <div class="comment-header">
            <div class="comment-avatar">${initial}</div>
            <div>
              <div class="comment-author">${this.escapeHtml(comment.name)}</div>
              <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5);">${date}</div>
            </div>
          </div>
          <div class="comment-text">${this.escapeHtml(comment.message)}</div>
        </div>
      `;
    }).join('');
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new FriendPage();
});
