# 💰 Spending Tracker PWA

A mobile-first Progressive Web App (PWA) for tracking your daily expenses. Built with Next.js, React, and Tailwind CSS.

![PWA](https://img.shields.io/badge/PWA-Enabled-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

- 📝 **Add Expenses**: Track title, amount, category, date, and payment mode
- 📊 **Visual Analytics**: Category breakdown with bar charts
- 📅 **Monthly Filtering**: View expenses by specific months
- 💾 **Local Storage**: Data persists in your browser
- 📤 **Export to CSV**: Download your expense data
- 📱 **Mobile First**: Optimized for mobile devices
- 🔌 **Offline Support**: Works without internet connection
- 🏠 **Installable**: Add to home screen as a native app

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📱 PWA Setup

The app is already configured as a PWA with:

- ✅ Service Worker for offline support
- ✅ Web App Manifest
- ✅ App icons (192x192 and 512x512)
- ✅ Theme colors and splash screen
- ✅ Installable on mobile and desktop

For detailed PWA configuration and deployment instructions, see [PWA-SETUP.md](./PWA-SETUP.md).

## 🎨 Customization

### Update App Colors

Edit `public/manifest.json`:
```json
{
  "theme_color": "#4f46e5",
  "background_color": "#ffffff"
}
```

### Add Categories

Edit `app/components/MobileSpendingTracker.tsx`:
```typescript
const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  // Add more...
];
```

### Regenerate Icons

```bash
npm run generate-icons
```

## 📂 Project Structure

```
spending-tracker-next/
├── app/
│   ├── components/
│   │   ├── MobileSpendingTracker.tsx      # Main app component
│   │   └── ServiceWorkerRegistration.tsx  # SW setup
│   ├── layout.tsx                         # Root layout + PWA meta tags
│   └── page.tsx                           # Home page
├── public/
│   ├── icons/                             # App icons
│   ├── manifest.json                      # PWA manifest
│   └── service-worker.js                  # Service worker
└── scripts/
    └── generate-png-icons.mjs             # Icon generator
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **PWA**: Custom Service Worker
- **Storage**: LocalStorage API
- **Icons**: Sharp (for generation)

## 🧪 Testing PWA Features

1. **Build for production** (PWA features require production mode):
   ```bash
   npm run build && npm start
   ```

2. **Test offline**:
   - Open DevTools → Application → Service Workers
   - Check "Offline" checkbox
   - Refresh the page - app should still work

3. **Test installation**:
   - Look for install icon in browser address bar
   - Click to install as standalone app

4. **Run Lighthouse audit**:
   - Open DevTools → Lighthouse
   - Select "Progressive Web App"
   - Generate report (aim for 100%)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

### Deploy to Netlify

1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `.next`

### Requirements

- ✅ HTTPS (automatic on Vercel/Netlify)
- ✅ Valid manifest.json
- ✅ Service worker registration

## 📊 Default Categories

- 🍔 Food
- 🚗 Transport
- 🛍️ Shopping
- 📄 Bills
- 🎬 Entertainment
- 🏥 Health
- 📦 Other

## 💾 Data Storage

All data is stored in browser's LocalStorage:
- **Key**: `mst_data_v1`
- **Format**: JSON array of expense objects
- **Persistence**: Data survives page reloads
- **Privacy**: Never leaves your device

To clear all data: Click the "Clear" button in the app.

## 🔒 Privacy

- ✅ No backend server
- ✅ No data collection
- ✅ No tracking
- ✅ All data stored locally on your device
- ✅ No internet required after first load

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📚 Documentation

- [PWA Setup Guide](./PWA-SETUP.md) - Detailed PWA configuration
- [Next.js Docs](https://nextjs.org/docs) - Learn about Next.js
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Styling reference

## 🐛 Troubleshooting

### Service Worker not working?
- Build for production: `npm run build && npm start`
- Check browser console for errors
- Ensure you're on HTTPS or localhost

### Icons not showing?
- Run `npm run generate-icons`
- Clear browser cache
- Reinstall PWA

### Data not saving?
- Check if localStorage is enabled
- Try clearing localStorage: `localStorage.clear()`
- Disable private/incognito mode

For more help, see [PWA-SETUP.md](./PWA-SETUP.md).

---

**Made with ❤️ using Next.js and Tailwind CSS**

**Star ⭐ this repo if you find it useful!**
