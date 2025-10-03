const fs = require('fs');
const path = require('path');

// Fix image paths in all HTML files
function fixImagePaths() {
  // Process all HTML files in the project
  const processDirectory = (dirPath) => {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Recursively process subdirectories
        processDirectory(filePath);
      } else if (file.endsWith('.html')) {
        // Process HTML files
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix the typo in the image path
        content = content.replace(/gallary10\.jpg/g, 'gallery10.jpg');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed image paths in ${filePath}`);
      }
    });
  };
  
  // Start processing from the root directory
  processDirectory(path.join(__dirname, '../'));
}

// Run the fix
fixImagePaths();
console.log('Image path fixing completed!');