# 🎨 Ultimate Stylish Homepage Guide for 2024 Walle Pals

## 🌟 COMPLETE MODERN REDESIGN

### **1. HERO SECTION - Next-Level Design**

```html
<!-- Enhanced Hero with Glassmorphism -->
<section class="hero-enhanced">
  <!-- Animated Background -->
  <div class="hero-background">
    <div class="gradient-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
    <canvas id="particles-canvas"></canvas>
  </div>

  <!-- Hero Content -->
  <div class="hero-content">
    <!-- Floating Badge -->
    <div class="floating-badge">
      <span class="badge-shine">✨</span>
      <span>2024 Edition</span>
      <div class="badge-glow"></div>
    </div>

    <!-- Main Title with Gradient -->
    <h1 class="hero-title">
      <span class="title-line" data-text="Welcome to Our">Welcome to Our</span>
      <span class="title-line gradient-text" data-text="Circle of Friends">Circle of Friends</span>
    </h1>

    <!-- Subtitle with Typewriter Effect -->
    <p class="hero-subtitle typewriter">
      <span id="typewriter-text"></span>
      <span class="cursor">|</span>
    </p>

    <!-- CTA Buttons with Glow -->
    <div class="cta-group">
      <button class="btn-primary btn-glow">
        <span class="btn-icon">👥</span>
        <span class="btn-text">Meet Our Friends</span>
        <span class="btn-shimmer"></span>
      </button>
      
      <button class="btn-secondary btn-glass">
        <span class="btn-icon">📸</span>
        <span class="btn-text">View Memories</span>
      </button>
    </div>

    <!-- Animated Stats Cards -->
    <div class="stats-container">
      <div class="stat-card glass-card">
        <div class="stat-icon">👥</div>
        <div class="stat-number" data-target="30">0</div>
        <div class="stat-label">Amazing Friends</div>
        <div class="stat-progress">
          <div class="progress-fill" style="--progress: 100%"></div>
        </div>
      </div>

      <div class="stat-card glass-card" style="--delay: 0.2s">
        <div class="stat-icon">📸</div>
        <div class="stat-number" data-target="500">0</div>
        <div class="stat-label">Shared Memories</div>
        <div class="stat-progress">
          <div class="progress-fill" style="--progress: 85%"></div>
        </div>
      </div>

      <div class="stat-card glass-card" style="--delay: 0.4s">
        <div class="stat-icon">🎉</div>
        <div class="stat-number" data-target="365">0</div>
        <div class="stat-label">Days Together</div>
        <div class="stat-progress">
          <div class="progress-fill" style="--progress: 100%"></div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="arrow-down">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</section>
```

```css
/* HERO SECTION - Modern Styling */
.hero-enhanced {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #0a0a0a;
}

/* Animated Background Orbs */
.gradient-orbs {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 20s infinite ease-in-out;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: -10%;
  left: -10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  bottom: -10%;
  right: -10%;
  animation-delay: -7s;
}

.orb-3 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 1200px;
  padding: 2rem;
}

/* Floating Badge */
.floating-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
  position: relative;
  animation: float-badge 3s ease-in-out infinite;
}

@keyframes float-badge {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.badge-shine {
  display: inline-block;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

.badge-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #667eea);
  background-size: 300% 300%;
  border-radius: 50px;
  z-index: -1;
  filter: blur(10px);
  opacity: 0.7;
  animation: gradient-rotate 3s linear infinite;
}

@keyframes gradient-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Hero Title */
.hero-title {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-family: 'Playfair Display', serif;
}

.title-line {
  display: block;
  color: white;
  position: relative;
  animation: slideUp 1s ease-out;
}

.title-line:nth-child(2) {
  animation-delay: 0.2s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 5s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Subtitle with Typewriter */
.hero-subtitle {
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  font-weight: 300;
}

.cursor {
  display: inline-block;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* CTA Buttons */
.cta-group {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  padding: 1.2rem 2.5rem;
  border-radius: 50px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
}

.btn-primary:active {
  transform: translateY(-1px);
}

/* Button Shimmer Effect */
.btn-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.3), 
    transparent
  );
  transition: left 0.5s;
}

.btn-primary:hover .btn-shimmer {
  left: 100%;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

/* Glass Stats Cards */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto 4rem;
}

.stat-card {
  padding: 2rem;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
  animation-delay: var(--delay, 0s);
  animation-fill-mode: both;
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.glass-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.stat-number {
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  margin-bottom: 1rem;
}

.stat-progress {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  width: var(--progress, 0%);
  border-radius: 2px;
  animation: fillProgress 2s ease-out;
  animation-delay: 0.5s;
  animation-fill-mode: both;
}

@keyframes fillProgress {
  from { width: 0%; }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  position: relative;
  margin: 0 auto 10px;
}

.wheel {
  width: 4px;
  height: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 2px;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll-wheel 2s infinite;
}

@keyframes scroll-wheel {
  0% { top: 10px; opacity: 1; }
  100% { top: 30px; opacity: 0; }
}

.arrow-down {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.arrow-down span {
  width: 15px;
  height: 15px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  border-right: 2px solid rgba(255, 255, 255, 0.5);
  transform: rotate(45deg);
  animation: arrow-move 2s infinite;
}

.arrow-down span:nth-child(2) {
  animation-delay: 0.2s;
}

.arrow-down span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes arrow-move {
  0%, 100% { opacity: 0; transform: rotate(45deg) translateY(-10px); }
  50% { opacity: 1; transform: rotate(45deg) translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .cta-group {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .orb {
    filter: blur(60px);
  }
}
```

```javascript
// HERO ANIMATIONS - hero-enhanced.js

// Typewriter Effect
const typewriterText = "Where friendships come alive through memories and connections";
const typewriterElement = document.getElementById('typewriter-text');
let charIndex = 0;

function typeWriter() {
  if (charIndex < typewriterText.length) {
    typewriterElement.textContent += typewriterText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 50);
  }
}

// Start typewriter after page load
setTimeout(typeWriter, 1000);

// Animated Counter
function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.ceil(current) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  };

  updateCounter();
}

// Trigger counters when visible
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

statNumbers.forEach(stat => observer.observe(stat));

// Particle Canvas Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = Array.from({ length: 100 }, () => new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize handler
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Smooth scroll for CTA buttons
document.querySelectorAll('.cta-group button').forEach(button => {
  button.addEventListener('click', (e) => {
    const target = button.textContent.includes('Friends') ? '#wall-section' : '#memories-section';
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  });
});
```

