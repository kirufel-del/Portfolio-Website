# Kirubel Negash — Portfolio

Personal portfolio site: a scroll-driven, single-page design with an ID-badge "identity check" hero, a 3D case-study carousel, a career timeline, toolkit, and contact section.

Plain HTML, CSS and JavaScript. No build step and no dependencies.

```
index.html          page markup
css/styles.css      styles (palette, type, layout, static/mobile fallback)
js/main.js          content for case studies + career, scroll animations, project modal
assets/             portrait and résumé PDF
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish with GitHub Pages

1. Push to `main`.
2. In the repo, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, and pick `main` / `/ (root)`.
3. The site goes live at `https://kirufel-del.github.io/Portfolio-Website/`.

> GitHub Pages on a **private** repo needs a paid GitHub plan. On a free plan, make the repo public first.

## Editing content

- Case studies and career steps: the `PROJECTS` and `STEPS` arrays at the top of `js/main.js`.
- Hero details, toolkit and contact: `index.html`.
- Résumé download: `assets/Kirubel_Negash_Resume.pdf`. Its source is `resume-src/resume.html`; to regenerate the PDF:

  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --print-to-pdf=assets/Kirubel_Negash_Resume.pdf "file://$PWD/resume-src/resume.html"
  ```

On screens narrower than 900px, or when the visitor prefers reduced motion, the page switches to a static stacked layout with no scroll animations.
