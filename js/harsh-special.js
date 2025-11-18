// Harsh - The Adventurous Spirit - Special Enhancements

class HarshSpecialPage {
  constructor() {
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    try {
      const friendSlug = document.body.dataset.friend;
      if (friendSlug === 'harsh') {
        this.enhanceHarshPage();
      }
    } catch (error) {
      console.error('Error setting up Harsh special page:', error);
    }
  }

  enhanceHarshPage() {
    this.addAdventureTimeline();
    this.addSkillsSection();
    this.addAchievements();
    this.addAdventureQuote();
    this.setupInteractions();
  }

  addAdventureTimeline() {
    const gallerySection = document.querySelector('.friend-gallery-section');
    if (!gallerySection) return;

    const timeline = `
      <section class="harsh-adventure-timeline" style="padding: 3rem 0;">
        <div class="container">
          <h2 class="section-title">🗺️ Adventure Timeline</h2>
          
          <div class="adventure-item">
            <div class="adventure-content">
              <div class="adventure-year">2020</div>
              <div class="adventure-title">First Summit</div>
              <div class="adventure-description">Conquered the first mountain peak, discovering the thrill of adventure.</div>
            </div>
          </div>

          <div class="adventure-item">
            <div class="adventure-content">
              <div class="adventure-year">2021</div>
              <div class="adventure-title">Desert Expedition</div>
              <div class="adventure-description">Crossed the desert, learning resilience and determination.</div>
            </div>
          </div>

          <div class="adventure-item">
            <div class="adventure-content">
              <div class="adventure-year">2022</div>
              <div class="adventure-title">Ocean Voyage</div>
              <div class="adventure-description">Sailed across the ocean, embracing the unknown with courage.</div>
            </div>
          </div>

          <div class="adventure-item">
            <div class="adventure-content">
              <div class="adventure-year">2023</div>
              <div class="adventure-title">Jungle Trek</div>
              <div class="adventure-description">Explored the jungle, discovering hidden wonders and inner strength.</div>
            </div>
          </div>

          <div class="adventure-item">
            <div class="adventure-content">
              <div class="adventure-year">2024</div>
              <div class="adventure-title">Leading Adventures</div>
              <div class="adventure-description">Now inspiring others to embark on their own adventures.</div>
            </div>
          </div>
        </div>
      </section>
    `;

    gallerySection.insertAdjacentHTML('afterend', timeline);
  }

