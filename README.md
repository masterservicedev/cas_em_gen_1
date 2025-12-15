# Casino Email Generator

Advanced promotional email generator with 50+ template variations, AI-powered subject lines, and multiple export options.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/casino-email-generator)

## 🚀 Quick Deploy to Vercel

**Three ways to deploy:**

1. **One-Click Deploy** (Fastest)
   - Click the "Deploy with Vercel" button above
   - Connect your GitHub account
   - Vercel will fork the repo and deploy automatically

2. **Automated Script** (Easiest)
   ```bash
   # macOS/Linux
   chmod +x deploy.sh
   ./deploy.sh
   
   # Windows
   deploy.bat
   ```

3. **Manual Deploy** (Most control)
   - See [DEPLOY_TO_VERCEL.md](DEPLOY_TO_VERCEL.md) for detailed instructions

Your app will be live at: `https://your-project.vercel.app`

## Features

✨ **50+ Template Variations**
- 5 unique layout styles × 10 color schemes = 50 combinations
- Randomized greetings (33+ variations)
- Randomized content variations
- Professional email-compliant HTML

🤖 **AI-Powered Subject Lines**
- Generate 50 unique subject lines at once
- Uses Claude AI for compelling copy
- Mix of urgency, exclusivity, value, and curiosity

📥 **Multiple Export Options**
- Download as PNG image (email screenshot look)
- Download as HTML (email-compliant, inline CSS)
- Ready for email platforms

🎨 **Customizable**
- Brand name
- Bonus amounts
- Free spins count
- Game names
- Reload percentages
- Valid days

## Quick Start

### Option 1: Run with Node.js (Recommended)

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   - Automatically opens at `http://localhost:3000`
   - Or manually navigate to the URL shown in terminal

### Option 2: Use in Your Existing React Project

1. **Copy the main component**
   ```bash
   cp advanced-email-generator.jsx your-project/src/components/
   ```

2. **Install dependencies**
   ```bash
   npm install lucide-react html2canvas
   ```

3. **Import and use**
   ```jsx
   import EmailGenerator from './components/advanced-email-generator';
   
   function App() {
     return <EmailGenerator />;
   }
   ```

### Option 3: Standalone HTML/JavaScript

If you want a simple HTML version without React:

1. Extract the template HTML from the `generateTemplate` function
2. Create a simple form with vanilla JavaScript
3. Use string replacement to populate variables

Example structure:
```html
<!DOCTYPE html>
<html>
<body>
  <form id="emailForm">
    <input id="brandName" placeholder="Brand Name">
    <input id="bonusAmount" placeholder="Bonus Amount">
    <button onclick="generateEmail()">Generate</button>
  </form>
  <div id="preview"></div>
  
  <script>
    const templates = [/* paste template HTML here */];
    
    function generateEmail() {
      const brandName = document.getElementById('brandName').value;
      const template = templates[0].replace('${formData.brandName}', brandName);
      document.getElementById('preview').innerHTML = template;
    }
  </script>
</body>
</html>
```

## How It Works

### Template Generation

The system generates 50 variations by combining:

1. **5 Layout Styles:**
   - Classic Centered
   - VIP Styled
   - Modern Card
   - Split Design
   - Minimalist

2. **10 Color Schemes:**
   - Classic Gold
   - Ruby Red
   - Turquoise
   - Royal Purple
   - Emerald Green
   - Hot Pink
   - Sunset Orange
   - Neon Blue
   - Deep Crimson
   - Scarlet

3. **33+ Greeting Variations:**
   - Simple: "Hello,", "Hi,", "Hey,"
   - Complex: Randomized phrases with multiple variations
   - Generic (no personalization tokens)

4. **Content Variations:**
   - Multiple intro paragraphs
   - Multiple body paragraphs
   - Different closing lines
   - Various urgency phrases

### Email Compliance

All generated HTML follows email best practices:

- **Inline CSS only** - No external stylesheets
- **Table-based layouts** - Compatible with all email clients
- **No JavaScript** - Email-safe
- **Safe colors** - Web-safe color palette
- **Tested structure** - Works in Gmail, Outlook, Apple Mail, etc.

### Greeting System

The greeting system uses a smart randomization approach:

```javascript
// Simple greetings
"Hello,"
"Hi,"
"Greetings,"

// Complex greetings with multiple random choices
"I {wanted|thought|decided} to {send you|share with you} a {quick|brief} {note|message}"
```

Each complex greeting has multiple variations that are randomly selected, creating thousands of possible combinations.

## Customization Guide

### Adding New Color Schemes

Edit the `colorSchemes` array:

```javascript
const colorSchemes = [
  { primary: '#yourColor', secondary: '#yourBg', accent: '#yourAccent', name: 'Your Theme' },
  // ... more themes
];
```

### Adding New Layouts

Add a new layout function to the `layouts` array in `generateTemplate`:

```javascript
() => `
  <table width="100%" cellpadding="0" cellspacing="0">
    <!-- Your email HTML here -->
  </table>
`
```

### Adding New Greetings

Add to the `greetingTemplates` array:

```javascript
const greetingTemplates = [
  "Your new greeting,",
  () => randomChoice(['Dynamic', 'Greeting', 'Options']),
];
```

### Adding New Content Variations

Add to the `contentVariations` object:

```javascript
const contentVariations = {
  yourCategory: [
    "Variation 1",
    "Variation 2",
    "Variation 3"
  ]
};
```

## Export Formats

### PNG Image Export
- Creates a high-quality screenshot of the email
- Perfect for mockups and presentations
- 2x scale for retina displays

### HTML Export
- Complete email-ready HTML
- Includes DOCTYPE and meta tags
- Can be directly imported into email platforms
- All CSS is inline for maximum compatibility

## Troubleshooting

### Issue: "Module not found" errors
**Solution:** Run `npm install` to install all dependencies

### Issue: Port 3000 already in use
**Solution:** Change port in `vite.config.js` or kill the process using port 3000

### Issue: Image export not working
**Solution:** Make sure you have `html2canvas` installed: `npm install html2canvas`

### Issue: AI subject generation fails
**Solution:** Check your internet connection. The AI uses Claude API which requires network access.

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icons
- **html2canvas** - Image export
- **Claude AI** - Subject line generation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## File Structure

```
casino-email-generator/
├── advanced-email-generator.jsx    # Main component (50+ templates)
├── main.jsx                        # Entry point
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

## Performance

- **Fast template switching** - Instant preview updates
- **Optimized rendering** - Efficient React rendering
- **Quick exports** - Fast HTML generation and image conversion

## Future Enhancements

Potential additions:
- Batch export (all 50 variations at once)
- A/B testing metrics
- Template favorites/bookmarks
- Custom CSS injection
- Mobile preview mode
- Email client preview (Gmail, Outlook, etc.)

## License

MIT License - Feel free to use and modify

## Support

For issues or questions, please check the troubleshooting section above or review the code comments for implementation details.

---

**Happy Email Generating! 🎰📧**
