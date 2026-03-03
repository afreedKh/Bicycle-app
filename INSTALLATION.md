# Installation Guide

## Step 1: Extract Files
Extract the zip file to your desired location.

## Step 2: Install Dependencies
```bash
cd centro-bicycles-complete
yarn install
```

Or if you prefer npm:
```bash
npm install
```

## Step 3: Start Development Server
```bash
yarn start
```

The website will open at `http://localhost:3000`

## Step 4: Customize
- Update business details in components
- Modify products in `src/data/mockData.js`
- Change colors in `src/styles/centro.css`

## Step 5: Build for Production
```bash
yarn build
```

This creates an optimized production build in the `/build` folder.

## Troubleshooting

### Issue: Module not found
**Solution**: Make sure all dependencies are installed with `yarn install`

### Issue: Port 3000 already in use
**Solution**: Kill the process using port 3000 or change port in package.json

### Issue: Styling not applied
**Solution**: Make sure `src/styles/centro.css` is imported in App.js

## Next Steps

1. **Add Backend**: Connect to a database for dynamic content
2. **SEO Optimization**: Add meta tags and sitemap
3. **Analytics**: Integrate Google Analytics
4. **Performance**: Optimize images further
5. **Deploy**: Deploy to Vercel, Netlify, or your hosting provider