---

### **2. WALL OF FRAMES - Enhanced Grid**

```html
<!-- Modern Friend Grid -->
<section class="wall-section" id="wall-section">
  <div class="container">
    <!-- Section Header -->
    <div class="section-header">
      <span class="section-badge">👥 Our Circle</span>
      <h2 class="section-title">Wall of Frames</h2>
      <p class="section-description">
        Meet the amazing people who make our circle special
      </p>
      
      <!-- Search & Filter Bar -->
      <div class="wall-controls">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            type="text" 
            placeholder="Search friends..." 
            id="friend-search"
            class="search-input"
          >
        </div>
        
        <div class="filter-chips">
          <button class="chip active" data-filter="all">All (30)</button>
          <button class="chip" data-filter="squad">Squad ⭐</button>
          <button class="chip" data-filter="buddies">Buddies 🤝</button>
        </div>
      </div>
    </div>

    <!-- Friend Grid -->
    <div class="friend-grid" id="friend-grid">
      <!-- Cards generated dynamically -->
    </div>
  </div>
</section>
```

```css
/* WALL OF FRAMES - Enhanced Styling */
.wall-section {
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);
  position: relative;
}

.wall-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(102, 126, 234, 0.5), 
    transparent
  );
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-badge {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 50px;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
}

.section-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto 3rem;
}

/* Search & Filter */
.wall-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  stroke: rgba(255, 255, 255, 0.5);
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
}

.search-input {
  width: 100%;
  padding: 1.2rem 1.5rem 1.2rem 3.5rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.filter-chips {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.chip {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.chip:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.chip.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
  color: white;
}

/* Friend Grid - Bento Box Layout */
.friend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

/* Friend Card - Modern Design */
.friend-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  group: card;
}

.friend-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(102, 126, 234, 0.1) 0%, 
    rgba(118, 75, 162, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.friend-card:hover {
  transform: translateY(-10px);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(102, 126, 234, 0.3);
}

.friend-card:hover::before {
  opacity: 1;
}

/* Card Image */
.card-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 120%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.friend-card:hover .card-image {
  transform: scale(1.1);
}

/* Badge Overlay */
.friend-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  z-index: 2;
}

/* Card Content */
.card-content {
  padding: 1.5rem;
  position: relative;
  z-index: 1;
}

.card-emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: inline-block;
  animation: wave 2s infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-20deg); }
}

.card-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.card-tagline {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  margin-bottom: 1rem;
}

/* Card Footer */
.card-footer {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.card-action {
  flex: 1;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.card-action:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

/* Responsive */
@media (max-width: 768px) {
  .wall-section {
    padding: 4rem 1rem;
  }
  
  .friend-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .wall-controls {
    padding: 0 1rem;
  }
  
  .filter-chips {
    width: 100%;
  }
  
  .chip {
    flex: 1;
    min-width: fit-content;
  }
}
```

```javascript
// WALL INTERACTIONS - wall-enhanced.js

// Search Functionality
const searchInput = document.getElementById('friend-search');
const friendCards = document.querySelectorAll('.friend-card');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  
  friendCards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const tagline = card.dataset.tagline.toLowerCase();
    
    if (name.includes(searchTerm) || tagline.includes(searchTerm)) {
      card.style.display = 'block';
      card.style.animation = 'fadeInScale 0.4s ease';
    } else {
      card.style.display = 'none';
    }
  });
});

// Filter Functionality
const filterChips = document.querySelectorAll('.chip');

filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    // Remove active class from all
    filterChips.forEach(c => c.classList.remove('active'));
    
    // Add active to clicked
    chip.classList.add('active');
    
    const filter = chip.dataset.filter;
    
    friendCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        card.style.animation = 'fadeInScale 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Add fade in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);

// Card Click Analytics
friendCards.forEach(card => {
  card.addEventListener('click', () => {
    const friendName = card.dataset.name;
    console.log(`Clicked on ${friendName}'s card`);
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    card.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});
```

---

### **3. 3D MEMORY CAROUSEL - Premium Version**

```html
<!-- Advanced 3D Carousel -->
<section class="carousel-section">
  <div class="container">
    <div class="section-header">
      <span class="section-badge">📸 Highlights</span>
      <h2 class="section-title">Memories in Motion</h2>
    </div>

    <div class="carousel-3d-wrapper">
      <!-- Control Buttons -->
      <button class="carousel-control prev" aria-label="Previous">
        <svg viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      
      <button class="carousel-control next" aria-label="Next">
        <svg viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <!-- Carousel Container -->
      <div class="carousel-3d" id="carousel-3d">
        <div class="carousel-track">
          <!-- Cards will be dynamically added -->
        </div>
      </div>

      <!-- Progress Indicator -->
      <div class="carousel-progress">
        <div class="progress-bar" id="carousel-progress"></div>
      </div>

      <!-- Pagination Dots -->
      <div class="carousel-dots" id="carousel-dots"></div>
    </div>
  </div>
</section>
```

```css
/* 3D CAROUSEL - Premium Styling */
.carousel-section {
  padding: 8rem 2rem;
  background: #1a1a2e;
  position: relative;
  overflow: hidden;
}

.carousel-3d-wrapper {
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  perspective: 2000px;
}

.carousel-3d {
  width: 100%;
  height: 600px;
  position: relative;
  transform-style: preserve-3d;
}

