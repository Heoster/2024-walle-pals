// Advanced Friends Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all advanced features
    initLoadingScreen();
    initScrollAnimations();
    initInteractiveElements();
    initThemeToggle();
    initBackToTop();
    initImageLazyLoading();
    initParallaxEffects();
    initSoundEffects();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Enhanced Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animations for memory cards
                if (entry.target.classList.contains('memories-grid')) {
                    const cards = entry.target.querySelectorAll('.memory-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.friend-intro, .memory-card, .stat-card, .memories-grid');
    animateElements.forEach(el => observer.observe(el));
}

// Interactive Elements
function initInteractiveElements() {
    // Character interaction
    const characters = document.querySelectorAll('.character');
    characters.forEach(character => {
        character.addEventListener('click', () => {
            character.style.animation = 'none';
            character.offsetHeight; // Trigger reflow
            character.style.animation = 'characterBounce 0.6s ease-out';
        });
    });

    // Memory card hover effects
    const memoryCards = document.querySelectorAll('.memory-card');
    memoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        });
    });

    // Stat cards counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        if (!isNaN(finalNumber)) {
            animateCounter(stat, 0, finalNumber, 2000);
        }
    });

    // Floating hearts interaction
    const floatingHearts = document.querySelectorAll('.floating-heart');
    floatingHearts.forEach(heart => {
        heart.addEventListener('click', () => {
            createHeartExplosion(heart);
        });
    });
}

// Counter Animation
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutCubic(progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Heart Explosion Effect
function createHeartExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💖';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            const angle = (i / 6) * Math.PI * 2;
            const distance = 100;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            heart.style.transform = `translate(${x}px, ${y}px) scale(0)`;
            heart.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            document.body.removeChild(heart);
        }, 1000);
    }
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add transition effect
            document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Enhanced Image Lazy Loading
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.friend-hero::before, .floating-heart');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (element.classList.contains('floating-heart')) {
                element.style.transform = `translateY(${rate * 0.2}px)`;
            }
        });
    });
}

// Sound Effects (Optional)
function initSoundEffects() {
    // Create audio context for sound effects
    let audioContext;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        return;
    }
    
    // Click sound for interactive elements
    function playClickSound() {
        if (audioContext) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    }
    
    // Add sound to interactive elements
    const interactiveElements = document.querySelectorAll('.character, .memory-card, .stat-card');
    interactiveElements.forEach(element => {
        element.addEventListener('click', playClickSound);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        // Monitor memory usage (if available)
        if (performance.memory) {
            + ' MB',
                total: Math.round(performance.memory.totalJSHeapSize / 1048576) + ' MB'
            });
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Export functions for external use
window.FriendsAdvanced = {
    animateCounter,
    createHeartExplosion,
    debounce,
    throttle
};
