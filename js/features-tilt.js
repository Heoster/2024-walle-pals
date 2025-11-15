// 3D TILT EFFECT FOR FEATURE CARDS
class TiltEffect {
  constructor(element) {
    this.element = element;
    this.width = element.offsetWidth;
    this.height = element.offsetHeight;
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', (e) => this.handleMove(e));
    this.element.addEventListener('mouseleave', () => this.handleLeave());
  }

  handleMove(e) {
    const rect = this.element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;
    
    const rotateY = percentX * 10;
    const rotateX = -percentY * 10;
    
    this.element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
    
    const glow = this.element.querySelector('.card-glow');
    if (glow) {
      glow.style.transform = `translate(${percentX * 10}px, ${percentY * 10}px)`;
    }
  }

  handleLeave() {
    this.element.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
    
    const glow = this.element.querySelector('.card-glow');
    if (glow) {
      glow.style.transform = 'translate(0, 0)';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-tilt], .feature-card, .highlight-card').forEach(card => {
    new TiltEffect(card);
  });
});