.carousel-track {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.carousel-item {
  position: absolute;
  width: 400px;
  height: 500px;
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Item Overlay */
.carousel-item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.carousel-item.active::after {
  opacity: 1;
}

/* Item Caption */
.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  color: white;
  z-index: 2;
  transform: translateY(100%);
  transition: transform 0.4s ease;
}

.carousel-item.active .carousel-caption {
  transform: translateY(0);
}

.carousel-caption h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.carousel-caption p {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Control Buttons */
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control svg {
  width: 24px;
  height: 24px;
  stroke: white;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.carousel-control:hover {
  background: rgba(102, 126, 234, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.carousel-control.prev {
  left: 2rem;
}

.carousel-control.next {
  right: 2rem;
}

/* Progress Bar */
.carousel-progress {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 3rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  width: 0%;
  transition: width 0.3s ease;
}

/* Pagination Dots */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #667eea;
  transform: scale(1.3);
}

.dot:hover {
  background: rgba(102, 126, 234, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-3d {
    height: 400px;
  }
  
  .carousel-item {
    width: 300px;
    height: 400px;
  }
  
  .carousel-control {
    width: 40px;
    height: 40px;
  }
  
  .carousel-control.prev {
    left: 1rem;
  }
  
  .carousel-control.next {
    right: 1rem;
  }
}
```

```javascript
// 3D CAROUSEL - carousel-3d-enhanced.js

class Carousel3D {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.carousel-track');
    this.items = [];
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.radius = 600;
    
    this.init();
  }

  init() {
    this.createItems();
    this.createDots();
    this.setupControls();
    this.updateCarousel();
    this.startAutoplay();
  }

  createItems() {
    const images = [
      'memories1.jpg',
      'memories2.jpg',
      'memories3.jpg',
      'memories4.jpg',
      'memories5.jpg',
      'memories6.jpg',
      'memories7.jpg',
      'memories8.jpg',
      'memories9.jpg',
      'memories10.jpg'
    ];

    images.forEach((src, index) => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.innerHTML = `
        <img src="assets/memories/${src}" alt="Memory ${index + 1}" loading="lazy">
        <div class="carousel-caption">
          <h3>Memory ${index + 1}</h3>
          <p>An amazing moment from our journey</p>
        </div>
      `;
      this.track.appendChild(item);
      this.items.push(item);
    });
  }

  createDots() {
    const dotsContainer = document.getElementById('carousel-dots');
    this.items.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  setupControls() {
    document.querySelector('.carousel-control.prev').addEventListener('click', () => {
      this.prev();
    });

    document.querySelector('.carousel-control.next').addEventListener('click', () => {
      this.next();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch swipe
    let touchStartX = 0;
    let touchEndX = 0;

    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) this.next();
      if (touchEndX > touchStartX + 50) this.prev();
    });
  }

  updateCarousel() {
    const angle = 360 / this.items.length;

    this.items.forEach((item, index) => {
      const itemAngle = angle * index;
      const rotateY = itemAngle - (this.currentIndex * angle);
      
      const translateZ = index === this.currentIndex ? this.radius + 100 : this.radius;
      const scale = index === this.currentIndex ? 1.1 : 1;
      const opacity = Math.abs(index - this.currentIndex) <= 2 ? 1 : 0;

      item.style.transform = `
        translateX(-50%)
        translateY(-50%)
        rotateY(${rotateY}deg)
        translateZ(${translateZ}px)
        scale(${scale})
      `;
      item.style.opacity = opacity;
      item.classList.toggle('active', index === this.currentIndex);
    });

    this.updateProgress();
    this.updateDots();
  }

  updateProgress() {
    const progress = ((this.currentIndex + 1) / this.items.length) * 100;
    document.getElementById('carousel-progress').style.width = `${progress}%`;
  }

  updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateCarousel();
    this.resetAutoplay();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateCarousel();
    this.resetAutoplay();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
    this.resetAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.getElementById('carousel-3d');
  if (carouselContainer) {
    new Carousel3D(carouselContainer);
  }
});
```

# 🎨 STYLISH HOMEPAGE - CONTINUED

## **4. MODERN NAVIGATION BAR** 🧭

```html
<!-- Premium Navigation -->
<nav class="navbar-premium" id="navbar">
  <div class="nav-container">
    <!-- Logo Section -->
    <a href="/" class="nav-logo">
      <div class="logo-icon">
        <span class="logo-emoji">🎓</span>
        <div class="logo-pulse"></div>
      </div>
      <div class="logo-text">
        <span class="logo-title">Walle Pals</span>
        <span class="logo-subtitle">2024</span>
      </div>
    </a>

    <!-- Desktop Navigation -->
    <ul class="nav-menu" id="nav-menu">
      <li class="nav-item">
        <a href="#home" class="nav-link active">
          <span class="link-icon">🏠</span>
          <span class="link-text">Home</span>
          <span class="link-underline"></span>
        </a>
      </li>
      
      <li class="nav-item">
        <a href="#wall-section" class="nav-link">
          <span class="link-icon">👥</span>
          <span class="link-text">Friends</span>
          <span class="link-badge">30</span>
          <span class="link-underline"></span>
        </a>
      </li>
      
      <li class="nav-item nav-dropdown-parent">
        <a href="#" class="nav-link">
          <span class="link-icon">📸</span>
          <span class="link-text">Memories</span>
          <span class="link-arrow">▼</span>
          <span class="link-underline"></span>
        </a>
        
        <!-- Mega Dropdown -->
        <div class="nav-dropdown-mega">
          <div class="dropdown-grid">
            <div class="dropdown-section">
              <h4 class="dropdown-title">📷 Photos</h4>
              <ul class="dropdown-list">
                <li><a href="/memories.html">All Memories</a></li>
                <li><a href="/memories.html#timeline">Timeline</a></li>
                <li><a href="/memories.html#highlights">Highlights</a></li>
              </ul>
            </div>
            
            <div class="dropdown-section">
              <h4 class="dropdown-title">🎬 Videos</h4>
              <ul class="dropdown-list">
                <li><a href="/memories.html#videos">Video Gallery</a></li>
                <li><a href="/memories.html#reels">Short Clips</a></li>
              </ul>
            </div>
            
            <div class="dropdown-section">
              <h4 class="dropdown-title">🎨 Collections</h4>
              <ul class="dropdown-list">
                <li><a href="/gallery.html">School Gallery</a></li>
                <li><a href="/gallery.html#events">Events</a></li>
                <li><a href="/brick-wall.html">Brick Wall</a></li>
              </ul>
            </div>
            
            <div class="dropdown-featured">
              <div class="featured-memory">
                <img src="assets/memories/memories1.jpg" alt="Featured">
                <div class="featured-overlay">
                  <span class="featured-label">🔥 Trending</span>
                  <p>Latest Upload</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      
      <li class="nav-item">
        <a href="/gallery.html" class="nav-link">
          <span class="link-icon">🎨</span>
          <span class="link-text">Gallery</span>
          <span class="link-underline"></span>
        </a>
      </li>
      
      <li class="nav-item">
        <a href="/contact.html" class="nav-link">
          <span class="link-icon">✉️</span>
          <span class="link-text">Contact</span>
          <span class="link-underline"></span>
        </a>
      </li>
    </ul>

    <!-- Right Side Actions -->
    <div class="nav-actions">
      <!-- Search Button -->
      <button class="nav-icon-btn" id="search-toggle" aria-label="Search">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      </button>

      <!-- Upload Button -->
      <a href="/memory-upload.html" class="nav-upload-btn">
        <svg viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <span>Upload</span>
      </a>

      <!-- Theme Toggle -->
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <div class="toggle-track">
          <div class="toggle-thumb">
            <span class="theme-icon sun">☀️</span>
            <span class="theme-icon moon">🌙</span>
          </div>
        </div>
      </button>

      <!-- Mobile Menu Toggle -->
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </div>

  <!-- Search Overlay -->
  <div class="search-overlay" id="search-overlay">
    <div class="search-container">
      <input 
        type="text" 
        placeholder="Search friends, memories, or moments..." 
        class="search-input-large"
        id="global-search"
      >
      <button class="search-close" id="search-close">✕</button>
      
      <div class="search-suggestions">
        <div class="suggestion-section">
          <h5>🔥 Popular</h5>
          <ul>
            <li><a href="#">Harsh's Profile</a></li>
            <li><a href="#">School Memories</a></li>
            <li><a href="#">Group Photos</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</nav>
```

```css
/* PREMIUM NAVIGATION BAR */
.navbar-premium {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar-premium.scrolled {
  background: rgba(10, 10, 10, 0.95);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: transform 0.3s ease;
}

.nav-logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-emoji {
  font-size: 2rem;
  position: relative;
  z-index: 2;
  animation: logoFloat 3s ease-in-out infinite;
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.logo-pulse {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  opacity: 0.3;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.3); opacity: 0; }
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 1.3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Playfair Display', serif;
}

.logo-subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  letter-spacing: 2px;
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 12px;
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
}

.nav-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.05);
}

