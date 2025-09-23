# Bootstrap 5 One-Pager

A modern, responsive one-page website built with Bootstrap 5 and customizable with SCSS.

## Features

- Fully responsive design
- Built with Bootstrap 5
- Customizable colors via SCSS
- Smooth scrolling navigation
- Ready to be hosted on GitHub Pages (no server-side components)

## Project Structure

```
bootstrap-onepager/
├── assets/            # Images and other static assets
├── css/               # Compiled CSS files
├── js/                # JavaScript files
│   └── main.js        # Custom JavaScript
├── scss/              # SCSS source files
│   ├── _variables.scss # Custom color variables
│   └── main.scss      # Main SCSS file
├── index.html         # Main HTML file
├── package.json       # NPM package configuration
└── README.md          # This file
```

## Getting Started

### Option 1: Use as-is

If you want to use the one-pager as-is without customizing the SCSS:

1. Clone or download this repository
2. Open `index.html` in your browser
3. Modify the HTML content as needed

### Option 2: Customize with SCSS

To customize the colors and styles using SCSS:

1. Make sure you have Node.js and npm installed
2. Install dependencies:
   ```
   npm install
   ```
3. Modify the color variables in `scss/_variables.scss`
4. Compile SCSS to CSS:
   ```
   npm run build
   ```
5. For development with auto-recompilation:
   ```
   npm run sass
   ```

## Customizing Colors

To customize the colors of the website, edit the variables in `scss/_variables.scss`:

```scss
// Custom color variables
$primary: #0d6efd;    // Main brand color
$secondary: #6c757d;  // Secondary color
// ... other color variables
```

After changing the variables, compile the SCSS to CSS using:

```
npm run build
```

## Hosting on GitHub Pages

This one-pager is designed to be easily hosted on GitHub Pages:

1. Push your repository to GitHub
2. Go to your repository settings
3. Scroll down to the GitHub Pages section
4. Select the branch you want to deploy (usually `main` or `master`)
5. Your site will be published at `https://yourusername.github.io/repository-name/`

## Browser Support

This one-pager supports all modern browsers including:

- Chrome
- Firefox
- Safari
- Edge

## License

MIT