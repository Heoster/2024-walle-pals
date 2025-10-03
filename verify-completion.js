// Verification script to ensure all components are complete
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying 2024 Walle Pals Website Completion...\n');

// Check main files
const mainFiles = [
    'index.html',
    'memories.html',
    'gallery.html',
    'brick-wall.html',
    'README.md',
    'generate-friends.js'
];

console.log('📄 Main Files:');
mainFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
    }
});

// Check CSS files
const cssFiles = [
    'css/main.css',
    'css/animations.css',
    'css/wall-of-frames.css',
    'css/candle-animations.css',
    'css/memories.css',
    'css/gallery.css',
    'css/responsive.css'
];

console.log('\n🎨 CSS Files:');
cssFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
    }
});

// Check JavaScript files
const jsFiles = [
    'js/main.js',
    'js/wall-frames.js',
    'js/animations.js',
    'js/gallery.js'
];

console.log('\n⚡ JavaScript Files:');
jsFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
    }
});

// Check all 30 friend pages
const friends = [
    'harsh', 'parduman', 'kartik', 'pankaj', 'lakshay', 'pasandu', 'vishesh', 'sahil', 'tushar', 'yougank',
    'masum', 'shiv', 'arijit', 'pintu', 'ayush', 'shivaji', 'sachin', 'varun', 'hani', 'anshul',
    'abhishek', 'arjun', 'dheraj', 'rajat', 'aditya', 'rudra', 'mudashir', 'ravi', 'aashish', 'rijwaan'
];

console.log('\n👥 Friend Pages (30 total):');
let friendCount = 0;
friends.forEach(friend => {
    const filename = `friends/${friend}.html`;
    if (fs.existsSync(filename)) {
        friendCount++;
        console.log(`✅ ${filename}`);
    } else {
        console.log(`❌ ${filename} - MISSING`);
    }
});

// Check directories
const directories = ['css', 'js', 'friends', 'assets', 'assets/images'];

console.log('\n📁 Directories:');
directories.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`✅ ${dir}/`);
    } else {
        console.log(`❌ ${dir}/ - MISSING`);
    }
});

// Summary
console.log('\n📊 COMPLETION SUMMARY:');
console.log(`✅ Main Files: ${mainFiles.filter(f => fs.existsSync(f)).length}/${mainFiles.length}`);
console.log(`✅ CSS Files: ${cssFiles.filter(f => fs.existsSync(f)).length}/${cssFiles.length}`);
console.log(`✅ JS Files: ${jsFiles.filter(f => fs.existsSync(f)).length}/${jsFiles.length}`);
console.log(`✅ Friend Pages: ${friendCount}/${friends.length}`);
console.log(`✅ Directories: ${directories.filter(d => fs.existsSync(d)).length}/${directories.length}`);

const totalExpected = mainFiles.length + cssFiles.length + jsFiles.length + friends.length + directories.length;
const totalFound = mainFiles.filter(f => fs.existsSync(f)).length + 
                  cssFiles.filter(f => fs.existsSync(f)).length + 
                  jsFiles.filter(f => fs.existsSync(f)).length + 
                  friendCount + 
                  directories.filter(d => fs.existsSync(d)).length;

console.log(`\n🎯 OVERALL COMPLETION: ${totalFound}/${totalExpected} (${Math.round((totalFound/totalExpected)*100)}%)`);

if (totalFound === totalExpected) {
    console.log('\n🎉 WEBSITE IS COMPLETE! 🎉');
    console.log('🚀 Ready to launch! Open index.html in your browser.');
} else {
    console.log('\n⚠️  Some files are missing. Please check the above list.');
}

console.log('\n📝 Next Steps:');
console.log('1. Open index.html in your browser (main entry point)');
console.log('2. Test the wall of frames by clicking on friend cards');
console.log('3. Visit the memories page to see the timeline');
console.log('4. Explore the gallery with public and private sections');
console.log('5. Check individual friend pages for unique animations');
console.log('\n✨ Enjoy your beautiful 2024 Walle Pals website! ✨');