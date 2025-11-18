// Love Story Music and Interactions
class LoveStoryPlayer {
  constructor() {
    this.audio = document.getElementById('storyMusic');
    this.musicToggle = document.getElementById('musicToggle');
    this.isPlaying = false;
    this.init();
  }

  init() {
    if (!this.audio || !this.musicToggle) return;

    // Setup music toggle
    this.musicToggle.addEventListener('click', () => this.toggleMusic());

    // Update button state when audio plays/pauses
    this.audio.addEventListener('play', () => this.onMusicPlay());
    this.audio.addEventListener('pause', () => this.onMusicPause());
    this.audio.addEventListener('ended', () => this.onMusicEnd());

    // Handle errors
    this.audio.addEventListener('error', () => this.handleAudioError());

    // Add keyboard shortcut (Space to play/pause)
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        this.toggleMusic();
      }
    });

    // Restore music state from localStorage
    this.restoreMusicState();
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  playMusic() {
    try {
      // Create promise for play
      const playPromise = this.audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.updateButtonState();
            localStorage.setItem('storyMusicPlaying', 'true');
          })
          .catch((error) => {
            console.warn('Audio playback failed:', error);
            this.handleAudioError();
          });
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      this.handleAudioError();
    }
  }

  pauseMusic() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateButtonState();
    localStorage.setItem('storyMusicPlaying', 'false');
  }

  onMusicPlay() {
    this.isPlaying = true;
    this.updateButtonState();
  }

  onMusicPause() {
    this.isPlaying = false;
    this.updateButtonState();
  }

  onMusicEnd() {
    this.isPlaying = false;
    this.updateButtonState();
    // Optionally loop the music
    // this.audio.currentTime = 0;
    // this.playMusic();
  }

  updateButtonState() {
    if (this.isPlaying) {
      this.musicToggle.classList.add('playing');
      this.musicToggle.innerHTML = `
        <span class="music-icon">🎵</span>
        <span class="music-text">Pause Story Music</span>
      `;
    } else {
      this.musicToggle.classList.remove('playing');
      this.musicToggle.innerHTML = `
        <span class="music-icon">🎵</span>
        <span class="music-text">Play Story Music</span>
      `;
    }
  }

  handleAudioError() {
    console.error('Audio error occurred');
    this.musicToggle.innerHTML = `
      <span class="music-icon">🔇</span>
      <span class="music-text">Music Unavailable</span>
    `;
    this.musicToggle.disabled = true;
  }

  restoreMusicState() {
    const wasPlaying = localStorage.getItem('storyMusicPlaying') === 'true';
    if (wasPlaying && this.audio.readyState >= 2) {
      // Only auto-play if user previously enabled it
      // Most browsers block autoplay anyway
    }
  }
}

// Timeline Animation Observer
class TimelineAnimator {
  constructor() {
    this.timelineItems = document.querySelectorAll('.timeline-item');
    this.init();
  }

  init() {
    if (!this.timelineItems.length) return;

    // Use Intersection Observer for performance
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateTimelineItem(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.timelineItems.forEach((item) => observer.observe(item));
  }

  animateTimelineItem(item) {
    // Add animation class
    item.style.animation = 'slideIn 0.6s ease-out forwards';

    // Stagger animation for content
    const content = item.querySelector('.timeline-content');
    if (content) {
      content.style.animationDelay = '0.2s';
    }

    // Add glow effect to marker
    const marker = item.querySelector('.timeline-marker');
    if (marker) {
      marker.style.animation = 'pulse-marker 2s ease-in-out infinite';
    }
  }
}

// Story Interaction Tracker
class StoryInteractionTracker {
  constructor() {
    this.interactions = {
      musicPlayed: false,
      storyRead: false,
      reflectionViewed: false,
      timelineExplored: false
    };
    this.init();
  }

  init() {
    // Track music interaction
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
      musicToggle.addEventListener('click', () => {
        this.interactions.musicPlayed = true;
        this.saveInteractions();
      });
    }

    // Track scroll to reflection
    const reflectionCard = document.querySelector('.reflection-card');
    if (reflectionCard) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.interactions.reflectionViewed = true;
            this.saveInteractions();
          }
        });
      });
      observer.observe(reflectionCard);
    }

    // Track timeline exploration
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.interactions.timelineExplored = true;
            this.saveInteractions();
          }
        });
      });
      timelineItems.forEach((item) => observer.observe(item));
    }

    // Track story read (scroll to love story section)
    const loveStorySection = document.querySelector('.love-story-section');
    if (loveStorySection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.interactions.storyRead = true;
            this.saveInteractions();
          }
        });
      });
      observer.observe(loveStorySection);
    }
  }

  saveInteractions() {
    localStorage.setItem('storyInteractions', JSON.stringify(this.interactions));
  }

  getInteractions() {
    return this.interactions;
  }
}

// Emotional Timeline Effects
class EmotionalEffects {
  constructor() {
    this.init();
  }

  init() {
    this.addHeartbeatEffect();
    this.addEmotionalTransitions();
  }

  addHeartbeatEffect() {
    const heartbreakItem = document.querySelector('.timeline-heartbreak');
    if (heartbreakItem) {
      // Add subtle pulse effect
      heartbreakItem.addEventListener('mouseenter', () => {
        heartbreakItem.style.transform = 'scale(1.02)';
      });

      heartbreakItem.addEventListener('mouseleave', () => {
        heartbreakItem.style.transform = 'scale(1)';
      });
    }
  }

  addEmotionalTransitions() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      // Add staggered animation delay
      item.style.animationDelay = `${index * 0.1}s`;

      // Add hover effects
      item.addEventListener('mouseenter', () => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(-5px)';
      });

      item.addEventListener('mouseleave', () => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
    });
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize love story player
  window.loveStoryPlayer = new LoveStoryPlayer();

  // Initialize timeline animator
  window.timelineAnimator = new TimelineAnimator();

  // Initialize story interaction tracker
  window.storyInteractionTracker = new StoryInteractionTracker();

  // Initialize emotional effects
  window.emotionalEffects = new EmotionalEffects();

  // Log story loaded
  console.log('💕 Love Story loaded successfully');
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LoveStoryPlayer,
    TimelineAnimator,
    StoryInteractionTracker,
    EmotionalEffects
  };
}
