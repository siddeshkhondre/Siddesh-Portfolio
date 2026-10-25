# Code Volt website

A responsive, single-page portfolio site for Code Volt, styled with a dark liquid-glass look, animated details, a custom SVG monogram, and WhatsApp/Instagram contact links.

## Preview

Open `index.html` in a browser. The fonts load from Google Fonts when the browser is online; the site itself has no build step or package dependencies.

## Personalize the partner profiles

In `index.html`, find the two partner cards under **The people behind the pixels**. Replace each placeholder name, short bio, role, and photo placeholder. To use a photo, put the image in `assets/` and replace the `portrait-placeholder` element with an image, for example:

```html
<img class="partner-photo" src="assets/your-photo.jpg" alt="Your Name">
```

Then add this rule in `styles.css`:

```css
.partner-photo { width: 100%; height: 100%; position: absolute; inset: 0; object-fit: cover; }
```

## Contact details

Both WhatsApp numbers, the WhatsApp message links, and the Instagram profile link are in `index.html`. The primary buttons open WhatsApp chat, never a phone call.

## Publishing

This is a static website. Upload the contents of this folder to a static host such as Vercel, Netlify, or GitHub Pages. No server or database is required.
