#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Walle Pals Node.js environment...\n');

// Create necessary directories
const directories = [
  'dist',
  'dist/css',
  'dist/js',
  'data',
  'tests',
  'logs'
];

directories.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  } else {
    console.log(`📁 Directory exists: ${dir}`);
  }
});

// Check if .env exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env file not found. Please create one based on .env.example');
} else {
  console.log('✅ .env file found');
}

// Check if friends data exists
const friendsDataPath = path.join(__dirname, '..', 'data', 'friends.json');
if (!fs.existsSync(friendsDataPath)) {
  console.log('⚠️  Friends data not found. Run "npm run generate:friends" to create it.');
} else {
  console.log('✅ Friends data found');
}

console.log('\n🎉 Setup complete! Run "npm run dev" to start the development server.');
console.log('📖 Visit http://localhost:3000 to view your website.\n');