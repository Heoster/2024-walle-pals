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

    // Available memory images (1-33)
    const memoryImages = Array.from({length: 33}, (_, i) => `../assets/memories/memories${i + 1}.jpg`);
    
    // Available videos
    const videos = [
      '../assets/video/20250121_131759.mp4',
      '../assets/video/20250121_132212.mp4',
      '../assets/video/20250121_132312.mp4',
      '../assets/video/20250121_132346.mp4',
      '../assets/video/20250121_132714.mp4',
      '../assets/video/20250121_132802.mp4',
      '../assets/video/WhatsApp Video 2025-08-15 at 23.07.34_0d6965b2.mp4',
      '../assets/video/WhatsApp Video 2025-08-15 at 23.07.41_b2d920c1.mp4'
    ];

    // Special image counts for friends with dedicated folders
    const specialFriends = {
      nawajish: {
        type: 'folder',
        count: 9,
        path: '../assets/nawajish/nawajish'
      }
    };

    let mediaItems = [];

    // Check if friend has special folder
    if (specialFriends[this.friendSlug]) {
      const special = specialFriends[this.friendSlug];
      for (let i = 1; i <= special.count; i++) {
        mediaItems.push({
          type: 'image',
          src: `${special.path}${i}.jpg`,
          caption: `Memory #${i}`
        });
      }
    } else {
      // Add friend's profile image
      mediaItems.push({
        type: 'image',
        src: `../assets/friends/${this.friendSlug}.jpg`,
        caption: 'Profile Photo'
      });
    }

    // Add 5-8 random memory images for all friends
    const randomImageCount = Math.floor(Math.random() * 4) + 5; // 5-8 images
    const shuffledImages = this.shuffleArray([...memoryImages]);
    
    for (let i = 0; i < randomImageCount && i < shuffledImages.length; i++) {
      mediaItems.push({
        type: 'image',
        src: shuffledImages[i],
        caption: `Shared Memory #${i + 1}`
      });
    }

    // Add 1-2 random videos
    const videoCount = Math.floor(Math.random() * 2) + 1; // 1-2 videos
    const shuffledVideos = this.shuffleArray([...videos]);
    
    for (let i = 0; i < videoCount && i < shuffledVideos.length; i++) {
      mediaItems.push({
        type: 'video',
        src: shuffledVideos[i],
        caption: `Video Memory #${i + 1}`
      });
    }

    // Shuffle all media items
    mediaItems = this.shuffleArray(mediaItems);

    // Render media items
    mediaItems.forEach((item, index) => {
      const mediaElement = document.createElement('div');
      mediaElement.className = 'gallery-item';
      mediaElement.style.animationDelay = `${index * 0.1}s`;
      
      if (item.type === 'image') {
        mediaElement.innerHTML = `
          <img src="${item.src}" alt="${item.caption}" loading="lazy" onerror="this.parentElement.style.display='none'">
          <div class="gallery-overlay">
            <div class="gallery-caption">${item.caption}</div>
          </div>
        `;
      } else if (item.type === 'video') {
        mediaElement.innerHTML = `
          <video controls preload="metadata" onerror="this.parentElement.style.display='none'">
            <source src="${item.src}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="gallery-overlay">
            <div class="gallery-caption">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white" style="margin-bottom: 0.5rem;">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <br>${item.caption}
            </div>
          </div>
        `;
      }
      
      galleryGrid.appendChild(mediaElement);
    });
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
