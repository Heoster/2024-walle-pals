// Instagram Animation Controller
class InstagramAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupClickTracking();
    }

    setupScrollAnimations() {
        // Animate Instagram section when it comes into view
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation to button
                    const button = entry.target.querySelector('.instagram-button');
                    if (button) {
                        setTimeout(() => {
                            button.style.animation = 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both';
                        }, 200);
                    }
                }
            });
        }, observerOptions);

        // Observe Instagram sections
        const instagramSections = document.querySelectorAll('.instagram-section');
        instagramSections.forEach(section => observer.observe(section));
    }

    setupHoverEffects() {
        const instagramButtons = document.querySelectorAll('.instagram-button');
        
        instagramButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                // Add floating hearts effect
                this.createFloatingHearts(button);
            });
        });
    }

    createFloatingHearts(button) {
        const hearts = ['💖', '📸', '🌟', '💫', '✨'];
        const buttonRect = button.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.cssText = `
                    position: fixed;
                    left: ${buttonRect.left + Math.random() * buttonRect.width}px;
                    top: ${buttonRect.top + Math.random() * buttonRect.height}px;
                    font-size: 1.5rem;
                    pointer-events: none;
                    z-index: 1000;
                    animation: float-up 2s ease-out forwards;
                `;
                
                document.body.appendChild(heart);
                
                // Remove after animation
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 2000);
            }, i * 200);
        }
    }

    setupClickTracking() {
        const instagramButtons = document.querySelectorAll('a.instagram-button');
        
        instagramButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add click animation
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 150);
                
                // Optional: Track click for analytics
                const handle = button.querySelector('span').textContent;
                });
        });
    }
}

// Add floating animation CSS
const floatingCSS = `
@keyframes float-up {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-100px) scale(1.5);
    }
}
`;

// Add CSS to document
const styleSheet = document.createElement('style');
styleSheet.textContent = floatingCSS;
document.head.appendChild(styleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InstagramAnimations();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InstagramAnimations;
}
