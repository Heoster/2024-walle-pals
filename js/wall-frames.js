// Friends data with all friends
const friends = [
  { name: 'Harsh', description: 'The adventurous spirit', image: 'assets/school/gallery1.jpg' },
  { name: 'Parduman', description: 'Always ready to help', image: 'assets/school/gallery2.jpg' },
  { name: 'Kartik', description: 'The creative genius', image: 'assets/school/gallery3.jpg' },
  { name: 'Pankaj', description: 'Master of good vibes', image: 'assets/school/gallery4.jpg' },
  { name: 'Lakshay', description: 'The loyal companion', image: 'assets/school/gallery5.jpg' },
  { name: 'Pasandu', description: 'The gentle soul', image: 'assets/school/gallery6.jpg' },
  { name: 'Vishesh', description: 'The wise counselor', image: 'assets/school/gallery7.jpg' },
  { name: 'Sahil', description: 'Always up for fun', image: 'assets/school/gallery8.jpg' },
  { name: 'Tushar', description: 'The problem solver', image: 'assets/school/gallery9.jpg' },
  { name: 'Yougank', description: 'Full of surprises', image: 'assets/school/gallery10.jpg' },
  { name: 'Masum', description: 'The gentle soul', image: 'assets/school/gallery11.jpg' },
  { name: 'Shiv', description: 'Strength and kindness', image: 'assets/school/gallery12.jpg' },
  { name: 'Arijit', description: 'The music lover', image: 'assets/school/gallery13.jpg' },
  { name: 'Pintu', description: 'Always positive', image: 'assets/school/gallery14.jpg' },
  { name: 'Ayush', description: 'The energetic one', image: 'assets/school/gallery15.jpg' },
  { name: 'Shivaji', description: 'Natural born leader', image: 'assets/school/gallery16.jpg' },
  { name: 'Sachin', description: 'The sports enthusiast', image: 'assets/school/gallery17.jpg' },
  { name: 'Varun', description: 'Quick wit and humor', image: 'assets/school/gallery18.jpg' },
  { name: 'Hani', description: 'The thoughtful friend', image: 'assets/school/gallery19.jpg' },
  { name: 'Anshul', description: 'Always encouraging', image: 'assets/school/gallery20.jpg' },
  { name: 'Abhishek', description: 'The reliable one', image: 'assets/school/gallery21.jpg' },
  { name: 'Arjun', description: 'Focused and determined', image: 'assets/school/gallery22.jpg' },
  { name: 'Dheraj', description: 'The peacemaker', image: 'assets/school/gallery23.jpg' },
  { name: 'Rajat', description: 'Full of ideas', image: 'assets/school/gallery24.jpg' },
  { name: 'Aditya', description: 'The curious mind', image: 'assets/school/gallery25.jpg' },
  { name: 'Rudra', description: 'Bold and fearless', image: 'assets/school/gallery26.jpg' },
  { name: 'Mudashir', description: 'The storyteller', image: 'assets/school/gallery27.jpg' },
  { name: 'Ravi', description: 'Brings light to darkness', image: 'assets/school/gallery28.jpg' },
  { name: 'Aashish', description: 'The optimistic dreamer', image: 'assets/school/gallery29.jpg' },
  { name: 'Rijwaan', description: 'The caring heart', image: 'assets/school/gallery30.jpg' }
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

// Create friend frame HTML
function createFriendFrame(friend, index) {
  const initials = getInitials(friend.name);
  const gradientClass = getGradientClass(index);
  const friendSlug = friend.name.toLowerCase().replace(/\s+/g, '-');
  
  return `
    <a href="friends/${friendSlug}.html" class="friend-frame ${gradientClass} reveal-scale stagger-${(index % 18) + 1}" data-friend="${friendSlug}">
      <div class="friend-avatar">
        <img src="${friend.image}" alt="${friend.name}" class="friend-photo" loading="lazy">
        <div class="friend-initials">${initials}</div>
      </div>
      <h3 class="friend-name">${friend.name}</h3>
      <p class="friend-description">${friend.description}</p>
    </a>
  `;
}

// Initialize wall of frames
function initializeWallOfFrames() {
  const wallContainer = document.querySelector('.wall-of-frames');
  
  if (!wallContainer) {
    console.warn('Wall of frames container not found');
    return;
  }
  
  // Generate HTML for all friends
  const framesHTML = friends.map((friend, index) => createFriendFrame(friend, index)).join('');
  
  // Insert frames into container
  wallContainer.innerHTML = framesHTML;
  
  // Add click event listeners for analytics/tracking if needed
  const frameElements = wallContainer.querySelectorAll('.friend-frame');
  frameElements.forEach((frame, index) => {
    frame.addEventListener('click', (e) => {
      const friendName = friends[index].name;
      console.log(`Navigating to ${friendName}'s page`);
      
      // Add loading state
      frame.classList.add('loading');
      
      // Optional: Add custom navigation logic here
      // For now, let the default link behavior handle navigation
    });
    
    // Add keyboard navigation support
    frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        frame.click();
      }
    });
  });
  
  console.log(`Wall of frames initialized with ${friends.length} friends`);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWallOfFrames);

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { friends, initializeWallOfFrames };
}