.nav-link.active {
  color: white;
  background: rgba(102, 126, 234, 0.15);
}

.link-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.nav-link:hover .link-icon {
  transform: scale(1.2) rotate(5deg);
}

/* Link Underline Animation */
.link-underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover .link-underline,
.nav-link.active .link-underline {
  width: 80%;
}

/* Badge */
.link-badge {
  padding: 0.2rem 0.5rem;
  background: #667eea;
  color: white;
  font-size: 0.7rem;
  border-radius: 10px;
  font-weight: 700;
}

.link-arrow {
  font-size: 0.7rem;
  margin-left: -0.3rem;
  transition: transform 0.3s ease;
}

.nav-dropdown-parent:hover .link-arrow {
  transform: rotate(180deg);
}

/* Mega Dropdown */
.nav-dropdown-mega {
  position: absolute;
  top: calc(100% + 1rem);
  left: 50%;
  transform: translateX(-50%);
  min-width: 700px;
  background: rgba(20, 20, 30, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.nav-dropdown-parent:hover .nav-dropdown-mega {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 200px;
  gap: 2rem;
}

.dropdown-section {
  min-width: 150px;
}

.dropdown-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dropdown-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-list li {
  margin-bottom: 0.75rem;
}

.dropdown-list a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  display: block;
  padding: 0.25rem 0;
}

.dropdown-list a:hover {
  color: #667eea;
  padding-left: 0.5rem;
}

/* Featured Memory in Dropdown */
.dropdown-featured {
  grid-column: 4;
}

.featured-memory {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
}

.featured-memory img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.9));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  color: white;
}

.featured-label {
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

/* Navigation Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-icon-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-icon-btn svg {
  width: 20px;
  height: 20px;
  stroke: rgba(255, 255, 255, 0.7);
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.nav-icon-btn:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.nav-icon-btn:hover svg {
  stroke: white;
}

/* Upload Button */
.nav-upload-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-upload-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #764ba2, #667eea);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-upload-btn:hover::before {
  opacity: 1;
}

.nav-upload-btn svg {
  width: 18px;
  height: 18px;
  stroke: white;
  fill: none;
  stroke-width: 2;
  position: relative;
  z-index: 1;
}

.nav-upload-btn span {
  position: relative;
  z-index: 1;
}

/* Theme Toggle */
.theme-toggle {
  width: 60px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  cursor: pointer;
  padding: 4px;
  transition: all 0.3s ease;
}

.toggle-track {
  position: relative;
  width: 100%;
  height: 100%;
}

