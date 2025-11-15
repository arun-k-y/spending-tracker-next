// Simple script to generate placeholder PWA icons
// Run with: node scripts/generate-icons.js

const fs = require('fs');
const path = require('path');

// Create SVG content
const createSVG = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">₹</text>
</svg>`;

const iconsDir = path.join(__dirname, '../public/icons');

// Ensure directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons (as placeholders)
const sizes = [192, 512];

sizes.forEach(size => {
  const svgContent = createSVG(size);
  const fileName = `icon-${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, fileName), svgContent);
  console.log(`✓ Created ${fileName}`);
});

console.log('\n📱 SVG icons created successfully!');
console.log('\n⚠️  Note: For production, convert these SVG files to PNG:');
console.log('   Option 1: Use an online converter like https://cloudconvert.com/svg-to-png');
console.log('   Option 2: Use imagemagick: convert icon-192.svg icon-192.png');
console.log('   Option 3: Use https://realfavicongenerator.net/ for complete favicon package');
console.log('\n   Then replace the .svg files with .png files in public/icons/');

