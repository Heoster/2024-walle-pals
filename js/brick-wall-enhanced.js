// ENHANCED BRICK WALL
class BrickWall {
  constructor(container) {
    this.container = container;
    this.spotlight = document.getElementById('wall-spotlight');
    this.infoPanel = document.getElementById('brick-info');
    
    this.friends = [
      { name: 'HARSH', tagline: 'The Visionary Leader' },
      { name: 'PARDUMAN', tagline: 'The Quiet Genius' },
      { name: 'KARTIK', tagline: 'The Creative Mind' },
      { name: 'PANKAJ', tagline: 'Master of Good Vibes' },
      { name: 'LAKSHAY', tagline: 'The Loyal Companion' },
      { name: 'NAWAJISH', tagline: 'Brings Joy Everywhere' },
      { name: 'VISHESH', tagline: 'The Wise Counselor' },
      { name: 'SAHIL', tagline: 'Always Up for Fun' },
      { name: 'TUSHAR', tagline: 'The Problem Solver' },
      { name: 'YOUGANK', tagline: 'Full of Surprises' },
      { name: 'MASUM', tagline: 'The Gentle Soul' },
      { name: 'SHIV', tagline: 'Strength and Kindness' },
      { name: 'ARIJIT', tagline: 'The Music Lover' },
      { name: 'PINTU', tagline: 'Always Positive' },
      { name: 'AYUSH', tagline: 'The Energetic One' },
      { name: 'SHIVAJI', tagline: 'Natural Born Leader' },
      { name: 'SACHIN', tagline: 'The Sports Enthusiast' },
      { name: 'VARUN', tagline: 'Quick Wit and Humor' },
      { name: 'HANI', tagline: 'The Thoughtful Friend' },
      { name: 'ANSHUL', tagline: 'Always Encouraging' },
      { name: 'ABHISHEK', tagline: 'The Reliable One' },
      { name: 'ARJUN', tagline: 'Focused and Determined' },
      { name: 'DHERAJ', tagline: 'The Peacemaker' },
      { name: 'RAJAT', tagline: 'Full of Ideas' },
      { name: 'ADITYA', tagline: 'The Curious Mind' },
      { name: 'RUDRA', tagline: 'Bold and Fearless' },
      { name: 'MUDASHIR', tagline: 'The Storyteller' },
      { name: 'RAVI', tagline: 'Brings Light to Darkness' },
      { name: 'AASHISH', tagline: 'The Optimistic Dreamer' },
      { name: 'RIJWAAN', tagline: 'The Caring Heart' }
    ];
    
    this.init();
  }

  init() {
    if (this.container) {
      this.createBricks();
      this.setupInteractions();
    }
  }

  createBricks() {
    this.friends.forEach((friend, index) => {
      const brick = document.createElement('div');
      brick.className = 'brick carved';
      brick.dataset.name = friend.name;
      brick.dataset.tagline = friend.tagline;
      brick.innerHTML = `<span class="brick-name">${friend.name}</span>`;
      
      brick.style.animation = `brickReveal 0.6s ease-out ${index * 0.05}s both`;
      
      this.container.appendChild(brick);
    });
  }

  setupInteractions() {
    const bricks = this.container.querySelectorAll('.brick');
    
    bricks.forEach(brick => {
      brick.addEventListener('mouseenter', (e) => {
        this.handleBrickHover(e, brick);
      });
      
      brick.addEventListener('mousemove', (e) => {
        this.moveSpotlight(e);
      });
      
      brick.addEventListener('mouseleave', () => {
        this.hideSpotlight();
        this.hideInfo();
      });
      
      brick.addEventListener('click', () => {
        this.handleBrickClick(brick);
      });
    });
  }

  handleBrickHover(e, brick) {
    const name = brick.dataset.name;
    const tagline = brick.dataset.tagline;
    
    this.showInfo(name, tagline);
    if (this.spotlight) {
      this.spotlight.classList.add('active');
    }
  }

  moveSpotlight(e) {
    if (!this.spotlight) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    this.spotlight.style.left = `${x}px`;
    this.spotlight.style.top = `${y}px`;
  }

  hideSpotlight() {
    if (this.spotlight) {
      this.spotlight.classList.remove('active');
    }
  }

  showInfo(name, tagline) {
    if (!this.infoPanel) return;
    
    this.infoPanel.innerHTML = `
      <h4>${name}</h4>
      <p>${tagline}</p>
    `;
    this.infoPanel.classList.add('active');
  }

  hideInfo() {
    if (this.infoPanel) {
      this.infoPanel.classList.remove('active');
    }
  }

  handleBrickClick(brick) {
    const name = brick.dataset.name.toLowerCase();
    window.location.href = `/friends/${name}.html`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const brickContainer = document.getElementById('brick-wall');
  if (brickContainer) {
    new BrickWall(brickContainer);
  }
});
