# A11y Auditor - Accessibility Checker Tool

A modern, developer-friendly accessibility checker tool that helps you identify and fix accessibility issues in your HTML code. Built with vanilla HTML, CSS, and JavaScript for simplicity and performance.

## Features

### Core Functionality
- **HTML Code Analysis**: Paste your HTML code and get instant accessibility feedback
- **Comprehensive Checks**: Analyzes multiple accessibility aspects including:
  - Missing alt attributes on images
  - Low color contrast issues
  - Missing form labels
  - Improper heading hierarchy
  - Missing ARIA attributes
  - Non-descriptive button text
  - And more!

### User Experience
- **Modern UI**: Clean, developer-friendly interface inspired by modern code editors
- **Dark/Light Mode**: Toggle between themes for comfortable coding
- **Real-time Analysis**: Instant feedback with detailed explanations
- **Helpful Suggestions**: Each issue comes with actionable fixes
- **Download Reports**: Export your analysis results as JSON

### Developer-Friendly Features
- **Sample Code**: Load example HTML to see the tool in action
- **Clear Interface**: Easy-to-use panels with intuitive controls
- **Responsive Design**: Works great on desktop and mobile devices
- **Accessible Design**: The tool itself follows accessibility best practices

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required!

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start analyzing your HTML code!

### Quick Start
1. **Paste HTML**: Copy your HTML code and paste it into the left panel
2. **Analyze**: Click the "Analyze Accessibility" button
3. **Review Results**: Check the right panel for detailed feedback
4. **Fix Issues**: Follow the suggestions to improve accessibility
5. **Download Report**: Save your analysis results for later reference

## What It Checks

### Images & Media
- Missing `alt` attributes on `<img>` elements
- Decorative images without proper `alt=""` or `role="presentation"`
- Missing `alt` text on `<area>` elements in image maps

### Forms & Interactive Elements
- Missing `<label>` elements for form controls
- Incorrect `for` attribute usage in labels
- Missing `aria-label` or `aria-labelledby` on form controls
- Non-descriptive button text (e.g., "Click here", "Submit")

### Structure & Semantics
- Improper heading hierarchy (jumping from h1 to h3)
- Missing main landmarks (`<main>`, `<nav>`, `<header>`, etc.)
- Incorrect use of semantic elements
- Missing `lang` attribute on `<html>` element

### ARIA & Accessibility
- Missing `aria-label` or `aria-labelledby` on interactive elements
- Incorrect ARIA role usage
- Missing `aria-expanded` on collapsible elements
- Missing `aria-haspopup` on elements with popups

### Color & Contrast
- Low contrast text (simulated - requires manual verification)
- Color-only indicators without text alternatives

## UI Components

### Left Panel - Code Input
- Large textarea for HTML code input
- Clear and sample code buttons
- Syntax highlighting placeholder
- Analyze button with loading states

### Right Panel - Results
- Welcome state with helpful instructions
- Loading animation during analysis
- Results summary with statistics
- Detailed issue cards with:
  - Issue description
  - Why it matters
  - How to fix it
  - Code examples

### Header
- Brand logo and title
- Dark/light mode toggle
- Download report button

## Technical Details

### Architecture
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **No Dependencies**: Pure browser APIs
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG 2.1 AA compliant

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Performance
- Lightweight (< 50KB total)
- Fast analysis using DOM parsing
- No external API calls
- Works offline

## Responsive Design

The tool is fully responsive and works great on:
- **Desktop**: Full two-panel layout
- **Tablet**: Stacked panels with optimized spacing
- **Mobile**: Single-column layout with touch-friendly controls

## Theme System

### Light Mode
- Clean, modern appearance
- High contrast for readability
- Professional developer aesthetic

### Dark Mode
- Easy on the eyes
- Perfect for low-light environments
- Maintains accessibility standards

## Report Download

The download feature generates a comprehensive JSON report including:
- Analysis timestamp
- HTML code analyzed
- All issues found with details
- Summary statistics
- Recommendations

## Contributing

This is an open-source project! Feel free to:
- Report bugs or issues
- Suggest new features
- Submit pull requests
- Improve documentation

### Development Setup
1. Fork the repository
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with accessibility in mind
- Inspired by modern developer tools
- Uses [Inter font](https://rsms.me/inter/) for excellent readability
- Icons from [Font Awesome](https://fontawesome.com/)

## Support

If you have questions or need help:
- Check the tool's built-in help
- Review the analysis results carefully
- Consider consulting accessibility guidelines (WCAG 2.1)

---


