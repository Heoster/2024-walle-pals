// Enhanced Friend Gallery JavaScript
class FriendGalleryEnhanced {
    constructor() {
        this.init();
    }

    init() {
        this.setupGalleryAnimations();
        this.setupImageModal();
        this.setupLazyLoading();
        this.setupGalleryFilters();
    }

    setupGalleryAnimations() {
        // Enhanced scroll-triggered animations for gallery items
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Add staggered animation for gallery items
                    const galleryItems = entry.target.querySelectorAll('.gallery-item');
                    galleryItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe gallery sections
        const gallerySections = document.querySelectorAll('.pasandu-gallery, .friend-quotes');
        gallerySections.forEach(section => observer.observe(section));

        // Observe individual gallery items
        const galleryItems = document.querySelectorAll('.gallery-item, .quote-card');
        galleryItems.forEach(item => observer.observe(item));
    }

    setupImageModal() {
        // Create modal for full-size image viewing
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop">
                <div class="modal-content">
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                    <img class="modal-image" src="" alt="">
                    <div class="modal-info">
                        <h3 class="modal-title"></h3>
                        <p class="modal-description"></p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add modal styles
        const modalStyles = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .image-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-backdrop {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .modal-content {
                position: relative;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                z-index: 1001;
                transition: background 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(0, 0, 0, 0.9);
            }
            
            .modal-image {
                max-width: 80vw;
                max-height: 70vh;
                object-fit: contain;
            }
            
            .modal-info {
                padding: 20px;
                text-align: center;
            }
            
            .modal-title {
                margin: 0 0 10px 0;
                color: #333;
            }
            
            .modal-description {
                margin: 0;
                color: #666;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);

        // Add click handlers for gallery images
        const galleryImages = document.querySelectorAll('.gallery-item img');
        galleryImages.forEach(img => {
            img.addEventListener('click', (e) => {
                const galleryItem = e.target.closest('.gallery-item');
                const overlayContent = galleryItem.querySelector('.overlay-content');
                
                const modalImg = modal.querySelector('.modal-image');
                const modalTitle = modal.querySelector('.modal-title');
                const modalDesc = modal.querySelector('.modal-description');
                
                modalImg.src = e.target.src;
                modalImg.alt = e.target.alt;
                
                if (overlayContent) {
                    modalTitle.textContent = overlayContent.querySelector('h4').textContent;
                    modalDesc.textContent = overlayContent.querySelector('p').textContent;
                }
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal handlers
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    setupLazyLoading() {
        // Enhanced lazy loading for gallery images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('loading');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            // Observe images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupGalleryFilters() {
        // Add smooth hover effects and interactions
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Add subtle animation to other items
                galleryItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.style.opacity = '0.7';
                        otherItem.style.transform = 'scale(0.95)';
                    }
                });
            });

            item.addEventListener('mouseleave', () => {
                // Reset all items
                galleryItems.forEach(otherItem => {
                    otherItem.style.opacity = '';
                    otherItem.style.transform = '';
                });
            });
        });
    }

    // Method to add new gallery items dynamically
    addGalleryItem(imageSrc, title, description) {
        const galleryGrid = document.querySelector('.gallery-grid-enhanced');
        if (!galleryGrid) return;

        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item reveal-scale';
        galleryItem.innerHTML = `
            <div class="gallery-image">
                <img src="${imageSrc}" alt="${title}" loading="lazy">
                <div class="image-overlay">
                    <div class="overlay-content">
                        <h4>${title}</h4>
                        <p>${description}</p>
                    </div>
                </div>
            </div>
        `;

        galleryGrid.appendChild(galleryItem);
        
        // Trigger animation
        setTimeout(() => {
            galleryItem.classList.add('active');
        }, 100);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FriendGalleryEnhanced();
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FriendGalleryEnhanced;
}
