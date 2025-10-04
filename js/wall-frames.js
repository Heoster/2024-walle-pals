// Friends data with proper image mapping and fallbacks
const friends = [
  { name: 'Harsh', description: 'The adventurous spirit', image: 'assets/school/harsh.jpg', fallback: 'assets/school/gallery1.jpg' },
  { name: 'Parduman', description: 'Always ready to help', image: 'assets/school/gallery2.jpg', fallback: 'assets/school/gallery2.jpg' },
  { name: 'Kartik', description: 'The creative genius', image: 'assets/school/kartik.jpg', fallback: 'assets/school/gallery3.jpg' },
  { name: 'Pankaj', description: 'Master of good vibes', image: 'assets/school/pankaj.jpg', fallback: 'assets/school/gallery4.jpg' },
  { name: 'Lakshay', description: 'The loyal companion', image: 'assets/school/gallery5.jpg', fallback: 'assets/school/gallery5.jpg' },
  { name: 'Pasandu', description: 'The gentle soul', image: 'assets/school/pasandu (1).jpg', fallback: 'assets/school/gallery6.jpg' },
  { name: 'Vishesh', description: 'The wise counselor', image: 'assets/school/vishesh.jpg', fallback: 'assets/school/gallery7.jpg' },
  { name: 'Sahil', description: 'Always up for fun', image: 'assets/school/sahil.jpg', fallback: 'assets/school/gallery8.jpg' },
  { name: 'Tushar', description: 'The problem solver', image: 'assets/school/gallery9.jpg', fallback: 'assets/school/gallery9.jpg' },
  { name: 'Yougank', description: 'Full of surprises', image: 'assets/school/gallery10.jpg', fallback: 'assets/school/gallery10.jpg' },
  { name: 'Masum', description: 'The gentle soul', image: 'assets/school/gallery11.jpg', fallback: 'assets/school/gallery11.jpg' },
  { name: 'Shiv', description: 'Strength and kindness', image: 'assets/school/gallery12.jpg', fallback: 'assets/school/gallery12.jpg' },
  { name: 'Arijit', description: 'The music lover', image: 'assets/school/gallery13.jpg', fallback: 'assets/school/gallery13.jpg' },
  { name: 'Pintu', description: 'Always positive', image: 'assets/school/gallery14.jpg', fallback: 'assets/school/gallery14.jpg' },
  { name: 'Ayush', description: 'The energetic one', image: 'assets/school/gallery15.jpg', fallback: 'assets/school/gallery15.jpg' },
  { name: 'Shivaji', description: 'Natural born leader', image: 'assets/school/gallery16.jpg', fallback: 'assets/school/gallery16.jpg' },
  { name: 'Sachin', description: 'The sports enthusiast', image: 'assets/school/gallery17.jpg', fallback: 'assets/school/gallery17.jpg' },
  { name: 'Varun', description: 'Quick wit and humor', image: 'assets/school/gallery18.jpg', fallback: 'assets/school/gallery18.jpg' },
  { name: 'Hani', description: 'The thoughtful friend', image: 'assets/school/gallery19.jpg', fallback: 'assets/school/gallery19.jpg' },
  { name: 'Anshul', description: 'Always encouraging', image: 'assets/school/gallery20.jpg', fallback: 'assets/school/gallery20.jpg' },
  { name: 'Abhishek', description: 'The reliable one', image: 'assets/school/gallery21.jpg', fallback: 'assets/school/gallery21.jpg' },
  { name: 'Arjun', description: 'Focused and determined', image: 'assets/school/gallery22.jpg', fallback: 'assets/school/gallery22.jpg' },
  { name: 'Dheraj', description: 'The peacemaker', image: 'assets/school/gallery23.jpg', fallback: 'assets/school/gallery23.jpg' },
  { name: 'Rajat', description: 'Full of ideas', image: 'assets/school/gallery24.jpg', fallback: 'assets/school/gallery24.jpg' },
  { name: 'Aditya', description: 'The curious mind', image: 'assets/school/gallery25.jpg', fallback: 'assets/school/gallery25.jpg' },
  { name: 'Rudra', description: 'Bold and fearless', image: 'assets/school/gallery26.jpg', fallback: 'assets/school/gallery26.jpg' },
  { name: 'Mudashir', description: 'The storyteller', image: 'assets/school/mudahsir.jpg', fallback: 'assets/school/gallery27.jpg' },
  { name: 'Ravi', description: 'Brings light to darkness', image: 'assets/school/gallery28.jpg', fallback: 'assets/school/gallery28.jpg' },
  { name: 'Aashish', description: 'The optimistic dreamer', image: 'assets/school/gallery29.jpg', fallback: 'assets/school/gallery29.jpg' },
  { name: 'Rijwaan', description: 'The caring heart', image: 'assets/school/gallery30.jpg', fallback: 'assets/school/gallery30.jpg' }
];

// Generate initials from name
function getInitials(name) {
  return name.split(' ').map(word => word[0]).join('').toUpperCase();
}

// Get gradient class based on index
function getGradientClass(index) {
  const gradients = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5'];
  return gradients[index % gradients.length];
}

