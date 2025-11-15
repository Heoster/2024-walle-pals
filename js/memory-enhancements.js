// Memory Collection Enhancements for 2024 Walle Pals
// This script adds advanced memory features to make it a perfect memory collection

class MemoryCollectionManager {
  constructor() {
    this.memories = [];
    this.currentFilter = 'all';
    this.currentSort = 'date';
    this.init();
  }

  async init() {
    try {
      await this.loadMemories();
      this.setupMemoryFeatures();
      this.setupMemorySearch();
      this.addMemoryStats();
      } catch (error) {
      console.error('Failed to initialize memory enhancements:', error);
    }
  }

  async loadMemories() {
    // Enhanced memory data structure
    this.memories = [
      {
        id: 'mem_001',
        title: 'Epic Gaming Night',
        date: '2024-03-15',
        category: 'gaming',
        location: "Harsh's Place",
        participants: ['harsh', 'kartik', 'pankaj'],
        media: {
          photos: ['assets/memories/memories1.jpg', 'assets/memories/memories2.jpg'],
          videos: ['assets/video/20250121_131759.mp4']
        },
        description: 'The night we finally beat that impossible level! Epic teamwork and lots of laughs.',
        tags: ['gaming', 'victory', 'teamwork', 'latenight'],
        reactions: { likes: 15, hearts: 8 },
        mood: 'excited'
      },
      {
        id: 'mem_002',
        title: 'Study Session Marathon',
        date: '2024-02-20',
        category: 'study',
        location: 'Library',
        participants: ['vishesh', 'aditya', 'rajat', 'abhishek'],
        media: {
          photos: ['assets/school/gallery1.jpg', 'assets/school/gallery2.jpg']
        },
        description: 'When we studied for 8 hours straight and still had energy to joke around!',
        tags: ['study', 'dedication', 'friendship', 'library'],
        reactions: { likes: 12, hearts: 6 },
        mood: 'focused'
      },
      {
        id: 'mem_003',
        title: 'Birthday Surprise for Nawajish',
        date: '2024-01-10',
        category: 'celebration',
        location: 'School Cafeteria',
        participants: ['nawajish', 'sahil', 'yougank', 'pintu'],
        media: {
          photos: ['assets/memories/memories5.jpg', 'assets/memories/memories6.jpg']
        },
        description: 'The surprise party that made Nawajish cry happy tears!',
        tags: ['birthday', 'surprise', 'celebration', 'happiness'],
        reactions: { likes: 20, hearts: 15 },
        mood: 'joyful'
      }
    ];
  }

  setupMemoryFeatures() {
    this.addMemoryNavigation();
    this.addMemoryFilters();
    this.addMemoryCards();
    this.setupMemoryModal();
  }

