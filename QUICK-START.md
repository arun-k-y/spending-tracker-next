# 🚀 Quick Start Guide

## Prerequisites

### Node.js Version

This project requires **Node.js 20.9.0 or higher** (required by Next.js 16).

**Current version detected**: Node.js 18.20.4

### Upgrade Node.js

#### Using nvm (Recommended)

```bash
# Install/update to Node.js 20
nvm install 20
nvm use 20

# Verify version
node --version  # Should show v20.x.x
```

#### Using Official Installer

Download from [nodejs.org](https://nodejs.org/) (choose LTS version 20.x.x or higher)

## Installation Steps

### 1. Ensure Correct Node Version

```bash
node --version  # Should be >= 20.9.0
```

### 2. Install Dependencies

```bash
cd /Users/arunakumar.yargol/Desktop/pwa/spending-tracker-next
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## What's Included

✅ **Mobile Spending Tracker Component**
- Full expense tracking functionality
- Category management
- Monthly filtering
- CSV export

✅ **PWA Configuration**
- Service worker for offline support
- Web app manifest
- App icons (192x192 and 512x512)
- Automatic service worker registration

✅ **Next.js Setup**
- TypeScript configured
- Tailwind CSS 4 integrated
- PWA meta tags in layout
- Optimized for production

## Testing the App

### Test in Development

```bash
npm run dev
```

Features available:
- ✅ Full app functionality
- ✅ Hot reload
- ⚠️ Service worker disabled (dev mode)

### Test PWA Features (Production Mode Required)

```bash
npm run build
npm start
```

PWA features:
- ✅ Service worker active
- ✅ Offline mode
- ✅ Install prompt
- ✅ Cached assets

### Test Offline Mode

1. Start production build: `npm run build && npm start`
2. Open Chrome DevTools (F12)
3. Go to **Application** → **Service Workers**
4. Check **"Offline"** checkbox
5. Refresh page - app should still work!

### Install as PWA

1. Open app in Chrome/Edge
2. Look for install icon (⊕) in address bar
3. Click **"Install Spending Tracker"**
4. App opens as standalone window
5. Icon added to desktop/home screen

## Project Structure

```
spending-tracker-next/
├── app/
│   ├── components/
│   │   ├── MobileSpendingTracker.tsx      # 💰 Main app
│   │   └── ServiceWorkerRegistration.tsx  # 🔧 PWA setup
│   ├── globals.css                        # 🎨 Global styles
│   ├── layout.tsx                         # 📄 Root layout
│   └── page.tsx                           # 🏠 Home page
├── public/
│   ├── icons/
│   │   ├── icon-192.png                   # 📱 Small icon
│   │   └── icon-512.png                   # 📱 Large icon
│   ├── manifest.json                      # ⚙️ PWA config
│   └── service-worker.js                  # 💾 Offline cache
├── scripts/
│   └── generate-png-icons.mjs             # 🎨 Icon generator
├── README.md                              # 📚 Main docs
├── PWA-SETUP.md                           # 📱 PWA guide
└── package.json                           # 📦 Dependencies
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Utilities
npm run lint             # Run ESLint
npm run generate-icons   # Regenerate app icons
```

## Common Issues

### ❌ "Next.js requires Node.js >= 20.9.0"

**Solution**: Upgrade Node.js to version 20 or higher

```bash
nvm install 20
nvm use 20
```

### ❌ Service Worker not working

**Cause**: Service workers only work in production mode

**Solution**: Build and run in production:
```bash
npm run build
npm start
```

### ❌ Icons not showing

**Solution**: Regenerate icons
```bash
npm run generate-icons
```

### ❌ App not installable

**Requirements for PWA installation**:
1. ✅ HTTPS (or localhost)
2. ✅ Valid manifest.json
3. ✅ Service worker registered
4. ✅ Production build

**Test on localhost**:
```bash
npm run build
npm start
# Open http://localhost:3000
```

## Next Steps

### Customize the App

1. **Change Colors**: Edit `public/manifest.json` and `app/layout.tsx`
2. **Add Categories**: Edit `MobileSpendingTracker.tsx`
3. **Update Icons**: Edit `scripts/generate-png-icons.mjs` and run `npm run generate-icons`

### Deploy to Production

#### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

#### Netlify
1. Connect GitHub repo at netlify.com
2. Build command: `npm run build`
3. Publish directory: `.next`

#### Other Platforms
See [PWA-SETUP.md](./PWA-SETUP.md) for more deployment options.

## Need Help?

- 📚 [README.md](./README.md) - Full documentation
- 📱 [PWA-SETUP.md](./PWA-SETUP.md) - PWA details
- 🐛 [GitHub Issues](https://github.com/yourusername/spending-tracker/issues) - Report bugs

## Test Checklist

Before deploying, verify:

- [ ] App runs: `npm run dev`
- [ ] Production builds: `npm run build`
- [ ] Service worker registers (check DevTools)
- [ ] Offline mode works
- [ ] Icons display correctly
- [ ] Manifest is valid
- [ ] App is installable
- [ ] Lighthouse PWA score > 90

---

**Happy Tracking! 💰**

**Need Node.js 20+? Run `nvm install 20 && nvm use 20` first!**

