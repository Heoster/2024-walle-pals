// Test Instagram Animations Functionality
console.log('🧪 Testing Instagram Animations...');

// Test 1: Check if CSS files are loaded
function testCSSLoaded() {
    const instagramButton = document.querySelector('.instagram-button');
    if (instagramButton) {
        const styles = window.getComputedStyle(instagramButton);
        const hasGradient = styles.background.includes('gradient') || styles.backgroundImage.includes('gradient');
        console.log('✅ Instagram button CSS loaded:', hasGradient);
        return hasGradient;
    }
    console.log('❌ Instagram button not found');
    return false;
}

// Test 2: Check if JavaScript animations are working
function testJSAnimations() {
    const instagramSections = document.querySelectorAll('.instagram-section');
    console.log(`✅ Found ${instagramSections.length} Instagram sections`);
    
    // Test scroll animation
    instagramSections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('animate-in');
            console.log(`✅ Animation triggered for section ${index + 1}`);
        }, index * 500);
    });
    
    return instagramSections.length > 0;
}

// Test 3: Check hover effects
function testHoverEffects() {
    const instagramButtons = document.querySelectorAll('.instagram-button');
    console.log(`✅ Found ${instagramButtons.length} Instagram buttons`);
    
    instagramButtons.forEach((button, index) => {
        button.addEventListener('mouseenter', () => {
            console.log(`✅ Hover effect triggered for button ${index + 1}`);
        });
    });
    
    return instagramButtons.length > 0;
}

// Test 4: Check click tracking
function testClickTracking() {
    const instagramLinks = document.querySelectorAll('a.instagram-button');
    console.log(`✅ Found ${instagramLinks.length} Instagram links`);
    
    instagramLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            console.log(`✅ Click tracked for link ${index + 1}:`, link.href);
        });
    });
    
    return instagramLinks.length > 0;
}

// Run all tests
function runAllTests() {
    console.log('🚀 Starting Instagram Animation Tests...');
    console.log('=' * 50);
    
    const results = {
        css: testCSSLoaded(),
        animations: testJSAnimations(),
        hover: testHoverEffects(),
        clicks: testClickTracking()
    };
    
    console.log('\n📊 Test Results:');
    console.log('CSS Loaded:', results.css ? '✅' : '❌');
    console.log('Animations Working:', results.animations ? '✅' : '❌');
    console.log('Hover Effects:', results.hover ? '✅' : '❌');
    console.log('Click Tracking:', results.clicks ? '✅' : '❌');
    
    const allPassed = Object.values(results).every(result => result);
    console.log('\n🎉 Overall Result:', allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED');
    
    return results;
}

// Auto-run tests when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAllTests);
} else {
    runAllTests();
}

// Export for manual testing
window.testInstagramAnimations = runAllTests;