.toggle-thumb {
  position: absolute;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.theme-toggle.dark .toggle-thumb {
  transform: translateX(28px);
}

.theme-icon {
  font-size: 0.9rem;
  position: absolute;
  transition: all 0.3s ease;
}

.sun {
  opacity: 1;
  transform: rotate(0deg);
}

.moon {
  opacity: 0;
  transform: rotate(180deg);
}

.theme-toggle.dark .sun {
  opacity: 0;
  transform: rotate(180deg);
}

.theme-toggle.dark .moon {
  opacity: 1;
  transform: rotate(0deg);
}

/* Hamburger Menu */
.hamburger {
  display: none;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger.active .hamburger-line:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.hamburger.active .hamburger-line:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Search Overlay */
.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  z-index: 9999;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 10vh;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
}

.search-overlay.active {
  opacity: 1;
  visibility: visible;
}

.search-container {
  width: 90%;
  max-width: 700px;
  position: relative;
}

.search-input-large {
  width: 100%;
  padding: 2rem 3rem 2rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.search-input-large:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.search-input-large::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.search-close {
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-close:hover {
  background: rgba(255, 0, 0, 0.3);
  transform: translateY(-50%) rotate(90deg);
}

.search-suggestions {
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
}

.suggestion-section h5 {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.suggestion-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestion-section li {
  margin-bottom: 0.75rem;
}

.suggestion-section a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 1.1rem;
  display: block;
  padding: 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.suggestion-section a:hover {
  background: rgba(102, 126, 234, 0.2);
  color: white;
  padding-left: 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }
  
  .hamburger {
    display: flex;
  }
  
  .nav-menu.mobile-active {
    display: flex;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(10, 10, 10, 0.98);
    backdrop-filter: blur(20px);
    padding: 2rem;
    gap: 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    animation: slideDown 0.4s ease;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .nav-item {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-link {
    width: 100%;
    justify-content: space-between;
    padding: 1rem;
  }
  
  .nav-dropdown-mega {
    position: static;
    transform: none;
    min-width: 100%;
    margin-top: 1rem;
  }
  
  .dropdown-grid {
    grid-template-columns: 1fr;
  }
  
  .dropdown-featured {
    grid-column: 1;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-upload-btn span {
    display: none;
  }
  
  .nav-upload-btn {
    padding: 0.75rem;
  }
}
```

```javascript
// NAVIGATION INTERACTIONS - navbar-premium.js

class PremiumNavbar {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.getElementById('nav-menu');
    this.searchToggle = document.getElementById('search-toggle');
    this.searchOverlay = document.getElementById('search-overlay');
    this.searchClose = document.getElementById('search-close');
    this.themeToggle = document.getElementById('theme-toggle');
    this.globalSearch = document.getElementById('global-search');
    
    this.init();
  }

  init() {
    this.setupScrollBehavior();
    this.setupMobileMenu();
    this.setupSearch();
    this.setupThemeToggle();
    this.setupActiveLinks();
    this.setupKeyboardShortcuts();
  }

  setupScrollBehavior() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Add scrolled class
      if (currentScroll > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScroll > lastScroll && currentScroll > 100) {
        this.navbar.style.transform = 'translateY(-100%)';
      } else {
        this.navbar.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
  }

  setupMobileMenu() {
    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('active');
      this.navMenu.classList.toggle('mobile-active');
      document.body.style.overflow = 
        this.navMenu.classList.contains('mobile-active') ? 'hidden' : '';
    });

    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          this.hamburger.classList.remove('active');
          this.navMenu.classList.remove('mobile-active');
          document.body.style.overflow = '';
        }
      });
    });
  }

  setupSearch() {
    // Open search
    this.searchToggle.addEventListener('click', () => {
      this.searchOverlay.classList.add('active');
      setTimeout(() => this.globalSearch.focus(), 300);
    });

    // Close search
    this.searchClose.addEventListener('click', () => {
      this.searchOverlay.classList.remove('active');
      this.globalSearch.value = '';
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.searchOverlay.classList.contains('active')) {
        this.searchOverlay.classList.remove('active');
      }
    });

    // Close on backdrop click
    this.searchOverlay.addEventListener('click', (e) => {
      if (e.target === this.searchOverlay) {
        this.searchOverlay.classList.remove('active');
      }
    });

    // Search functionality
    this.globalSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      this.performSearch(query);
    });
  }

  performSearch(query) {
    // Implement search logic
    if (query.length < 2) return;
    
    console.log('Searching for:', query);
    // Add your search implementation here
  }

  setupThemeToggle() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
      this.themeToggle.classList.add('dark');
    }

    this.themeToggle.addEventListener('click', () => {
      const isDark = this.themeToggle.classList.toggle('dark');
      const newTheme = isDark ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add transition effect
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
  }

  setupActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Cmd/Ctrl + K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        this.searchOverlay.classList.add('active');
        setTimeout(() => this.globalSearch.focus(), 300);
      }
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new PremiumNavbar();
});
```

---

## **5. HIGHLIGHTS SECTION - Modern Cards** 💡

```html
<!-- Enhanced Highlights Section -->
<section class="highlights-section">
  <div class="container">
    <div class="section-header">
      <span class="section-badge">✨ Why We're Special</span>
      <h2 class="section-title">What Makes Us Unique</h2>
      <p class="section-description">
        The values and moments that define our incredible journey together
      </p>
    </div>

    <!-- Feature Cards Grid -->
    <div class="features-grid">
      <!-- Feature Card 1 -->
      <div class="feature-card" data-tilt>
        <div class="card-glow"></div>
        <div class="card-icon-wrapper">
          <div class="icon-bg">
            <div class="icon-circle"></div>
          </div>
          <span class="card-icon">🎓</span>
        </div>
        
        <h3 class="card-title">Learning Together</h3>
        <p class="card-description">
          From classroom lectures to virtual sessions, we've grown together through every lesson
        </p>
        
        <ul class="card-stats">
          <li>
            <span class="stat-value">100+</span>
            <span class="stat-label">Study Sessions</span>
          </li>
          <li>
            <span class="stat-value">50+</span>
            <span class="stat-label">Group Projects</span>
          </li>
        </ul>
        
        <a href="#" class="card-link">
          <span>Explore Memories</span>
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Feature Card 2 -->
      <div class="feature-card" data-tilt style="--delay: 0.1s">
        <div class="card-glow"></div>
        <div class="card-icon-wrapper">
          <div class="icon-bg">
            <div class="icon-circle"></div>
          </div>
          <span class="card-icon">🎉</span>
        </div>
        
        <h3 class="card-title">Celebrating Life</h3>
        <p class="card-description">
          Every milestone, birthday, and achievement celebrated with joy and laughter
        </p>
        
        <ul class="card-stats">
          <li>
            <span class="stat-value">30+</span>
            <span class="stat-label">Birthdays</span>
          </li>
          <li>
            <span class="stat-value">15+</span>
            <span class="stat-label">Events</span>
          </li>
        </ul>
        
        <a href="#" class="card-link">
          <span>View Celebrations</span>
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Feature Card 3 -->
      <div class="feature-card" data-tilt style="--delay: 0.2s">
        <div class="card-glow"></div>
        <div class="card-icon-wrapper">
          <div class="icon-bg">
            <div class="icon-circle"></div>
          </div>
          <span class="card-icon">💪</span>
        </div>
        
        <h3 class="card-title">Supporting Each Other</h3>
        <p class="card-description">
          Through thick and thin, always there for one another with unwavering support
        </p>
        
        <ul class="card-stats">
          <li>
            <span class="stat-value">∞</span>
            <span class="stat-label">Support</span>
          </li>
          <li>
            <span class="stat-value">365</span>
            <span class="stat-label">Days/Year</span>
          </li>
        </ul>
        
        <a href="#" class="card-link">
          <span>Read Stories</span>
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Feature Card 4 -->
      <div class="feature-card" data-tilt style="--delay: 0.3s">
        <div class="card-glow"></div>
        <div class="card-icon-wrapper">
          <div class="icon-bg">
            <div class="icon-circle"></div>
          </div>
          <span class="card-icon">🌟</span>
        </div>
        
        <h3 class="card-title">Creating Memories</h3>
        <p class="card-description">
          Daily adventures and spontaneous moments that become treasured memories
        </p>
        
        <ul class="card-stats">
          <li>
            <span class="stat-value">500+</span>
            <span class="stat-label">Photos</span>
          </li>
          <li>
            <span class="stat-value">100+</span>
            <span class="stat-label">Videos</span>
          </li>
        </ul>
        
        <a href="#" class="card-link">
          <span>See Gallery</span>
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

