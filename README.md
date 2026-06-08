# Mehraj U Din Mir - Portfolio Website

A world-class, premium, highly animated personal portfolio website built with React.js, Three.js, Framer Motion, and GSAP.

## 🚀 Features

- **Interactive 3D Background** - Neural network visualization with Three.js/React Three Fiber
- **Premium Animations** - Framer Motion & GSAP powered animations throughout
- **Magnetic Buttons** - Mouse-following interactive buttons
- **3D Tilt Cards** - Perspective-based hover effects on project cards
- **Typing Animation** - Dynamic text effects in hero section
- **Custom Cursor** - Animated cursor with hover effects
- **Scroll Animations** - Section reveal animations triggered by scroll
- **Responsive Design** - Mobile-first, fully responsive across all devices
- **Glass Morphism** - Modern glass-card UI design
- **Dark Futuristic Theme** - Premium dark color palette with neon accents

## 🛠 Tech Stack

- **React 19+** - UI Framework
- **Vite** - Build Tool
- **Three.js / React Three Fiber** - 3D Graphics
- **Framer Motion** - Animations
- **GSAP** - Advanced Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📁 Project Structure

```
mehraj-portfolio/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── LoadingScreen.jsx
│   │   └── ScrollToTop.jsx
│   ├── sections/         # Page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Achievements.jsx
│   │   ├── Services.jsx
│   │   ├── TechStack.jsx
│   │   ├── Testimonials.jsx
│   │   ├── YouTube.jsx
│   │   └── Contact.jsx
│   ├── hooks/            # Custom hooks
│   │   ├── useMousePosition.js
│   │   └── useScrollProgress.js
│   ├── utils/            # Utilities
│   │   └── animations.js
│   ├── styles/           # Global styles
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone or extract the project:**
```bash
cd mehraj-portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

4. **Build for production:**
```bash
npm run build
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **For SPA routing, create `vercel.json`:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

4. **Or connect GitHub repo to Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click Deploy

### Deploy to Netlify

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Deploy:**
```bash
netlify deploy --build --prod
```

3. **Or connect GitHub repo to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - New site from Git
   - Select repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click Deploy

### Deploy to GitHub Pages

1. **Install gh-pages:**
```bash
npm install -D gh-pages
```

2. **Add to `package.json`:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update `vite.config.js`:**
```js
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
})
```

4. **Deploy:**
```bash
npm run deploy
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js`:
```js
colors: {
  'deep-black': '#0a0a0f',
  'graphite': '#1a1a2e',
  'electric-blue': '#00d4ff',
  'neon-cyan': '#00f5d4',
}
```

### Content
Update personal information in each section file:
- `src/sections/Hero.jsx` - Name, title, stats
- `src/sections/About.jsx` - Bio, timeline
- `src/sections/Projects.jsx` - Project details
- `src/sections/Contact.jsx` - Contact info

## 📱 Performance

- Code splitting with Vite
- Lazy loaded sections
- Optimized 3D rendering
- Responsive images
- Minimal bundle size

## 🔒 SEO

- Meta tags in `index.html`
- Semantic HTML structure
- Accessibility support
- Open Graph tags

## 📄 License

MIT License - feel free to use this template for your own portfolio.

---

**Built with ❤️ by Mehraj U Din Mir**
