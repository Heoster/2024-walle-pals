// Special Friend Tags System
class SpecialFriendTags {
  constructor() {
    this.tags = {
      harsh: { type: 'hero', label: 'Adventurous Spirit' },
      parduman: { type: 'heart', label: 'Always Helping' },
      kartik: { type: 'creative', label: 'Creative Genius' },
      pankaj: { type: 'energy', label: 'Good Vibes Master' },
      lakshay: { type: 'heart', label: 'Loyal Companion' },
      nawajish: { type: 'energy', label: 'Joy Spreader' },
      vishesh: { type: 'wisdom', label: 'Wise Counselor' },
      sahil: { type: 'energy', label: 'Fun Enthusiast' },
      tushar: { type: 'creative', label: 'Problem Solver' },
      yougank: { type: 'creative', label: 'Full of Surprises' },
      masum: { type: 'heart', label: 'Gentle Soul' },
      shiv: { type: 'hero', label: 'Strength & Kindness' },
      arijit: { type: 'creative', label: 'Music Lover' },
      pintu: { type: 'energy', label: 'Always Positive' },
      ayush: { type: 'energy', label: 'Energetic One' },
      shivaji: { type: 'leader', label: 'Natural Leader' },
      sachin: { type: 'hero', label: 'Sports Enthusiast' },
      varun: { type: 'creative', label: 'Quick Wit' },
      hani: { type: 'heart', label: 'Thoughtful Friend' },
      anshul: { type: 'energy', label: 'Always Encouraging' },
      abhishek: { type: 'hero', label: 'Reliable One' },
      arjun: { type: 'hero', label: 'Focused & Determined' },
      dheraj: { type: 'wisdom', label: 'Peacemaker' },
      rajat: { type: 'creative', label: 'Full of Ideas' },
      aditya: { type: 'wisdom', label: 'Curious Mind' },
      rudra: { type: 'hero', label: 'Bold & Fearless' },
      mudashir: { type: 'creative', label: 'Storyteller' },
      ravi: { type: 'energy', label: 'Light Bringer' },
      aashish: { type: 'energy', label: 'Optimistic Dreamer' },
      rijwaan: { type: 'heart', label: 'Caring Heart' }
    };
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.addTags());
    } else {
      this.addTags();
    }
  }

  addTags() {
    // Add tags to friend pages
    this.addTagToFriendPage();
    
    // Add tags to friend frames in wall
    this.addTagsToFriendFrames();
  }

  addTagToFriendPage() {
    // Get friend name from page data attribute
    const friendPage = document.querySelector('.friend-page');
    if (!friendPage) return;

    const friendName = friendPage.getAttribute('data-friend');
    if (!friendName) return;

    const tagData = this.tags[friendName.toLowerCase()];
    if (!tagData) return;

    // Find profile info section
    const profileInfo = document.querySelector('.profile-info');
    if (!profileInfo) return;

    // Create and insert tag
    const tag = this.createTag(tagData);
    const profileEmoji = profileInfo.querySelector('.profile-emoji');
    if (profileEmoji) {
      profileEmoji.insertAdjacentElement('afterend', tag);
    }
  }

  addTagsToFriendFrames() {
    // Get all friend frames
    const friendFrames = document.querySelectorAll('.friend-frame');
    
    friendFrames.forEach(frame => {
      // Get friend name from frame
      const friendLink = frame.querySelector('a');
      if (!friendLink) return;

      const href = friendLink.getAttribute('href');
      if (!href) return;

      // Extract friend name from href (e.g., "friends/harsh.html" -> "harsh")
      const friendName = href.split('/').pop().replace('.html', '');
      
      const tagData = this.tags[friendName.toLowerCase()];
      if (!tagData) return;

      // Create and insert tag
      const tag = this.createTag(tagData);
      tag.style.position = 'absolute';
      tag.style.top = '10px';
      tag.style.right = '10px';
      tag.style.zIndex = '10';
      
      frame.style.position = 'relative';
      frame.appendChild(tag);
    });
  }

  createTag(tagData) {
    const tag = document.createElement('div');
    tag.className = `special-friend-tag ${tagData.type}`;
    tag.textContent = tagData.label;
    tag.setAttribute('title', `Special: ${tagData.label}`);
    
    // Add hover tooltip
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'scale(1.1)';
    });
    
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'scale(1)';
    });

    return tag;
  }

  // Get tag for a specific friend
  getTag(friendName) {
    return this.tags[friendName.toLowerCase()];
  }

  // Get all tags
  getAllTags() {
    return this.tags;
  }

  // Add custom tag
  addCustomTag(friendName, type, label) {
    this.tags[friendName.toLowerCase()] = { type, label };
  }

  // Remove tag
  removeTag(friendName) {
    delete this.tags[friendName.toLowerCase()];
  }

  // Update tag
  updateTag(friendName, type, label) {
    this.tags[friendName.toLowerCase()] = { type, label };
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.specialFriendTags = new SpecialFriendTags();
  });
} else {
  window.specialFriendTags = new SpecialFriendTags();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SpecialFriendTags;
}
