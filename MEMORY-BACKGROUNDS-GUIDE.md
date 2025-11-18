# Memory Backgrounds Feature Guide 🖼️

## Overview
Your app now displays random memory images as subtle backgrounds throughout the entire UI, creating an immersive and personalized experience.

## Features Implemented

### 1. **Random Background Rotation**
- Automatically rotates through all 33 memory images
- Changes every 8 seconds
- Smooth fade transitions between images
- Very subtle opacity (8%) to maintain text readability

### 2. **Smart Overlay System**
- Semi-transparent white overlay (92% opacity) ensures all text remains readable
- Gradient overlay for better visual hierarchy
- Dark mode support with adjusted overlay colors

### 3. **Background Pattern**
- Subtle animated gradient pattern underneath
- Adds depth without being distracting
- Animates smoothly over 20 seconds

### 4. **Memory Indicator**
- Floating indicator in bottom-right corner
- Shows current image number (e.g., "5 / 33")
- Pulsing dot animation
- Responsive - hides on mobile devices

### 5. **Performance Optimized**
- Uses CSS animations for smooth transitions
- Preloads images after 2 seconds
- Efficient DOM structure with only 2 background items
- RequestAnimationFrame for scroll-based opacity adjustments

## How It Works

### CSS (`css/memory-backgrounds.css`)
- Fixed positioning for background containers
- Smooth fade animations
- Responsive adjustments for different screen sizes
- Dark mode support

### JavaScript (`js/memory-backgrounds.js`)
- Manages image rotation
- Handles transitions
- Preloads images for better performance
- Updates memory counter
- Adjusts opacity based on scroll position

## Customization

### Change Rotation Speed
```javascript
// In browser console or code
window.memoryBackgrounds.setRotationSpeed(5000); // 5 seconds
```

### Get Current Background Image
```javascript
window.memoryBackgrounds.getCurrentImage();
```

### Manually Rotate Image
```javascript
window.memoryBackgrounds.rotateImage();
```

### Adjust Background Opacity
Edit `css/memory-backgrounds.css`:
```css
.memory-bg-item.active {
  opacity: 0.08; /* Change this value (0-1) */
}
```

### Adjust Overlay Opacity
Edit `css/memory-backgrounds.css`:
```css
.memory-bg-overlay {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.92) 0%, /* Adjust these values */
    rgba(255, 255, 255, 0.88) 50%,
    rgba(255, 255, 255, 0.92) 100%
  );
}
```

## Memory Images Used
All 33 images from `assets/memories/` folder:
- memories1.jpg through memories35.jpg (excluding 24 & 27)

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Performance Impact
- Minimal - uses CSS animations and efficient DOM structure
- Images preloaded after 2 seconds
- No impact on page load time
- Smooth 60fps animations

## Accessibility
- Text remains readable with high contrast overlay
- Respects `prefers-reduced-motion` setting
- Memory indicator hidden on small screens
- Proper z-index layering

## Dark Mode
- Automatically adjusts overlay colors for dark theme
- Pattern opacity increases for visibility
- Maintains readability in both themes

## Troubleshooting

### Images not showing?
1. Check browser console for errors
2. Verify image paths in `js/memory-backgrounds.js`
3. Ensure images exist in `assets/memories/` folder

### Background too bright/dark?
- Adjust opacity values in CSS
- Modify overlay gradient values

### Performance issues?
- Reduce rotation speed
- Disable on mobile devices
- Adjust preload timing

## Future Enhancements
1. Add user preference to disable backgrounds
2. Allow custom image selection
3. Add parallax effect
4. Implement image caching
5. Add blur effect option
6. Create seasonal themes

---

**Status**: ✅ Active and Running
**Last Updated**: 2024