```css
/* HIGHLIGHTS SECTION - Modern Cards */
.highlights-section {
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #1a1a2e 0%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
}

.highlights-section::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  top: -300px;
  right: -300px;
  pointer-events: none;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

/* Feature Card */
.feature-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2.5rem;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  overflow: hidden;
  animation: fadeInUp 0.8s ease-out;
  animation-delay: var(--delay, 0s);
  animation-fill-mode: both;
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(102, 126, 234, 0.05) 0%, 
    rgba(118, 75, 162, 0.05) 100%
  );
  opacity: 0;
  transition: opacity 0.5s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
}

.feature-card:hover::before {
  opacity: 1;
}

/* Card Glow Effect */
.card-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, 
    #667eea, 
    #764ba2, 
    #f093fb, 
    #667eea
  );
  background-size: 400% 400%;
  border-radius: 24px;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.5s ease;
  animation: gradient-rotate 8s ease infinite;
  z-index: -1;
}

.feature-card:hover .card-glow {
  opacity: 0.3;
}

/* Icon Wrapper */
.card-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  opacity: 0.1;
  transform: rotate(45deg);
  transition: all 0.5s ease;
}

.feature-card:hover .icon-bg {
  transform: rotate(405deg) scale(1.1);
  opacity: 0.2;
}

.icon-circle {
  position: absolute;
  inset: 10px;
  border: 2px dashed rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

.card-icon {
  font-size: 3rem;
  position: relative;
  z-index: 2;
  transition: transform 0.5s ease;
}

.feature-card:hover .card-icon {
  transform: scale(1.2) rotate(10deg);
}

/* Card Content */
.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
}

.card-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* Card Stats */
.card-stats {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.card-stats li {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-card:hover .card-stats li {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.2);
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Card Link */
.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.card-link svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s ease;
}

.card-link:hover {
  gap: 1rem;
  color: #764ba2;
}

.card-link:hover svg {
  transform: translateX(5px);
}

/* 3D Tilt Effect */
.feature-card[data-tilt] {
  transform-style: preserve-3d;
}

/* Responsive */
@media (max-width: 768px) {
  .highlights-section {
    padding: 4rem 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 2rem;
  }
}
```

```javascript
// FEATURE CARDS 3D TILT - features-tilt.js

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
    
    const rotateY = percentX * 10; // max 10deg
    const rotateX = -percentY * 10;
    
    this.element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
    
    // Move glow effect
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

// Initialize tilt effect
document.querySelectorAll('[data-tilt]').forEach(card => {
  new TiltEffect(card);
});
```

---

## **6. BRICK WALL - Enhanced Version** 🧱

```html
<!-- Premium Brick Wall Section -->
<section class="brick-wall-section">
  <div class="container">
    <div class="section-header">
      <span class="section-badge">🧱 Our Legacy</span>
      <h2 class="section-title">Wall of Legends</h2>
      <p class="section-description">
        Every name tells a story, every brick holds a memory
      </p>
    </div>

    <!-- Interactive Brick Wall -->
    <div class="brick-wall-container">
      <div class="brick-wall-3d" id="brick-wall">
        <!-- Bricks generated dynamically -->
      </div>
      
      <!-- Spotlight Effect -->
      <div class="wall-spotlight" id="wall-spotlight"></div>
      
      <!-- Info Panel -->
      <div class="brick-info-panel" id="brick-info">
        <h4>Hover over a brick</h4>
        <p>Discover the legend behind each name</p>
      </div>
    </div>

    <!-- Full Wall CTA -->
    <div class="wall-cta">
      <a href="/brick-wall.html" class="btn-wall-full">
        <span>🧱</span>
        <span>View Full Wall</span>
        <span class="btn-arrow">→</span>
      </a>
    </div>
  </div>
</section>
```

```css
/* BRICK WALL SECTION */
.brick-wall-section {
  padding: 8rem 2rem;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
}

.brick-wall-container {
  max-width: 1200px;
  margin: 4rem auto;
  position: relative;
  padding: 3rem;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(101, 67, 33, 0.1) 100%);
  border-radius: 20px;
  border: 2px solid rgba(139, 69, 19, 0.3);
  box-shadow: 
    inset 0 2px 20px rgba(0, 0, 0, 0.5),
    0 20px 60px rgba(0, 0, 0, 0.4);
}

.brick-wall-3d {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
  perspective: 1000px;
}

/* Individual Brick */
.brick {
  position: relative;
  aspect-ratio: 2/1;
  background: linear-gradient(135deg, 
    #8B4513 0%,
    #A0522D 50%,
    #654321 100%
  );
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
}

/* Brick Texture */
.brick::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.1) 0px,
      transparent 1px,
      transparent 10px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.1) 0px,
      transparent 1px,
      transparent 10px
    );
  opacity: 0.3;
}

/* Brick Border Effect */
.brick::after {
  content: '';
  position: absolute;
  inset: 4px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  pointer-events: none;
}

/* Brick Name */
.brick-name {
  position: relative;
  z-index: 2;
  font-size: 1.1rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(255, 255, 255, 0.2);
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  font-family: 'Playfair Display', serif;
}

/* Carved Effect */
.brick.carved .brick-name {
  text-shadow: 
    -1px -1px 0 rgba(0, 0, 0, 0.8),
    1px 1px 0 rgba(255, 255, 255, 0.2),
    2px 2px 4px rgba(0, 0, 0, 0.6);
  color: rgba(255, 255, 255, 0.7);
}

/* Hover Effects */
.brick:hover {
  transform: translateZ(20px) scale(1.05);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.6),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  z-index: 10;
}

.brick:hover .brick-name {
  color: #FFD700;
  text-shadow: 
    0 0 20px rgba(255, 215, 0, 0.8),
    2px 2px 4px rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

/* Offset Pattern for Realistic Wall */
.brick:nth-child(even) {
  transform: translateX(-50%);
}

/* Spotlight Effect */
.wall-spotlight {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, 
    rgba(255, 215, 0, 0.3) 0%,
    rgba(255, 215, 0, 0.1) 40%,
    transparent 70%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 5;
}

.wall-spotlight.active {
  opacity: 1;
}

/* Info Panel */
.brick-info-panel {
  position: absolute;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  text-align: center;
  min-width: 300px;
  opacity: 0;
  transition: all 0.4s ease;
  pointer-events: none;
}

.brick-info-panel.active {
  opacity: 1;
  bottom: 2rem;
}

.brick-info-panel h4 {
  font-size: 1.2rem;
  color: #FFD700;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.brick-info-panel p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Wall CTA */
.wall-cta {
  text-align: center;
  margin-top: 3rem;
}

.btn-wall-full {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 50px;
  border: 2px solid rgba(255, 215, 0, 0.3);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.btn-wall-full::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #A0522D 0%, #8B4513 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.btn-wall-full:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 10px 30px rgba(139, 69, 19, 0.5),
    0 0 20px rgba(255, 215, 0, 0.3);
  border-color: #FFD700;
}

.btn-wall-full:hover::before {
  opacity: 1;
}

.btn-wall-full span {
  position: relative;
  z-index: 1;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-wall-full:hover .btn-arrow {
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 768px) {
  .brick-wall-3d {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .brick-name {
    font-size: 0.9rem;
  }
  
  .brick:nth-child(even) {
    transform: none;
  }
}
```