// Create friend frame HTML with error handling and accessibility
function createFriendFrame(friend, index) {
  try {
    const initials = getInitials(friend.name);
    const gradientClass = getGradientClass(index);
    const friendSlug = friend.name.toLowerCase().replace(/\s+/g, '-');
    
    return `
      <a href="friends/${friendSlug}.html" 
         class="friend-frame ${gradientClass} reveal-scale stagger-${(index % 18) + 1}" 
         data-friend="${friendSlug}"
         aria-label="Visit ${friend.name}'s page - ${friend.description}"
         role="button"
         tabindex="0">
        <div class="friend-avatar">
          <img src="${friend.image}" 
               alt="Photo of ${friend.name}" 
               class="friend-photo" 
               loading="lazy"
               onerror="this.onerror=null; this.src='${friend.fallback || friend.image}'; this.parentElement.classList.add('image-error');">
          <div class="friend-initials" aria-hidden="true">${initials}</div>
        </div>
        <h3 class="friend-name">${friend.name}</h3>
        <p class="friend-description">${friend.description}</p>
        <div class="loading-indicator" aria-hidden="true">
          <div class="spinner"></div>
        </div>
      </a>
    `;
  } catch (error) {
    console.error(`Error creating frame for ${friend.name}:`, error);
    return `
      <div class="friend-frame error-frame" role="alert">
        <div class="error-message">
          <h3>Unable to load ${friend.name}</h3>
          <p>Please try refreshing the page</p>
        </div>
      </div>
    `;
  }
}

// Initialize wall of frames with enhanced error handling and performance
function initializeWallOfFrames() {
  try {
    const wallContainer = document.querySelector('.wall-of-frames');
    
    if (!wallContainer) {
      console.warn('Wall of frames container not found');
      return;
    }

    // Show loading state
    wallContainer.innerHTML = '<div class="wall-loading" aria-live="polite">Loading friends...</div>';
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      try {
        // Generate HTML for all friends with error boundaries
        const framesHTML = friends.map((friend, index) => {
          try {
            return createFriendFrame(friend, index);
          } catch (error) {
            console.error(`Failed to create frame for ${friend.name}:`, error);
            return `<div class="friend-frame error-frame">Error loading ${friend.name}</div>`;
          }
        }).join('');
        
        // Insert frames into container
        wallContainer.innerHTML = framesHTML;
        
        // Setup event listeners with error handling
        setupFrameEventListeners(wallContainer);
        
        // Setup intersection observer for performance
        setupFrameObserver(wallContainer);
        
        console.log(`Wall of frames initialized with ${friends.length} friends`);
        
        // Dispatch custom event for other components
        wallContainer.dispatchEvent(new CustomEvent('wallInitialized', {
          detail: { friendCount: friends.length }
        }));
        
      } catch (error) {
        console.error('Error generating frames:', error);
        wallContainer.innerHTML = `
          <div class="error-state" role="alert">
            <h3>Unable to load friends</h3>
            <p>Please refresh the page to try again</p>
            <button onclick="initializeWallOfFrames()" class="retry-btn">Retry</button>
          </div>
        `;
      }
    });
    
  } catch (error) {
    console.error('Critical error in wall initialization:', error);
  }
}

// Setup event listeners for frames with error handling
function setupFrameEventListeners(wallContainer) {
  try {
    const frameElements = wallContainer.querySelectorAll('.friend-frame:not(.error-frame)');
    
    frameElements.forEach((frame, index) => {
      try {
        // Click handler with loading state
        frame.addEventListener('click', (e) => {
          try {
            const friendName = friends[index]?.name || 'Unknown';
            console.log(`Navigating to ${friendName}'s page`);
            
            // Add loading state
            frame.classList.add('loading');
            frame.setAttribute('aria-busy', 'true');
            
            // Remove loading state after navigation attempt
            setTimeout(() => {
              frame.classList.remove('loading');
              frame.setAttribute('aria-busy', 'false');
            }, 2000);
            
          } catch (error) {
            console.error('Error in click handler:', error);
          }
        });
        
        // Enhanced keyboard navigation
        frame.addEventListener('keydown', (e) => {
          try {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              frame.click();
            }
            // Arrow key navigation
            else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
              e.preventDefault();
              const nextFrame = frame.nextElementSibling;
              if (nextFrame && nextFrame.classList.contains('friend-frame')) {
                nextFrame.focus();
              }
            }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
              e.preventDefault();
              const prevFrame = frame.previousElementSibling;
              if (prevFrame && prevFrame.classList.contains('friend-frame')) {
                prevFrame.focus();
              }
            }
          } catch (error) {
            console.error('Error in keyboard handler:', error);
          }
        });
        
        // Focus management
        frame.addEventListener('focus', () => {
          frame.classList.add('focused');
        });
        
        frame.addEventListener('blur', () => {
          frame.classList.remove('focused');
        });
        
      } catch (error) {
        console.error(`Error setting up listeners for frame ${index}:`, error);
      }
    });
    
  } catch (error) {
    console.error('Error setting up frame event listeners:', error);
  }
}

// Setup intersection observer for performance optimization
function setupFrameObserver(wallContainer) {
  try {
    if (!('IntersectionObserver' in window)) {
      return; // Fallback for older browsers
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        try {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Preload images when frame becomes visible
            const img = entry.target.querySelector('.friend-photo');
            if (img && img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
          }
        } catch (error) {
          console.error('Error in intersection observer:', error);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
    
    const frames = wallContainer.querySelectorAll('.friend-frame');
    frames.forEach(frame => observer.observe(frame));
    
  } catch (error) {
    console.error('Error setting up intersection observer:', error);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWallOfFrames);

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { friends, initializeWallOfFrames };
}