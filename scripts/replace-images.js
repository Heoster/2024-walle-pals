const fs = require('fs');
const path = require('path');

// Define the assets directories
const assetsDirs = [
  'assets/school',
  'assets/memories',
  'assets/pasandu',
  'assets/images'
];

// Get all image files from assets directories
function getAllImages() {
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

// Replace placeholder images in HTML files
function replaceImagesInFile(filePath, images) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace memory-placeholder divs with actual images
  const placeholderRegex = /<div class="memory-placeholder">[\s\S]*?<\/div>\s*<\/div>\s*<h3>/g;
  let match;
  let imageIndex = 0;
  const replacements = [];
  
  // Find all matches first
  while ((match = placeholderRegex.exec(content)) !== null) {
    const image = images[imageIndex % images.length];
    imageIndex++;
    
    // Extract the full match and find the closing </div> and <h3> tags
    const fullMatch = match[0];
    const h3Index = fullMatch.lastIndexOf('</div>') + 6;
    const beforeH3 = fullMatch.substring(0, h3Index);
    const afterH3 = fullMatch.substring(h3Index);
    
    // Create image tag to replace placeholder
    const imageTag = `<div class="memory-placeholder">
                            <img src="${image}" alt="Memory Image" loading="lazy" class="memory-img">
                          </div>
                        </div>
                        <h3>`;
    
    replacements.push({
      start: match.index,
      end: match.index + fullMatch.length,
      replacement: imageTag
    });
  }
  
  // Apply replacements in reverse order
  for (let i = replacements.length - 1; i >= 0; i--) {
    const { start, end, replacement } = replacements[i];
    content = content.substring(0, start) + replacement + content.substring(end);
  }
  
  // For friend pages, add profile image if not exists
  if (filePath.includes('/friends/')) {
    const hasProfileImage = /<div class="friend-image-container">/.test(content);
    if (!hasProfileImage) {
      const friendName = path.basename(filePath, '.html');
      const profileImageTag = `<div class="friend-image-container">
                <img src="assets/memories/${friendName}.jpg" alt="${friendName}" class="friend-profile-image" onerror="this.src='assets/images/WhatsApp Image 2025-08-15 at 23.07.33_7b301933.jpg'">
              </div>`;
      
      // Insert after the friend-intro opening div
      content = content.replace(
        /<div class="friend-intro animate-fade-in-up">/,
        `${profileImageTag}\n                <div class="friend-intro animate-fade-in-up">`
      );
    }
  }
  
  // Save the updated content
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated images in ${filePath}`);
}

// Process all friend pages
function processFriendPages(images) {
  const friendsDir = path.join(__dirname, '../friends');
  if (fs.existsSync(friendsDir)) {
    const files = fs.readdirSync(friendsDir);
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const filePath = path.join(friendsDir, file);
        replaceImagesInFile(filePath, images);
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
    replaceImagesInFile(filePath, images);
  });
}

// Add CSS for memory images
function addMemoryImageCSS() {
  const cssFilePath = path.join(__dirname, '../css/main.css');
  if (fs.existsSync(cssFilePath)) {
    let cssContent = fs.readFileSync(cssFilePath, 'utf8');
    
    // Check if the CSS already exists
    if (!cssContent.includes('.memory-img')) {
      const memoryImgCSS = `
/* Memory Image Styles */
.memory-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: var(--border-radius);
  transition: transform var(--animation-normal) var(--animation-easing);
}

.memory-placeholder:hover .memory-img {
  transform: scale(1.05);
}

.memory-card .memory-placeholder {
  width: 100%;
  height: 100px;
  overflow: hidden;
  border-radius: var(--border-radius);
  margin-bottom: var(--space-md);
  background: var(--white);
  box-shadow: 0 2px 8px var(--shadow-light);
}

[data-theme="dark"] .memory-card .memory-placeholder {
  background: var(--dark-card-bg);
  box-shadow: 0 2px 8px var(--shadow-heavy);
}`;
      
      // Add the CSS at the end of the file
      cssContent += memoryImgCSS;
      fs.writeFileSync(cssFilePath, cssContent, 'utf8');
      console.log('Added memory image CSS styles');
    }
  }
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
  
  console.log('Adding memory image CSS styles...');
  addMemoryImageCSS();
  
  console.log('Processing friend pages...');
  processFriendPages(images);
  
  console.log('Processing main pages...');
  processMainPages(images);
  
  console.log('Image replacement completed!');
}

// Run the script
main();