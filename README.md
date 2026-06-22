# PCH Notification Centre Website

A modern, responsive, and accessible website for PCH Notification Centre - professional communication and customer support services.

## Features

### ✨ Modern Design
- Clean, professional layout with a blue and gold color scheme
- Responsive design that works on all devices
- Smooth animations and transitions
- Hero section with call-to-action

### ♿ Accessibility
- WCAG 2.1 compliant
- Semantic HTML structure
- ARIA labels for screen readers
- Skip links for keyboard navigation
- Proper heading hierarchy
- Focus indicators on interactive elements
- Form validation with error messages
- Mobile menu with proper ARIA attributes

### 📱 Responsive Layout
- Mobile-first design approach
- Hamburger menu for mobile devices
- Flexible grid layouts
- Touch-friendly buttons and links
- Optimized font sizes for readability

### 🚀 Performance
- Optimized images
- Smooth scrolling
- Efficient CSS with no unnecessary overrides
- Minimal JavaScript for better performance
- Local storage for form persistence

### 🔍 SEO Optimization
- Meta descriptions and keywords
- Open Graph tags for social sharing
- Twitter Card support
- Schema.org structured data (JSON-LD)
- Semantic HTML elements

### 📋 Sections Included
1. **Header** - Sticky navigation with mobile menu
2. **Hero** - Eye-catching banner with call-to-action
3. **About Us** - Company description
4. **Services** - Three main service offerings
5. **Team** - Meet the team members
6. **Testimonials** - Client feedback and ratings
7. **FAQ** - Frequently asked questions (expandable)
8. **Contact** - Contact information and contact form
9. **Footer** - Links and copyright information

### 📝 Form Features
- Real-time validation on input blur
- Required field validation
- Email format validation
- Phone number format validation
- Minimum character length validation
- Error messages with clear feedback
- Success/error messages after submission
- Form data auto-save to local storage
- Loading state on form submission

### 🎯 Interactivity
- Smooth scrolling to sections
- Mobile menu toggle
- FAQ accordion with open/close animations
- Form validation and submission
- Scroll animations for card elements
- Active navigation link highlighting
- Hover effects on buttons and links

## File Structure

```
pch-notification-centre/
├── index.html          # Main HTML file
├── styles.css          # All CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── server.js           # Optional: Node.js backend for form handling
```

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/startover524-svg/pch-notification-centre.git
cd pch-notification-centre
```

2. Open in your browser:
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended)

3. Using a local server:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (using http-server)
npx http-server
```

Then navigate to `http://localhost:8000`

## Form Submission (Backend Integration)

Currently, the form displays a success message without a backend. To handle actual form submissions, you need to:

1. **Set up a backend server** (Node.js, Python, PHP, etc.)

2. **Update the API endpoint** in `script.js`:
```javascript
const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
});
```

3. **Example Node.js backend** (server.js):
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/contact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    
    // Process the form data
    // Send email, save to database, etc.
    
    res.json({ 
        success: true, 
        message: 'Form submitted successfully' 
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## Customization

### Colors
Edit the color values in `styles.css`:
- Primary color: `#003366` (dark blue)
- Accent color: `#d4af37` (gold)
- Background: `#f4f7fa` (light blue-gray)

### Contact Information
Update in `index.html`:
- Email: Change `Pchprcentre@outlook.com`
- Phone: Change `(646) 307-9021`
- Business hours: Update the hours section

### Team Members
Modify the team section with your actual team information
Operations Manager kevin must

### Testimonials
Replace sample testimonials with real client feedback

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Validation

### Form Validation Rules
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format
- **Phone**: Optional, valid phone format if provided
- **Subject**: Required, minimum 3 characters
- **Message**: Required, minimum 10 characters

## Accessibility Features

- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader friendly
- ✅ High contrast colors
- ✅ Focus indicators
- ✅ ARIA labels and roles
- ✅ Semantic HTML structure
- ✅ Alt text for images
- ✅ Skip to main content link

## Performance Optimization

- Minify CSS and JavaScript in production
- Compress images
- Use CDN for assets
- Enable gzip compression on server
- Add caching headers

## Deployment

### GitHub Pages
1. Push code to GitHub
2. Go to repository Settings > Pages
3. Select main branch as source
4. Site will be available at `https://startover524-svg.github.io/pch-notification-centre`

### Netlify
1. Connect your GitHub repository
2. Set build settings (if needed)
3. Deploy automatically on push

### Other Hosting
Upload files to any web hosting service via FTP or file manager.

## Future Enhancements

- [ ] Add blog section
- [ ] Implement newsletter signup
- [ ] Add service booking system
- [ ] Create admin dashboard
- [ ] Add multi-language support
- [ ] Implement analytics tracking
- [ ] Add testimonial management
- [ ] Create customer portal

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Credits

- Design and development by startover524-svg
- Hero image from Unsplash
- Icons and emojis for visual enhancement

---

**Last Updated**: 2026
**Version**: 1.0