  addMemoryNavigation() {
    const memoryNav = document.createElement('div');
    memoryNav.className = 'memory-navigation';
    memoryNav.innerHTML = `
      <div class="memory-nav-container">
        <h3>🎭 Memory Categories</h3>
        <div class="memory-categories">
          <button class="category-btn active" data-category="all">All Memories</button>
          <button class="category-btn" data-category="gaming">🎮 Gaming</button>
          <button class="category-btn" data-category="study">📚 Study</button>
          <button class="category-btn" data-category="celebration">🎉 Celebrations</button>
          <button class="category-btn" data-category="adventure">🏞️ Adventures</button>
          <button class="category-btn" data-category="food">🍕 Food</button>
          <button class="category-btn" data-category="funny">😂 Funny</button>
        </div>
      </div>
    `;

    // Insert after hero section
    const heroSection = document.querySelector('.hero, .memories-hero, .gallery-hero');
    if (heroSection) {
      heroSection.parentNode.insertBefore(memoryNav, heroSection.nextSibling);
    }

    // Add event listeners
    memoryNav.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filterMemories(e.target.dataset.category);
        memoryNav.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  addMemoryFilters() {
    const filterSection = document.createElement('div');
    filterSection.className = 'memory-filters';
    filterSection.innerHTML = `
      <div class="filter-container">
        <div class="filter-group">
          <label>Sort by:</label>
          <select class="sort-select">
            <option value="date">Latest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="likes">Most Liked</option>
            <option value="participants">Most Friends</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Search:</label>
          <input type="text" class="memory-search" placeholder="Search memories...">
        </div>
        <div class="filter-group">
          <button class="random-memory-btn">🎲 Random Memory</button>
        </div>
      </div>
    `;

    const memoryNav = document.querySelector('.memory-navigation');
    if (memoryNav) {
      memoryNav.appendChild(filterSection);
    }

    // Add event listeners
    filterSection.querySelector('.sort-select').addEventListener('change', (e) => {
      this.sortMemories(e.target.value);
    });

    filterSection.querySelector('.memory-search').addEventListener('input', (e) => {
      this.searchMemories(e.target.value);
    });

    filterSection.querySelector('.random-memory-btn').addEventListener('click', () => {
      this.showRandomMemory();
    });
  }

  addMemoryCards() {
    const memoryGrid = document.createElement('div');
    memoryGrid.className = 'enhanced-memory-grid';
    memoryGrid.innerHTML = this.generateMemoryCards();

    // Insert into existing memory section or create new one
    let memorySection = document.querySelector('.memory-gallery, .memories-timeline');
    if (!memorySection) {
      memorySection = document.createElement('section');
      memorySection.className = 'enhanced-memories-section';
      memorySection.innerHTML = `
        <div class="container">
          <h2 class="section-title">Our Memory Collection</h2>
          <p class="section-subtitle">Every moment captured, every smile preserved</p>
        </div>
      `;
      document.querySelector('main').appendChild(memorySection);
    }

    memorySection.querySelector('.container').appendChild(memoryGrid);
  }

  generateMemoryCards() {
    return this.memories.map(memory => `
      <div class="enhanced-memory-card" data-memory-id="${memory.id}" data-category="${memory.category}">
        <div class="memory-card-header">
          <div class="memory-date">${this.formatDate(memory.date)}</div>
          <div class="memory-mood mood-${memory.mood}">${this.getMoodEmoji(memory.mood)}</div>
        </div>
        
        <div class="memory-media">
          ${memory.media.photos ? `
            <img src="${memory.media.photos[0]}" alt="${memory.title}" loading="lazy" 
                 onerror="this.src='assets/school/gallery1.jpg'">
            ${memory.media.photos.length > 1 ? `<div class="media-count">+${memory.media.photos.length - 1}</div>` : ''}
          ` : ''}
        </div>
        
        <div class="memory-content">
          <h3 class="memory-title">${memory.title}</h3>
          <p class="memory-description">${memory.description}</p>
          
          <div class="memory-participants">
            <span class="participants-label">With:</span>
            ${memory.participants.map(p => `<span class="participant-tag">${p}</span>`).join('')}
          </div>
          
          <div class="memory-tags">
            ${memory.tags.map(tag => `<span class="memory-tag">#${tag}</span>`).join('')}
          </div>
          
          <div class="memory-location">
            📍 ${memory.location}
          </div>
        </div>
        
        <div class="memory-actions">
          <button class="memory-action-btn like-btn" data-action="like">
            ❤️ ${memory.reactions.likes}
          </button>
          <button class="memory-action-btn share-btn" data-action="share">
            📤 Share
          </button>
          <button class="memory-action-btn view-btn" data-action="view">
            👁️ View Full
          </button>
        </div>
      </div>
    `).join('');
  }



  addMemoryStats() {
    const stats = this.calculateMemoryStats();
    
    const statsSection = document.createElement('section');
    statsSection.className = 'memory-statistics';
    statsSection.innerHTML = `
      <div class="container">
        <h3>📊 Memory Collection Stats</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">${stats.totalMemories}</div>
            <div class="stat-label">Total Memories</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.totalPhotos}</div>
            <div class="stat-label">Photos Collected</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.totalParticipants}</div>
            <div class="stat-label">Friends Featured</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.totalLikes}</div>
            <div class="stat-label">Total Likes</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.daysSinceFirst}</div>
            <div class="stat-label">Days of Memories</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${stats.mostActiveMonth}</div>
            <div class="stat-label">Most Active Month</div>
          </div>
        </div>
      </div>
    `;

    // Insert before footer
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.parentNode.insertBefore(statsSection, footer);
    }
  }

  calculateMemoryStats() {
    const totalMemories = this.memories.length;
    const totalPhotos = this.memories.reduce((sum, m) => sum + (m.media.photos?.length || 0), 0);
    const allParticipants = new Set();
    this.memories.forEach(m => m.participants.forEach(p => allParticipants.add(p)));
    const totalLikes = this.memories.reduce((sum, m) => sum + m.reactions.likes, 0);
    
    const dates = this.memories.map(m => new Date(m.date));
    const firstDate = new Date(Math.min(...dates));
    const daysSinceFirst = Math.floor((new Date() - firstDate) / (1000 * 60 * 60 * 24));
    
    const monthCounts = {};
    this.memories.forEach(m => {
      const month = new Date(m.date).toLocaleString('default', { month: 'long' });
      monthCounts[month] = (monthCounts[month] || 0) + 1;
    });
    const mostActiveMonth = Object.keys(monthCounts).reduce((a, b) => 
      monthCounts[a] > monthCounts[b] ? a : b
    );

    return {
      totalMemories,
      totalPhotos,
      totalParticipants: allParticipants.size,
      totalLikes,
      daysSinceFirst,
      mostActiveMonth
    };
  }

  setupMemoryModal() {
    const modal = document.createElement('div');
    modal.className = 'memory-modal';
    modal.innerHTML = `
      <div class="memory-modal-overlay"></div>
      <div class="memory-modal-content">
        <button class="memory-modal-close">✕</button>
        <div class="memory-modal-body">
          <!-- Memory details will be inserted here -->
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector('.memory-modal-close').addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.querySelector('.memory-modal-overlay').addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Utility methods
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getMoodEmoji(mood) {
    const moodEmojis = {
      excited: '🤩',
      joyful: '😊',
      focused: '🎯',
      adventurous: '🌟',
      funny: '😂',
      nostalgic: '💭'
    };
    return moodEmojis[mood] || '😊';
  }

  filterMemories(category) {
    const cards = document.querySelectorAll('.enhanced-memory-card');
    cards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  searchMemories(query) {
    const cards = document.querySelectorAll('.enhanced-memory-card');
    cards.forEach(card => {
      const title = card.querySelector('.memory-title').textContent.toLowerCase();
      const description = card.querySelector('.memory-description').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.memory-tag')).map(tag => tag.textContent.toLowerCase());
      
      const matches = title.includes(query.toLowerCase()) || 
                     description.includes(query.toLowerCase()) ||
                     tags.some(tag => tag.includes(query.toLowerCase()));
      
      card.style.display = matches ? 'block' : 'none';
    });
  }

  showRandomMemory() {
    const randomMemory = this.memories[Math.floor(Math.random() * this.memories.length)];
    this.viewMemory(randomMemory.id);
  }

  viewMemory(memoryId) {
    const memory = this.memories.find(m => m.id === memoryId);
    if (!memory) return;

    const modal = document.querySelector('.memory-modal');
    const modalBody = modal.querySelector('.memory-modal-body');
    
    modalBody.innerHTML = `
      <div class="memory-full-view">
        <h2>${memory.title}</h2>
        <div class="memory-full-meta">
          <span>📅 ${this.formatDate(memory.date)}</span>
          <span>📍 ${memory.location}</span>
          <span>${this.getMoodEmoji(memory.mood)} ${memory.mood}</span>
        </div>
        
        <div class="memory-full-media">
          ${memory.media.photos ? memory.media.photos.map(photo => `
            <img src="${photo}" alt="${memory.title}" loading="lazy">
          `).join('') : ''}
        </div>
        
        <p class="memory-full-description">${memory.description}</p>
        
        <div class="memory-full-participants">
          <h4>Friends in this memory:</h4>
          ${memory.participants.map(p => `<span class="participant-chip">${p}</span>`).join('')}
        </div>
        
        <div class="memory-full-tags">
          ${memory.tags.map(tag => `<span class="memory-tag-full">#${tag}</span>`).join('')}
        </div>
      </div>
    `;
    
    modal.classList.add('active');
  }
}

// Initialize memory enhancements
document.addEventListener('DOMContentLoaded', () => {
  window.memoryManager = new MemoryCollectionManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MemoryCollectionManager;
}