```javascript
// BRICK WALL INTERACTIONS - brick-wall-enhanced.js

class BrickWall {
  constructor(container) {
    this.container = container;
    this.spotlight = document.getElementById('wall-spotlight');
    this.infoPanel = document.getElementById('brick-info');
    
    this.friends = [
      { name: 'HARSH', tagline: 'The Visionary Leader' },
      { name: 'PARDUMAN', tagline: 'The Quiet Genius' },
      { name: 'KARTIK', tagline: 'The Energizer' },
      { name: 'PANKAJ', tagline: 'The Comedian' },
      { name: 'LAKSHAY', tagline: 'The Strategist' },
      { name: 'PASANDU', tagline: 'The Creative Soul' },
      { name: 'VISHESH', tagline: 'The Philosopher' },
      { name: 'SAHIL', tagline: 'The Adventurer' },
      { name: 'TUSHAR', tagline: 'The Tech Wizard' },
      { name: 'YOUGANK', tagline: 'The Motivator' },
      { name: 'MASUM', tagline: 'The Peacemaker' },
      { name: 'SHIV', tagline: 'The Problem Solver' },
      { name: 'ARIJIT', tagline: 'The Musician' },
      { name: 'PINTU', tagline: 'The Optimist' },
      { name: 'AYUSH', tagline: 'The Innovator' },
      { name: 'SHIVAJI', tagline: 'The Warrior' },
      { name: 'SACHIN', tagline: 'The Champion' },
      { name: 'VARUN', tagline: 'The Explorer' },
      { name: 'HANI', tagline: 'The Dreamer' },
      { name: 'ANSHUL', tagline: 'The Artist' },
      { name: 'ABHISHEK', tagline: 'The Achiever' },
      { name: 'ARJUN', tagline: 'The Protector' },
      { name: 'DHERAJ', tagline: 'The Loyal Friend' },
      { name: 'RAJAT', tagline: 'The Entertainer' },
      { name: 'ADITYA', tagline: 'The Scholar' },
      { name: 'RUDRA', tagline: 'The Bold One' },
      { name: 'MUDASHIR', tagline: 'The Wise' },
      { name: 'RAVI', tagline: 'The Bright Star' },
      { name: 'AASHISH', tagline: 'The Believer' },
      { name: 'RIJWAAN', tagline: 'The Faithful' }
    ];
    
    this.init();
  }

  init() {
    this.createBricks();
    this.setupInteractions();
  }

  createBricks() {
    this.friends.forEach((friend, index) => {
      const brick = document.createElement('div');
      brick.className = 'brick carved';
      brick.dataset.name = friend.name;
      brick.dataset.tagline = friend.tagline;
      brick.innerHTML = `<span class="brick-name">${friend.name}</span>`;
      
      // Stagger animation
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
    this.spotlight.classList.add('active');
  }

  moveSpotlight(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    this.spotlight.style.left = `${x}px`;
    this.spotlight.style.top = `${y}px`;
  }

  hideSpotlight() {
    this.spotlight.classList.remove('active');
  }

  showInfo(name, tagline) {
    this.infoPanel.innerHTML = `
      <h4>${name}</h4>
      <p>${tagline}</p>
    `;
    this.infoPanel.classList.add('active');
  }

  hideInfo() {
    this.infoPanel.classList.remove('active');
  }

  handleBrickClick(brick) {
    const name = brick.dataset.name.toLowerCase();
    window.location.href = `/friends/${name}.html`;
  }
}

// Add brick reveal animation
const style = document.createElement('style');
style.textContent = `
  @keyframes brickReveal {
    from {
      opacity: 0;
      transform: translateY(50px) rotateX(-90deg);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0);
    }
  }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const brickContainer = document.getElementById('brick-wall');
  if (brickContainer) {
    new BrickWall(brickContainer);
  }
});
```

---

## **7. PREMIUM FOOTER** 📄

```html
<!-- Modern Footer -->
<footer class="footer-premium">
  <!-- Wave Divider -->
  <div class="footer-wave">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
      <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
      <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
    </svg>
  </div>

  <div class="footer-content">
    <div class="container">
      <!-- Footer Grid -->
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-col">
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="logo-emoji">🎓</span>
              <div class="logo-glow"></div>
            </div>
            <h3>Walle Pals 2024</h3>
            <p>Celebrating friendships, creating memories, building legacies.</p>
          </div>
          
          <!-- Social Links -->
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="#wall-section">Our Friends</a></li>
            <li><a href="/memories.html">Memories</a></li>
            <li><a href="/gallery.html">Gallery</a></li>
          </ul>
        </div>

        <!-- Explore -->
        <div class="footer-col">
          <h4>Explore</h4>
          <ul class="footer-links">
            <li><a href="/brick-wall.html">Brick Wall</a></li>
            <li><a href="/memory-upload.html">Upload Memory</a></li>
            <li><a href="/contact.html">Contact Us</a></li>
            <li><a href="/about.html">About</a></li>
          </ul>
        </div>

        <!-- Stats -->
        <div class="footer-col">
          <h4>Our Journey</h4>
          <div class="footer-stats">
            <div class="footer-stat">
              <span class="stat-icon">👥</span>
              <div>
                <strong>30</strong>
                <span>Friends</span>
              </div>
            </div>
            <div class="footer-stat">
              <span class="stat-icon">📸</span>
              <div>
                <strong>500+</strong>
                <span>Memories</span>
              </div>
            </div>
            <div class="footer-stat">
              <span class="stat-icon">🎉</span>
              <div>
                <strong>365</strong>
                <span>Days Together</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            © 2024 Walle Pals. Made with <span class="heart">❤️</span> for our amazing circle.
          </p>
          
          <div class="footer-bottom-links">
            <a href="/privacy.html">Privacy</a>
            <span class="divider">•</span>
            <a href="/terms.html">Terms</a>
            <span class="divider">•</span>
            <a href="#" id="back-to-top">Back to Top ↑</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating Particles -->
  <canvas id="footer-particles"></canvas>
