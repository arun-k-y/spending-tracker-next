# PWA Setup Guide - Spending Tracker

This is a Progressive Web App (PWA) spending tracker built with Next.js, React, and Tailwind CSS.

## Features

- ✅ Add expenses with title, amount, category, date, and payment mode
- ✅ View transaction history
- ✅ Filter by month
- ✅ Category breakdown with visual charts
- ✅ Export data to CSV
- ✅ LocalStorage persistence
- ✅ Offline support (PWA)
- ✅ Install to home screen
- ✅ Mobile-first responsive design

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## PWA Features

### Service Worker

The app includes a service worker (`public/service-worker.js`) that provides:
- **Offline support**: App works without internet connection
- **Cache-first strategy**: Faster load times for static assets
- **Network-first for navigation**: Always tries to fetch fresh content

The service worker is automatically registered in the app via `ServiceWorkerRegistration` component.

### Manifest File

The `public/manifest.json` configures the PWA with:
- App name and theme colors
- Display mode (standalone)
- App icons

### Icons

App icons are stored in `public/icons/`:
- `icon-192.png` - 192x192px (minimum required)
- `icon-512.png` - 512x512px (recommended for high-res displays)

To regenerate icons:
```bash
npm run generate-icons
```

This will create new PNG icons from the SVG template in the script.

## Deployment

### Requirements

- **HTTPS**: PWAs require HTTPS (except on localhost)
- **Valid manifest.json**
- **Service worker registration**

### Recommended Platforms

1. **Vercel** (Recommended for Next.js)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Connect your GitHub repo
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **GitHub Pages**
   - Requires static export: Add `output: 'export'` to `next.config.ts`
   - Not recommended for this app due to localStorage usage

## Testing PWA Features

### Local Testing

1. Run production build:
   ```bash
   npm run build
   npm start
   ```

2. Open in Chrome/Edge
3. Open DevTools → Application → Service Workers
4. Check "Offline" and refresh - app should still work

### Testing Installation

1. In Chrome/Edge, look for install icon in address bar
2. Click to "Install Spending Tracker"
3. App will open as standalone window
4. Check home screen for app icon

### PWA Audit

Use Lighthouse to test PWA compliance:
1. Open DevTools → Lighthouse
2. Select "Progressive Web App" category
3. Click "Generate report"
4. Aim for 100% PWA score

## Customization

### Update Theme Colors

Edit `public/manifest.json`:
```json
{
  "theme_color": "#4f46e5",
  "background_color": "#ffffff"
}
```

Also update in `app/layout.tsx` metadata.

### Update App Name

1. `public/manifest.json` - name and short_name
2. `app/layout.tsx` - metadata title

### Customize Icons

1. Edit `scripts/generate-png-icons.mjs`
2. Modify the SVG template
3. Run `npm run generate-icons`

Or create your own icons:
- Use [RealFaviconGenerator](https://realfavicongenerator.net/)
- Use [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
- Design in Figma/Sketch and export

### Add More Categories

Edit `app/components/MobileSpendingTracker.tsx`:
```typescript
const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Other",
  // Add more here
];
```

## Browser Support

- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Safari (iOS 11.3+)
- ✅ Firefox (Desktop & Mobile)
- ✅ Samsung Internet
- ⚠️ Safari (Desktop) - Limited PWA support

## Troubleshooting

### Service Worker Not Registering

1. Check browser console for errors
2. Ensure you're on HTTPS or localhost
3. Clear browser cache and reload
4. Check `public/service-worker.js` exists

### Icons Not Showing

1. Verify files exist in `public/icons/`
2. Check `manifest.json` paths are correct
3. Clear cache and reinstall PWA
4. Run `npm run generate-icons` to recreate

### Offline Not Working

1. Check Service Worker is registered (DevTools → Application)
2. Test with production build (`npm run build && npm start`)
3. Ensure service worker is activated
4. Check cache storage in DevTools

### Data Not Persisting

1. Check localStorage is enabled in browser
2. Check for private/incognito mode (may limit storage)
3. Check browser storage quota
4. Clear localStorage and try again: `localStorage.clear()`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Custom SVG → PNG via Sharp
- **PWA**: Custom Service Worker
- **Storage**: LocalStorage

## File Structure

```
spending-tracker-next/
├── app/
│   ├── components/
│   │   ├── MobileSpendingTracker.tsx  # Main component
│   │   └── ServiceWorkerRegistration.tsx  # SW registration
│   ├── globals.css
│   ├── layout.tsx  # Root layout with PWA meta tags
│   └── page.tsx  # Home page
├── public/
│   ├── icons/
│   │   ├── icon-192.png
│   │   └── icon-512.png
│   ├── manifest.json
│   └── service-worker.js
├── scripts/
│   ├── generate-icons.js  # SVG generator
│   └── generate-png-icons.mjs  # PNG generator with Sharp
└── package.json
```

## License

MIT

## Support

For issues or questions:
1. Check this guide
2. Review browser console for errors
3. Test with Lighthouse PWA audit
4. Check service worker status in DevTools

---

**Enjoy tracking your spending! 💰📱**

