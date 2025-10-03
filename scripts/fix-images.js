const fs = require('fs');
const path = require('path');

// Get all image files from assets directories
function getAllImages() {
  const assetsDirs = [
    'assets/school',
    'assets/memories',
    'assets/pasandu',
    'assets/images'
  ];
  
  const images = [];
  
  assetsDirs.forEach(dir => {
    const dirPath = path.join(__dirname, '../', dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        if (file.match(/\.(jpg|jpeg|png|gif)$/i)) {
          images.push(path.join(dir, file).replace(/\\/g, '/'));
        }
      });
    }
  });
  
  return images;
}

// Fix memory card structure in friend pages
function fixMemoryCards(filePath, images) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let imageIndex = 0;
  
  // Fix the memory card structure
  const memoryCardRegex = /<div class="memory-card([\s\S]*?)<div class="memory-placeholder">[\s\S]*?<\/div>\s*<\/div>\s*<h3>([\s\S]*?)<\/div>\s*<\/div>/g;
  
  let match;
  const replacements = [];
  
  while ((match = memoryCardRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const cardClasses = match[1];
    const restOfCard = match[2];
    const image = images[imageIndex % images.length];
    imageIndex++;
    
    // Create the corrected memory card
    const correctedCard = `<div class="memory-card${cardClasses}<div class="memory-placeholder">
                            <img src="${image}" alt="Memory Image" loading="lazy" class="memory-img">
                          </div>
                        <h3>${restOfCard}</div>
                      </div>`;
    
    replacements.push({
      start: match.index,
      end: match.index + fullMatch.length,
      replacement: correctedCard
    });
  }
  
  // Apply replacements in reverse order
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { start, end, replacement } = replacements[i];
    content = content.substring(0, start) + replacement + content.substring(end);
  }
  
  // Add friend profile image if not exists
  if (filePath.includes('/friends/')) {
    const hasProfileImage = /<div class="friend-image-container">/.test(content);
    if (!hasProfileImage) {
      const friendName = path.basename(filePath, '.html');
      const profileImageTag = `<div class="friend-image-container">
                <img src="assets/memories/${friendName}.jpg" alt="${friendName}" class="friend-profile-image" onerror="this.src='assets/images/WhatsApp Image 2025-08-15 at 23.07.33_7b301933.jpg'">
              </div>`;
      
      content = content.replace(
        /<div class="friend-intro animate-fade-in-up">/,
        `${profileImageTag}\n                <div class="friend-intro animate-fade-in-up">`
      );
    }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Fixed images in ${filePath}`);
}

// Process all friend pages
function processFriendPages(images) {
  const friendsDir = path.join(__dirname, '../friends');
  if (fs.existsSync(friendsDir)) {
    const files = fs.readdirSync(friendsDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const filePath = path.join(friendsDir, file);
        fixMemoryCards(filePath, images);
      }
    });
  }
}

// Process main pages
function processMainPages(images) {
  const mainPages = [
    'index.html',
    'gallery.html',
    'memories.html',
    'contact.html',
    'brick-wall.html'
  ];
  
  mainPages.forEach(page => {
    const filePath = path.join(__dirname, '../', page);
    fixMemoryCards(filePath, images);
  });
}

// Main function
function main() {
  console.log('Collecting images from assets directories...');
  const images = getAllImages();
  
  if (images.length === 0) {
    console.log('No images found in assets directories');
    return;
  }
  
  console.log(`Found ${images.length} images`);
  
  console.log('Processing friend pages...');
  processFriendPages(images);
  
  console.log('Processing main pages...');
  processMainPages(images);
  
  console.log('Image fixing completed!');
}

main();