  addSkillsSection() {
    const timelineSection = document.querySelector('.harsh-adventure-timeline');
    if (!timelineSection) return;

    const skills = `
      <section style="padding: 3rem 0;">
        <div class="container">
          <div class="harsh-skills-section">
            <h2 class="section-title">⚡ Adventure Skills</h2>
            <div class="skills-grid">
              <div class="skill-card">
                <div class="skill-icon">🏔️</div>
                <div class="skill-name">Mountain Climbing</div>
                <div class="skill-level">Expert</div>
              </div>
              <div class="skill-card">
                <div class="skill-icon">🧗</div>
                <div class="skill-name">Rock Climbing</div>
                <div class="skill-level">Advanced</div>
              </div>
              <div class="skill-card">
                <div class="skill-icon">🏕️</div>
                <div class="skill-name">Camping</div>
                <div class="skill-level">Expert</div>
              </div>
              <div class="skill-card">
                <div class="skill-icon">🧭</div>
                <div class="skill-name">Navigation</div>
                <div class="skill-level">Expert</div>
              </div>
              <div class="skill-card">
                <div class="skill-icon">🎒</div>
                <div class="skill-name">Survival</div>
                <div class="skill-level">Advanced</div>
              </div>
              <div class="skill-card">
                <div class="skill-icon">🌍</div>
                <div class="skill-name">Exploration</div>
                <div class="skill-level">Expert</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    timelineSection.insertAdjacentHTML('afterend', skills);
  }

  addAchievements() {
    const skillsSection = document.querySelector('.harsh-skills-section');
    if (!skillsSection) return;

    const achievements = `
      <section style="padding: 3rem 0;">
        <div class="container">
          <h2 class="section-title">🏆 Achievements</h2>
          <div class="harsh-achievements">
            <div class="achievement-badge">
              <div class="achievement-icon">🥇</div>
              <div class="achievement-title">Adventure Pioneer</div>
              <div class="achievement-description">First to explore uncharted territories</div>
            </div>
            <div class="achievement-badge">
              <div class="achievement-icon">🌟</div>
              <div class="achievement-title">Courage Award</div>
              <div class="achievement-description">Demonstrated exceptional bravery</div>
            </div>
            <div class="achievement-badge">
              <div class="achievement-icon">🎯</div>
              <div class="achievement-title">Goal Achiever</div>
              <div class="achievement-description">Completed 50+ adventures</div>
            </div>
            <div class="achievement-badge">
              <div class="achievement-icon">👥</div>
              <div class="achievement-title">Team Leader</div>
              <div class="achievement-description">Led 100+ people on adventures</div>
            </div>
          </div>
        </div>
      </section>
    `;

    skillsSection.parentElement.insertAdjacentHTML('afterend', achievements);
  }

  addAdventureQuote() {
    const achievementsSection = document.querySelector('.harsh-achievements');
    if (!achievementsSection) return;

    const quote = `
      <section style="padding: 2rem 0;">
        <div class="container">
          <div class="harsh-adventure-quote">
            <p>"Life is either a daring adventure or nothing at all. Every step forward is a victory, every challenge is an opportunity, and every moment is a chance to become braver than yesterday."</p>
          </div>
        </div>
      </section>
    `;

    achievementsSection.parentElement.insertAdjacentHTML('afterend', quote);
  }

  setupInteractions() {
    // Add click interactions to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      card.addEventListener('click', () => {
        const skillName = card.querySelector('.skill-name').textContent;
        this.showSkillDetail(skillName);
      });
    });

    // Add click interactions to achievement badges
    const achievements = document.querySelectorAll('.achievement-badge');
    achievements.forEach(badge => {
      badge.addEventListener('click', () => {
        const title = badge.querySelector('.achievement-title').textContent;
        this.celebrateAchievement(title);
      });
    });

    // Add scroll animations
    this.setupScrollAnimations();
  }

  showSkillDetail(skillName) {
    const details = {
      'Mountain Climbing': 'Harsh has conquered 15+ peaks across different continents, mastering the art of high-altitude climbing.',
      'Rock Climbing': 'Expert in both indoor and outdoor rock climbing, with advanced technical skills.',
      'Camping': 'Experienced in wilderness camping, survival techniques, and outdoor living.',
      'Navigation': 'Master of map reading, GPS, and natural navigation methods.',
      'Survival': 'Trained in wilderness survival, emergency response, and outdoor first aid.',
      'Exploration': 'Passionate explorer discovering new places and pushing boundaries.'
    };

    const message = details[skillName] || 'Amazing skill!';
    this.showNotification(message, 'info');
  }

  celebrateAchievement(title) {
    const messages = {
      'Adventure Pioneer': '🎉 Harsh blazed the trail for all of us!',
      'Courage Award': '💪 True courage in the face of challenges!',
      'Goal Achiever': '🎯 50+ adventures completed! Incredible!',
      'Team Leader': '👥 Leading others to greatness!'
    };

    const message = messages[title] || 'Amazing achievement!';
    this.showNotification(message, 'success');
    this.triggerConfetti();
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.adventure-item, .skill-card, .achievement-badge').forEach(el => {
      observer.observe(el);
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : '#3b82f6'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  triggerConfetti() {
    // Simple confetti effect using CSS
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: #ff6b6b;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
    `;
    
    for (let i = 0; i < 30; i++) {
      const conf = confetti.cloneNode();
      conf.style.left = Math.random() * window.innerWidth + 'px';
      conf.style.top = '-10px';
      document.body.appendChild(conf);

      const duration = Math.random() * 2 + 1;
      conf.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(360deg)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => conf.remove();
    }
  }
}

// Initialize Harsh special page
let harshSpecialPage;
try {
  harshSpecialPage = new HarshSpecialPage();
  window.harshSpecialPage = harshSpecialPage;
} catch (error) {
  console.error('Failed to initialize Harsh special page:', error);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HarshSpecialPage;
}
