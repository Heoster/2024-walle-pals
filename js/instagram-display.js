// Instagram Display System for 2024 Walle Pals
// This script adds Instagram IDs to friend frames and pages

class InstagramDisplayManager {
  constructor() {
    this.friendsData = null;
    this.init();
  }

  async init() {
    try {
      await this.loadFriendsData();
      this.addInstagramToFrames();
      this.addInstagramToPages();
      } catch (error) {
      console.error('Failed to initialize Instagram display:', error);
    }
  }

  async loadFriendsData() {
    try {
      const response = await fetch('/data/friends.json');
      this.friendsData = await response.json();
    } catch (error) {
      console.error('Failed to load friends data:', error);
      // Fallback data if JSON fails to load
      this.friendsData = this.getFallbackData();
    }
  }

  getFallbackData() {
    return [
      { name: 'Harsh', instagram: 'codeex._.heoster' },
      { name: 'Parduman', instagram: 'kittu_pandat001' },
      { name: 'Kartik', instagram: 'kartik_bharadwaj72' },
      { name: 'Pankaj', instagram: '__pankajthakur2' },
      { name: 'Lakshay', instagram: '1_numbri_' },
      { name: 'Nawajish', instagram: 'official_nawajish_295' },
      { name: 'Vishesh', instagram: 'vishesh_soam_07' },
      { name: 'Sahil', instagram: 'imkhansahil' },
      { name: 'Tushar', instagram: 'rjput_tushar.0007' },
      { name: 'Yougank', instagram: 'kaju_rana_0001' },
      { name: 'Masum', instagram: 'masummalik30' },
      { name: 'Shiv', instagram: 'rajputana_shiv_' },
      { name: 'Arijit', instagram: '' },
      { name: 'Pintu', instagram: 'rajput._.boy_0001' },
      { name: 'Ayush', instagram: 'thakur_ayush_soam' },
      { name: 'Shivaji', instagram: 'shiva_ji_00' },
      { name: 'Sachin', instagram: 'its_saini0002' },
      { name: 'Varun', instagram: 'varunrajput6290' },
      { name: 'Hani', instagram: 'its_honey_kashyap_ak47' },
      { name: 'Anshul', instagram: 'anshulgujjar8776' },
      { name: 'Abhishek', instagram: 'itx__abhishek_302' },
      { name: 'Arjun', instagram: 'arjundhaka479' },
      { name: 'Dheraj', instagram: 'dheeraj_som__2110' },
      { name: 'Rajat', instagram: 'rajatchoudhary3496' },
      { name: 'Aditya', instagram: '' },
      { name: 'Rudra', instagram: '' },
      { name: 'Mudashir', instagram: 'the.shaaan_' },
      { name: 'Ravi', instagram: '' },
      { name: 'Aashish', instagram: 'ashish__jayant' },
      { name: 'Rijwaan', instagram: 'riwan.chaudhary' }
    ];
  }

  addInstagramToFrames() {
    const friendFrames = document.querySelectorAll('.friend-frame');
    
    friendFrames.forEach((frame, index) => {
      try {
        const friendData = this.friendsData[index];
        if (friendData && friendData.instagram) {
          this.addInstagramBadge(frame, friendData);
        }
      } catch (error) {
        console.error(`Error adding Instagram to frame ${index}:`, error);
      }
    });
  }

  addInstagramBadge(frame, friendData) {
    // Check if Instagram badge already exists
    if (frame.querySelector('.instagram-badge')) {
      return;
    }

    const instagramBadge = document.createElement('div');
    instagramBadge.className = 'instagram-badge';
    instagramBadge.innerHTML = `
      <a href="${friendData.instagramUrl || `https://instagram.com/${friendData.instagram}`}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="instagram-link"
         onclick="event.stopPropagation();"
         title="Follow ${friendData.name} on Instagram">
        <svg viewBox="0 0 24 24" class="instagram-icon">
          <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <span class="instagram-handle">@${friendData.instagram}</span>
      </a>
    `;

    // Add to friend frame
    frame.appendChild(instagramBadge);
  }

  addInstagramToPages() {
    // Add Instagram section to individual friend pages
    const friendTitle = document.querySelector('.friend-title');
    if (friendTitle) {
      const friendName = friendTitle.textContent.trim();
      const friendData = this.friendsData.find(f => f.name === friendName);
      
      if (friendData && friendData.instagram) {
        this.addInstagramSection(friendData);
      }
    }
  }

  addInstagramSection(friendData) {
    // Check if Instagram section already exists
    if (document.querySelector('.instagram-section')) {
      return;
    }

    const instagramSection = document.createElement('section');
    instagramSection.className = 'instagram-section';
    instagramSection.innerHTML = `
      <div class="container">
        <h3>Connect with ${friendData.name}</h3>
        <p>Follow on Instagram for amazing moments and updates</p>
        <a href="${friendData.instagramUrl || `https://instagram.com/${friendData.instagram}`}" 
           target="_blank" 
           rel="noopener noreferrer"
           class="instagram-button">
          <svg viewBox="0 0 16 16" class="bi bi-instagram" fill="currentColor" height="20" width="20">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg>
          <span>@${friendData.instagram}</span>
        </a>
      </div>
    `;

    // Insert before footer
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.parentNode.insertBefore(instagramSection, footer);
    } else {
      document.body.appendChild(instagramSection);
    }
  }

  // Method to update Instagram visibility on homepage
  updateHomepageDisplay() {
    const wallContainer = document.querySelector('.wall-of-frames');
    if (wallContainer) {
      // Add Instagram visibility toggle
      const toggleButton = document.createElement('button');
      toggleButton.className = 'instagram-toggle-btn';
      toggleButton.innerHTML = '📸 Show Instagram IDs';
      toggleButton.onclick = () => this.toggleInstagramVisibility();
      
      const wallSection = document.querySelector('.wall-section .container');
      if (wallSection) {
        wallSection.insertBefore(toggleButton, wallContainer);
      }
    }
  }

  toggleInstagramVisibility() {
    const instagramBadges = document.querySelectorAll('.instagram-badge');
    const toggleBtn = document.querySelector('.instagram-toggle-btn');
    
    instagramBadges.forEach(badge => {
      badge.classList.toggle('visible');
    });
    
    if (toggleBtn) {
      const isVisible = document.querySelector('.instagram-badge.visible');
      toggleBtn.innerHTML = isVisible ? '📸 Hide Instagram IDs' : '📸 Show Instagram IDs';
    }
  }
}

// Initialize Instagram display when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.instagramDisplayManager = new InstagramDisplayManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InstagramDisplayManager;
}