</footer>
```

```css
/* PREMIUM FOOTER */
.footer-premium {
  position: relative;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);
  color: rgba(255, 255, 255, 0.8);
  overflow: hidden;
}

/* Wave Divider */
.footer-wave {
  position: relative;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.footer-wave svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 120px;
  transform: rotateY(180deg);
  fill: #1a1a2e;
}

/* Footer Content */
.footer-content {
  position: relative;
  z-index: 2;
  padding: 4rem 2rem 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
}

/* Footer Brand */
.footer-brand {
  margin-bottom: 2rem;
}

.footer-logo {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.footer-logo .logo-emoji {
  font-size: 2.5rem;
  position: relative;
  z-index: 2;
}

.logo-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.3;
  animation: pulse 3s ease-in-out infinite;
}

.footer-brand h3 {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
}

.footer-brand p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

/* Social Links */
.footer-social {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.social-link {
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-link svg {
  width: 22px;
  height: 22px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.social-link:hover {
  border-color: #667eea;
  transform: translateY(-3px);
}

.social-link:hover::before {
  opacity: 1;
}

.social-link:hover svg {
  transform: scale(1.1);
  stroke: white;
}

/* Footer Column */
.footer-col h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.75rem;
}

.footer-col h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

/* Footer Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  display: inline-block;
  position: relative;
}

.footer-links a::before {
  content: '→';
  position: absolute;
  left: -20px;
  opacity: 0;
  transition: all 0.2s ease;
}

.footer-links a:hover {
  color: #667eea;
  padding-left: 20px;
}

.footer-links a:hover::before {
  opacity: 1;
  left: 0;
}

/* Footer Stats */
.footer-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-stat {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.footer-stat:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.2);
  transform: translateX(5px);
}

.stat-icon {
  font-size: 1.5rem;
}

.footer-stat strong {
  display: block;
  font-size: 1.3rem;
  color: #667eea;
  font-weight: 800;
}

.footer-stat span {
  display: block;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Footer Bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.heart {
  color: #ff6b6b;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-bottom-links a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-bottom-links a:hover {
  color: #667eea;
}

.divider {
  color: rgba(255, 255, 255, 0.2);
}

#back-to-top {
  cursor: pointer;
  font-weight: 600;
}

/* Particles Canvas */
#footer-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.3;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-content {
    padding: 3rem 1rem 2rem;
  }
}
```

```javascript
// FOOTER INTERACTIONS - footer-premium.js

// Back to Top
document.getElementById('back-to-top').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Footer Particles
const footerCanvas = document.getElementById('footer-particles');
const ctx = footerCanvas.getContext('2d');

footerCanvas.width = window.innerWidth;
footerCanvas.height = document.querySelector('.footer-premium').offsetHeight;

class FooterParticle {
  constructor() {
    this.x = Math.random() * footerCanvas.width;
    this.y = Math.random() * footerCanvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedY = Math.random() * -0.5 - 0.2;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.y += this.speedY;
    if (this.y < 0) {
      this.y = footerCanvas.height;
      this.x = Math.random() * footerCanvas.width;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const footerParticles = Array.from({ length: 50 }, () => new FooterParticle());

function animateFooterParticles() {
  ctx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);
  
  footerParticles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateFooterParticles);
}

animateFooterParticles();

// Resize handler
window.addEventListener('resize', () => {
  footerCanvas.width = window.innerWidth;
  footerCanvas.height = document.querySelector('.footer-premium').offsetHeight;
});
```

---

## **8. MOBILE OPTIMIZATION** 📱

```css
/* COMPLETE MOBILE RESPONSIVE STYLES */

/* Mobile-First Approach */
@media (max-width: 480px) {
  /* Typography Scaling */
  html {
    font-size: 14px;
  }
  
  /* Hero Section */
  .hero-enhanced {
    min-height: 100svh; /* Safari mobile fix */
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .stat-card {
    padding: 1.5rem;
  }
  
  /* CTA Buttons */
  .cta-group {
    flex-direction: column;
    width: 100%;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
  
  /* Friend Grid */
  .friend-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
  
  .friend-card {
    max-width: 100%;
  }
  
  /* 3D Carousel */
  .carousel-3d {
    height: 300px;
  }
  
  .carousel-item {
    width: 250px;
    height: 350px;
  }
  
  /* Feature Cards */
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
  
  /* Brick Wall */
  .brick-wall-3d {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .brick {
    aspect-ratio: 3/1;
  }
  
  /* Footer */
  .footer-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-social {
    justify-content: flex-start;
  }
}

/* Tablet */
@media (min-width: 481px) and (max-width: 768px) {
  .friend-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .brick-wall-3d {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Touch Optimizations */
@media (hover: none) and (pointer: coarse) {
  /* Larger touch targets */
  .nav-link,
  .btn-primary,
  .btn-secondary,
  .card-action {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Disable hover effects on touch devices */
  .friend-card:hover,
  .feature-card:hover {
    transform: none;
  }
  
  /* Enable tap highlights */
  .friend-card,
  .feature-card,
  .brick {
    -webkit-tap-highlight-color: rgba(102, 126, 234, 0.2);
  }
}

/* Landscape Mobile */
@media (max-width: 896px) and (orientation: landscape) {
  .hero-enhanced {
    min-height: 150vh;
  }
  
  .stats-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

**Would you like me to also create:**
1. **Loading Screen Animation**
2. **Scroll Progress Indicator**
4. **Offline Mode Support**
5. **PWA Configuration**
6. **Performance Optimization 