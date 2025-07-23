# Export Mode Usage Guide

## How to Use Export Mode

### Method 1: URL Parameter
Add `?mode=export` to any page URL:
```
computer_vision.html?mode=export
```

### Method 2: Browser Console
Open Developer Tools Console and run:
```javascript
enableExportMode()
```

### Method 3: Auto-Detection
Export mode automatically activates when:
- URL contains `export` parameter
- Body has `export-mode` class
- Running in headless browsers (Puppeteer, Selenium)

### Method 4: Programmatic
```javascript
// Enable export mode
window.exportConverter.enableExportMode();

// Disable export mode  
window.exportConverter.disableExportMode();
```

## Features
- ✅ Automatic image conversion to base64
- ✅ Icon preservation for PNG export
- ✅ Responsive design maintained
- ✅ No separate export files needed
- ✅ Original images preserved when not exporting

## Export Tools Compatibility
- HTML to PNG converters
- Puppeteer screenshots
- Browser print-to-PDF
- Selenium WebDriver
- Browser screenshot extensions
