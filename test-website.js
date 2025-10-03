// Simple test script to verify website functionality
console.log('🚀 Testing 2024 Walle Pals Website');

// Test 1: Check if all images exist
const imageTests = [];
for (let i = 1; i <= 37; i++) {
  const img = new Image();
  img.onload = () => console.log(`✅ Image ${i} loaded successfully`);
  img.onerror = () => console.log(`❌ Image ${i} failed to load`);
  img.src = `assets/school/gallery${i}.jpg`;
  imageTests.push(img);
}

// Test 2: Check navigation functionality
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔍 Testing navigation...');
  
  const navLinks = document.querySelectorAll('.nav-link');
  console.log(`Found ${navLinks.length} navigation links`);
  
  const mobileToggle = document.querySelector('.nav-toggle');
  if (mobileToggle) {
    console.log('✅ Mobile navigation toggle found');
  } else {
    console.log('❌ Mobile navigation toggle not found');
  }
  
  // Test 3: Check if wall of frames is generated
  const wallContainer = document.querySelector('.wall-of-frames');
  if (wallContainer) {
    setTimeout(() => {
      const friendFrames = wallContainer.querySelectorAll('.friend-frame');
      console.log(`✅ Generated ${friendFrames.length} friend frames`);
      
      if (friendFrames.length === 30) {
        console.log('✅ All 30 friends loaded correctly');
      } else {
        console.log(`⚠️ Expected 30 friends, got ${friendFrames.length}`);
      }
    }, 1000);
  }
  
  // Test 4: Check responsive design
  const testResponsive = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      console.log('📱 Mobile view detected');
    } else if (width <= 1024) {
      console.log('📱 Tablet view detected');
    } else {
      console.log('🖥️ Desktop view detected');
    }
  };
  
  testResponsive();
  window.addEventListener('resize', testResponsive);
  
  // Test 5: Check animations
  const animatedElements = document.querySelectorAll('[class*="animate-"], .reveal-scale, .reveal-left, .reveal-right');
  console.log(`🎬 Found ${animatedElements.length} animated elements`);
  
  console.log('✅ Website tests completed!');
});

// Export test results
window.walleTestResults = {
  totalImages: 37,
  totalFriends: 30,
  testsPassed: 0,
  testsFailed: 0
};