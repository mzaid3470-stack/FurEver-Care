# FurEver Care — React Conversion

This version keeps the existing visual theme, content, images, layout, CSS and data, but adds a React/Vite SPA shell. Original page markup is preserved under `public/pages/` and rendered by React so the existing design does not need to be redesigned.

## Run

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm run preview
```

## Notes
- SRS requires a responsive SPA and explicitly allows ReactJS components/modules.
- The shared CSS and original page markup were retained to avoid changing the theme/layout.
- A full-width/root sizing fix was added without changing the visual palette or component layout.
- Existing page JavaScript is loaded per route and a synthetic DOMContentLoaded event is dispatched so the existing interactions continue to work.
- `public/images/` contains the local image area. Existing local image assets are copied there; remote image URLs are listed in `public/images/remote-images.json` with deterministic filenames.
- The execution environment used to prepare this archive cannot download external image binaries, so the original remote image URLs were intentionally preserved rather than substituting different images. Running the included image sync script on a machine with internet access will download the exact source URLs into `public/images/` without changing the references.


## Veterinary profile routing
The Veterinary Center now uses four canonical specialist pages: `sarah-mitchell.html`, `ryan-carter.html`, `maya-patel.html`, and `daniel-brooks.html`. Each page loads its own `vet-01` through `vet-04` record and has a Back to Specialists link.
