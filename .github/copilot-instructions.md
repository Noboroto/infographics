# Infographics Web Application - Copilot Instructions

## Project Overview

This is a Vietnamese university IT department infographics application - a responsive web app that displays academic program information as interactive infographics with PNG export capabilities. The main `index.html` serves as a navigation hub with iframe-embedded specialty pages.

## Architecture & Core Components

### Main Structure
- **`index.html`**: Master navigation container with sidebar menu and iframe content area
- **`pages/`**: Individual infographic pages for each IT specialty (8 programs)
- **`faculty.html`**: General faculty information page (default load)
- **`auto-image-converter.js`**: Handles image-to-base64 conversion for PNG export
- **`imgs/`**: Static image assets for all infographics

### Navigation System
```javascript
// Core navigation in index.html
const pageConfigs = {
  'faculty.html': { background: '#F8FAFC', filename: 'thongtin-chung-fit-hcmus.png' },
  'pages/artificial_intelligence.html': { background: '#EEF2FF', filename: 'infographic-ai-hcmus.png' },
  // ... 8 specialty pages total
};
```

### Dual UI Pattern
- **Desktop**: Sidebar navigation + main content iframe
- **Mobile**: Dropdown select + collapsible download buttons

## Critical CSS Architecture

### Export Mode System
Every page implements a **dual-mode CSS pattern**:
```css
/* Normal responsive mode */
body:not(.export-mode) .header-bg {
  padding: 2rem 0.75rem !important;
}

/* Export mode - fixed 1096px layout for PNG generation */
.export-mode #infographic-content {
  width: 1096px !important;
  max-width: none !important;
  padding: 20px !important;
  background: white !important;
}
```

### Responsive Breakpoints
- `@media (max-width: 768px)`: Mobile layout switch
- `@media (max-width: 640px)`: Small mobile optimizations  
- `@media (max-width: 480px)`: iPhone SE specific fixes

## PNG Export Workflow

### Image Conversion Process
1. **Auto-detection**: Export mode triggers on URL param `?mode=export` or programmatically
2. **Base64 conversion**: `auto-image-converter.js` converts local images to base64 for cross-origin compatibility
3. **Layout switch**: CSS switches to fixed 1096px layout via `.export-mode` class
4. **Canvas capture**: html2canvas generates PNG from `#infographic-content` container

### Key Export Functions
```javascript
// Main export functions in index.html
async function capturePageAsCanvas(url, config) // Single page capture
document.getElementById('download-current-btn') // Current page
document.getElementById('download-all-btn')     // All pages as ZIP
```

## Development Patterns

### Page Template Structure
Each specialty page follows this pattern:
```html
<div id="infographic-content" class="max-w-5xl mx-auto bg-white">
  <header class="header-bg"><!-- Hero with background image --></header>
  <main class="p-6">
    <section class="my-16"><!-- Content sections --></section>
  </main>
</div>
```

### Icon System
- **Lucide Icons**: `data-lucide` attributes with programmatic rendering
- **Color coordination**: Each specialty has themed icon colors (e.g., AI: `#4F46E5`, CS: `#111B88`)
- **Export compatibility**: Icons convert to SVG for PNG export

### Image Handling Convention
- **Relative paths**: Always use `../imgs/filename.png` in specialty pages
- **Alt text**: Descriptive Vietnamese text with aspect ratio info for context
- **Export optimization**: Images auto-convert to base64 during export

## Critical Workflows

### Adding New Specialty Page
1. Create `pages/new_specialty.html` following template pattern
2. Add entry to `pageConfigs` object in `index.html`
3. Add navigation menu item with unique icon color
4. Update mobile dropdown options

### Modifying Export Layout
- **Never change** normal responsive CSS without testing export mode
- Always test both `body:not(.export-mode)` and `.export-mode` selectors
- Export layout is fixed 1096px width - don't make responsive

### Debugging Export Issues
- Check browser console for image conversion logs
- Test export mode: add `?mode=export` to URL
- Verify `#infographic-content` container exists on all pages

## Dependencies & External Services
- **TailwindCSS**: CDN-based styling framework
- **Lucide**: Icon library from unpkg CDN
- **html2canvas**: PNG generation library
- **JSZip + FileSaver**: Bulk download functionality
- **Google Fonts**: Be Vietnam Pro font family

## Mobile-Specific Considerations
- Custom scrollbar styles preserve rounded corners on sidebar
- Mobile select dropdown syncs with desktop sidebar active state
- Fixed positioning elements use responsive top/right values
- iPhone SE requires specific padding and sizing overrides

## Vietnamese Content Standards
- All content is in Vietnamese with English subtitles for programs
- File naming uses Vietnamese without diacritics: `thongtin-chung-fit-hcmus.png`
- Navigation labels follow pattern: "Specialty Name - ACRONYM"
