# Shreya Hasyagar - Portfolio

Personal portfolio website for **Shreya Hasyagar**, Senior Software Engineer (Python · AWS · Distributed Data Systems · Applied AI).

🔗 **Live:** https://shreyahasyagar.github.io/

## Stack

Zero-build static site - fast, accessible, and hosted on GitHub Pages (user root domain).

- Vanilla HTML5, CSS3 (custom properties, grid/flex), and JavaScript (no framework, no bundler)
- Interactive: cursor spotlight, 3D tilt cards, magnetic buttons, typing effect, marquee, animated counters
- `IntersectionObserver`-based scroll reveals and active-section nav highlighting
- Responsive, light/dark themed design (with a persisted theme toggle) and reduced-motion support
- SEO + Open Graph metadata

## Structure

```
index.html      # single-page site
styles.css      # design system + layout
main.js         # nav, reveal animations, stat counters
assets/         # favicon + résumé
```

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deployment

Served directly from the `main` branch root via GitHub Pages - no build step required.
