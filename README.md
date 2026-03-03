# Centro Bicycles & Toys - Modern Website

A premium, high-converting dark theme website for Centro Bicycles & Toys showroom in Kerala, India.

## 🎨 Features

- **Modern Neon-Dark Design**: Signature neon green (#DAFF01) accents on dark background
- **Fully Responsive**: Mobile-first design with tablet and desktop breakpoints
- **Interactive Components**: Hover effects, smooth animations, floating WhatsApp button
- **Product Showcase**: 12 product categories (6 bicycles + 6 toys)
- **Customer Reviews**: 6 testimonials with star ratings
- **Google Maps Integration**: Live store location map
- **WhatsApp & Call Integration**: Direct customer contact features

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
yarn install
# or
npm install
```

2. Start development server:
```bash
yarn start
# or
npm start
```

3. Build for production:
```bash
yarn build
# or
npm build
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── AboutSection.jsx
│   ├── ProductCategories.jsx
│   ├── WhyChooseUs.jsx
│   ├── ReviewsSection.jsx
│   ├── StoreVisit.jsx
│   ├── CTASection.jsx
│   ├── Footer.jsx
│   ├── FloatingWhatsApp.jsx
│   └── ui/             # Shadcn UI components
├── pages/
│   └── Home.jsx        # Main home page
├── styles/
│   └── centro.css      # Complete design system
├── data/
│   └── mockData.js     # Product and review data
├── App.js              # Main app component
└── index.js            # App entry point
```

## 🎨 Design System

### Color Palette
- **Primary Accent**: `rgb(218, 255, 1)` - Neon Green
- **Background**: `rgb(17, 17, 19)` - Dark
- **Secondary BG**: `rgb(26, 28, 30)`
- **Text Primary**: `rgb(255, 255, 255)`
- **Text Secondary**: `rgb(218, 218, 218)`

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 900

### Button Styles
- `.btn-primary` - Neon green CTA buttons
- `.btn-secondary` - Outline style buttons
- `.btn-ghost` - Minimal flat buttons

## 🔧 Customization

### Update Business Information

Edit `/src/components/` files to update:
- Phone number: Search for `09020300400`
- WhatsApp: Search for `9020300400`
- Address: Edit in `StoreVisit.jsx`
- Google Maps: Update iframe URL in `StoreVisit.jsx`

### Update Products

Edit `/src/data/mockData.js` to modify:
- Product names and descriptions
- Product images
- Customer reviews

### Change Colors

Edit `/src/styles/centro.css` root variables:
```css
:root {
  --accent-primary: rgb(218, 255, 1); /* Change this */
  --bg-primary: rgb(17, 17, 19);      /* Change this */
}
```

## 📦 Dependencies

- React 19.0.0
- React Router DOM 7.5.1
- Lucide React (icons)
- Tailwind CSS
- Shadcn UI components

## 🌐 Live Demo

Visit: https://kerala-cycles.preview.emergentagent.com

## 📞 Contact Integration

The website includes:
- **Direct Phone Calls**: `tel:` links for mobile devices
- **WhatsApp Integration**: Pre-filled messages for product inquiries
- **Google Maps**: Direct navigation to store location
- **Floating WhatsApp Button**: Always accessible on scroll

## 🎯 Performance

- Optimized images from Unsplash
- Smooth 60fps animations
- Lazy loading for images
- Mobile-first responsive design
- Fast loading times

## 📝 License

This project is created for Centro Bicycles & Toys.

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Styling**: Custom CSS + Tailwind
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Design System**: Neon Dark Kit

---

Built with ❤️ for Centro Bicycles & Toys
