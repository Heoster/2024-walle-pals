// Social Features for 2024 Walle Pals - Instagram Sharing & Like/View Counting
// Compatible with Netlify free deployment using localStorage and Netlify Functions

class SocialFeaturesManager {
  constructor() {
    this.storageKey = 'wallePals2024_socialData';
    this.viewsKey = 'wallePals2024_views';
    this.likesKey = 'wallePals2024_likes';
    this.socialData = this.loadSocialData();
    this.init();
  }

  init() {
    this.setupInstagramSharing();
    this.setupLikeSystem();
    this.setupViewTracking();
    this.setupSocialButtons();
    this.displaySocialStats();
    }

  // Load social data from localStorage (fallback for Netlify free)
  loadSocialData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {
        likes: {},
        views: {},
        shares: {},
        totalLikes: 0,
        totalViews: 0,
        totalShares: 0
      };
    } catch (error) {
      console.error('Error loading social data:', error);
      return {
        likes: {},
        views: {},
        shares: {},
        totalLikes: 0,
        totalViews: 0,
        totalShares: 0
      };
    }
  }

  // Save social data to localStorage
  saveSocialData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.socialData));
      
      // Also try to sync with Netlify Functions if available
      this.syncWithNetlify();
    } catch (error) {
      console.error('Error saving social data:', error);
    }
  }

  // Sync with Netlify Functions (if available)
  async syncWithNetlify() {
    try {
      const response = await fetch('/.netlify/functions/social-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.socialData)
      });
      
      if (response.ok) {
        const serverData = await response.json();
        this.socialData = { ...this.socialData, ...serverData };
        }
    } catch (error) {
      // Netlify Functions not available, continue with localStorage
      ');
    }
  }

  // Instagram Sharing Setup
  setupInstagramSharing() {
    // Add Instagram share buttons to memory cards and friend pages
    this.addInstagramShareButtons();
  }

  addInstagramShareButtons() {
    // Add to memory cards
    const memoryCards = document.querySelectorAll('.memory-card, .enhanced-memory-card, .gallery-item');
    memoryCards.forEach((card, index) => {
      if (!card.querySelector('.instagram-share-btn')) {
        const shareBtn = this.createInstagramShareButton(card, `memory_${index}`);
        const actionsContainer = card.querySelector('.memory-actions, .gallery-actions');
        if (actionsContainer) {
          actionsContainer.appendChild(shareBtn);
        } else {
          card.appendChild(shareBtn);
        }
      }
    });

    // Add to friend frames
    const friendFrames = document.querySelectorAll('.friend-frame');
    friendFrames.forEach((frame, index) => {
      if (!frame.querySelector('.instagram-share-btn')) {
        const shareBtn = this.createInstagramShareButton(frame, `friend_${index}`);
        frame.appendChild(shareBtn);
      }
    });
  }

  createInstagramShareButton(element, itemId) {
    const shareBtn = document.createElement('button');
    shareBtn.className = 'instagram-share-btn social-btn';
    shareBtn.innerHTML = `
      <svg viewBox="0 0 24 24" class="share-icon">
        <path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
      </svg>
      <span>Share to Instagram</span>
    `;
    
    shareBtn.onclick = (e) => {
      e.stopPropagation();
      this.shareToInstagram(element, itemId);
    };
    
    return shareBtn;
  }

  shareToInstagram(element, itemId) {
    // Get content details
    const title = element.querySelector('.memory-title, .friend-name, h3, h4')?.textContent || 'Check this out!';
    const description = element.querySelector('.memory-description, .friend-description, p')?.textContent || '';
    const image = element.querySelector('img')?.src || '';
    
    // Create shareable content
    const shareText = `${title}\n\n${description}\n\n#WallePals2024 #Memories #Friendship`;
    const websiteUrl = window.location.origin;
    
    // Track share
    this.trackShare(itemId);
    
    // Multiple sharing options
    const shareOptions = [
      {
        name: 'Instagram Stories',
        action: () => this.shareToInstagramStories(shareText, image)
      },
      {
        name: 'Copy Link & Text',
        action: () => this.copyShareContent(shareText, websiteUrl)
      },
      {
        name: 'Download Image',
        action: () => this.downloadImage(image, title)
      }
    ];
    
    this.showShareModal(shareOptions, title);
  }

  shareToInstagramStories(text, imageUrl) {
    // Instagram Stories sharing (mobile only)
    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      navigator.share({
        title: '2024 Walle Pals',
        text: text,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: Copy text and open Instagram
      this.copyToClipboard(text);
      window.open('https://www.instagram.com/', '_blank');
      this.showNotification('Text copied! Paste it in your Instagram post.');
    }
  }

  copyShareContent(text, url) {
    const fullContent = `${text}\n\nVisit: ${url}`;
    this.copyToClipboard(fullContent);
    this.showNotification('Share content copied to clipboard!');
  }

  downloadImage(imageUrl, filename) {
    if (!imageUrl) {
      this.showNotification('No image available to download');
      return;
    }
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${filename.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
    link.click();
    this.showNotification('Image download started!');
  }

  showShareModal(options, title) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
      <div class="share-modal-overlay"></div>
      <div class="share-modal-content">
        <h3>Share "${title}"</h3>
        <div class="share-options">
          ${options.map((option, index) => `
            <button class="share-option-btn" data-index="${index}">
              ${option.name}
            </button>
          `).join('')}
        </div>
        <button class="share-modal-close">Cancel</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    modal.querySelectorAll('.share-option-btn').forEach((btn, index) => {
      btn.onclick = () => {
        options[index].action();
        modal.remove();
      };
    });
    
    modal.querySelector('.share-modal-close').onclick = () => modal.remove();
    modal.querySelector('.share-modal-overlay').onclick = () => modal.remove();
    
    // Show modal
    setTimeout(() => modal.classList.add('active'), 10);
  }

  // Like System Setup
  setupLikeSystem() {
    this.addLikeButtons();
  }

  addLikeButtons() {
    // Add to memory cards
    const memoryCards = document.querySelectorAll('.memory-card, .enhanced-memory-card, .gallery-item');
    memoryCards.forEach((card, index) => {
      if (!card.querySelector('.like-btn-social')) {
        const likeBtn = this.createLikeButton(`memory_${index}`);
        const actionsContainer = card.querySelector('.memory-actions, .gallery-actions');
        if (actionsContainer) {
          actionsContainer.appendChild(likeBtn);
        } else {
          card.appendChild(likeBtn);
        }
      }
    });

    // Add to friend pages
    const friendProfile = document.querySelector('.friend-profile-section, .friend-hero');
    if (friendProfile && !friendProfile.querySelector('.like-btn-social')) {
      const friendName = document.querySelector('.friend-title')?.textContent || 'friend';
      const likeBtn = this.createLikeButton(`friend_${friendName.toLowerCase()}`);
      friendProfile.appendChild(likeBtn);
    }
  }

  createLikeButton(itemId) {
    const likes = this.socialData.likes[itemId] || 0;
    const isLiked = localStorage.getItem(`liked_${itemId}`) === 'true';
    
    const likeBtn = document.createElement('button');
    likeBtn.className = `like-btn-social social-btn ${isLiked ? 'liked' : ''}`;
    likeBtn.innerHTML = `
      <svg viewBox="0 0 24 24" class="like-icon">
        <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
      <span class="like-count">${likes}</span>
    `;
    
    likeBtn.onclick = (e) => {
      e.stopPropagation();
      this.toggleLike(itemId, likeBtn);
    };
    
    return likeBtn;
  }

  toggleLike(itemId, button) {
    const isLiked = localStorage.getItem(`liked_${itemId}`) === 'true';
    const likeCountSpan = button.querySelector('.like-count');
    
    if (isLiked) {
      // Unlike
      this.socialData.likes[itemId] = Math.max(0, (this.socialData.likes[itemId] || 0) - 1);
      this.socialData.totalLikes = Math.max(0, this.socialData.totalLikes - 1);
      localStorage.setItem(`liked_${itemId}`, 'false');
      button.classList.remove('liked');
      this.animateButton(button, 'unlike');
    } else {
      // Like
      this.socialData.likes[itemId] = (this.socialData.likes[itemId] || 0) + 1;
      this.socialData.totalLikes = (this.socialData.totalLikes || 0) + 1;
      localStorage.setItem(`liked_${itemId}`, 'true');
      button.classList.add('liked');
      this.animateButton(button, 'like');
    }
    
    likeCountSpan.textContent = this.socialData.likes[itemId];
    this.saveSocialData();
    this.updateSocialStats();
  }

  animateButton(button, type) {
    button.classList.add(`animate-${type}`);
    setTimeout(() => {
      button.classList.remove(`animate-${type}`);
    }, 600);
    
    // Create floating hearts for likes
    if (type === 'like') {
      this.createFloatingHearts(button);
    }
  }

  createFloatingHearts(button) {
    const rect = button.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart-animation';
      heart.innerHTML = '❤️';
      heart.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width/2}px;
        top: ${rect.top}px;
        pointer-events: none;
        z-index: 1000;
        font-size: 1.2rem;
        animation: floatHeart 2s ease-out forwards;
        animation-delay: ${i * 0.2}s;
      `;
      
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2200);
    }
  }

  // View Tracking Setup
  setupViewTracking() {
    this.trackPageView();
    this.setupIntersectionObserver();
  }

  trackPageView() {
    const pageName = this.getPageName();
    const viewKey = `page_${pageName}`;
    
    // Only count unique views per session
    const sessionKey = `viewed_${viewKey}_${Date.now().toString().slice(0, -5)}`;
    if (!sessionStorage.getItem(sessionKey)) {
      this.socialData.views[viewKey] = (this.socialData.views[viewKey] || 0) + 1;
      this.socialData.totalViews = (this.socialData.totalViews || 0) + 1;
      sessionStorage.setItem(sessionKey, 'true');
      this.saveSocialData();
    }
  }

  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const itemId = element.dataset.itemId || this.generateItemId(element);
          this.trackItemView(itemId);
          observer.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    
    // Observe memory cards and friend frames
    document.querySelectorAll('.memory-card, .enhanced-memory-card, .friend-frame, .gallery-item').forEach((element, index) => {
      element.dataset.itemId = element.dataset.itemId || `item_${index}`;
      observer.observe(element);
    });
  }

  trackItemView(itemId) {
    const sessionKey = `viewed_${itemId}_${Date.now().toString().slice(0, -5)}`;
    if (!sessionStorage.getItem(sessionKey)) {
      this.socialData.views[itemId] = (this.socialData.views[itemId] || 0) + 1;
      this.socialData.totalViews = (this.socialData.totalViews || 0) + 1;
      sessionStorage.setItem(sessionKey, 'true');
      this.saveSocialData();
      this.updateViewCount(itemId);
    }
  }

  trackShare(itemId) {
    this.socialData.shares[itemId] = (this.socialData.shares[itemId] || 0) + 1;
    this.socialData.totalShares = (this.socialData.totalShares || 0) + 1;
    this.saveSocialData();
    this.updateSocialStats();
  }

  updateViewCount(itemId) {
    const viewElements = document.querySelectorAll(`[data-item-id="${itemId}"] .view-count`);
    viewElements.forEach(element => {
      element.textContent = this.socialData.views[itemId] || 0;
    });
  }

  // Social Buttons Setup
  setupSocialButtons() {
    this.addViewCounters();
    this.addSocialStats();
  }

  addViewCounters() {
    document.querySelectorAll('.memory-card, .enhanced-memory-card, .gallery-item').forEach((element, index) => {
      if (!element.querySelector('.view-counter')) {
        const itemId = element.dataset.itemId || `item_${index}`;
        const views = this.socialData.views[itemId] || 0;
        
        const viewCounter = document.createElement('div');
        viewCounter.className = 'view-counter social-stat';
        viewCounter.innerHTML = `
          <svg viewBox="0 0 24 24" class="view-icon">
            <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
          </svg>
          <span class="view-count">${views}</span>
        `;
        
        element.appendChild(viewCounter);
      }
    });
  }

  addSocialStats() {
    // Add global social stats to pages
    const statsContainer = document.querySelector('.memory-statistics, .hero-stats');
    if (statsContainer && !statsContainer.querySelector('.social-stats-global')) {
      const socialStats = document.createElement('div');
      socialStats.className = 'social-stats-global';
      socialStats.innerHTML = `
        <div class="social-stat-item">
          <span class="stat-number" id="totalLikes">${this.socialData.totalLikes || 0}</span>
          <span class="stat-label">Total Likes</span>
        </div>
        <div class="social-stat-item">
          <span class="stat-number" id="totalViews">${this.socialData.totalViews || 0}</span>
          <span class="stat-label">Total Views</span>
        </div>
        <div class="social-stat-item">
          <span class="stat-number" id="totalShares">${this.socialData.totalShares || 0}</span>
          <span class="stat-label">Total Shares</span>
        </div>
      `;
      
      statsContainer.appendChild(socialStats);
    }
  }

  displaySocialStats() {
    this.updateSocialStats();
  }

  updateSocialStats() {
    // Update global stats
    const totalLikesEl = document.getElementById('totalLikes');
    const totalViewsEl = document.getElementById('totalViews');
    const totalSharesEl = document.getElementById('totalShares');
    
    if (totalLikesEl) totalLikesEl.textContent = this.socialData.totalLikes || 0;
    if (totalViewsEl) totalViewsEl.textContent = this.socialData.totalViews || 0;
    if (totalSharesEl) totalSharesEl.textContent = this.socialData.totalShares || 0;
  }

  // Utility Methods
  getPageName() {
    const path = window.location.pathname;
    if (path === '/' || path.includes('index.html')) return 'home';
    if (path.includes('memories.html')) return 'memories';
    if (path.includes('gallery.html')) return 'gallery';
    if (path.includes('friends/')) return 'friend_page';
    if (path.includes('memory-upload.html')) return 'upload';
    return 'other';
  }

  generateItemId(element) {
    const title = element.querySelector('.memory-title, .friend-name, h3, h4')?.textContent;
    if (title) {
      return title.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20);
    }
    return `item_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
  }

  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'social-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4caf50;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Public API for external use
  getLikes(itemId) {
    return this.socialData.likes[itemId] || 0;
  }

  getViews(itemId) {
    return this.socialData.views[itemId] || 0;
  }

  getShares(itemId) {
    return this.socialData.shares[itemId] || 0;
  }

  getTotalStats() {
    return {
      totalLikes: this.socialData.totalLikes || 0,
      totalViews: this.socialData.totalViews || 0,
      totalShares: this.socialData.totalShares || 0
    };
  }
}

// Initialize social features
document.addEventListener('DOMContentLoaded', () => {
  window.socialFeatures = new SocialFeaturesManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SocialFeaturesManager;
}
