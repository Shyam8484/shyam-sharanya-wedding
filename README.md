# Shyam & Sharanya Wedding Invitation — GitHub Pages Package

This folder is a self-contained static website extracted from the supplied wedding invitation HTML.

## Files
- `index.html` — main invitation page. Use this as the GitHub Pages entry point.
- `assets/images/` — all embedded image assets extracted from the original HTML and referenced with relative paths.
- `.nojekyll` — tells GitHub Pages to serve the site without Jekyll processing.
- `source-original.html` — untouched backup of the supplied HTML.

## Dependencies / hosting requirements
- No npm, Node.js, build step, server, or database is required.
- CSS and JavaScript are embedded in `index.html`.
- All image data that was embedded as base64 in the supplied HTML has been extracted into `assets/images/`.
- The invitation uses browser APIs such as Canvas/Pointer Events for the scratch-card interaction.
- Google Maps buttons link to Google Maps and therefore require internet access when clicked.
- There are no external CSS/JS library dependencies in the supplied HTML.

## GitHub Pages deployment
1. Create a GitHub repository (for example `wedding-invitation`).
2. Upload the **contents of this folder** to the repository root — upload `index.html`, `.nojekyll`, `assets/`, and optionally `source-original.html`.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)` folder, then save.
6. GitHub will provide a Pages URL similar to `https://USERNAME.github.io/REPOSITORY/`.
7. Open that URL on mobile and desktop to test the invitation before sharing it.

## Important
Keep the `assets` folder in the same relative location as `index.html`. Do not move or rename the image files unless you also update their paths in `index.html`.

## Local test
You can double-click `index.html` for a basic local test. For the most reliable browser behavior, serve the folder with any simple static HTTP server or use GitHub Pages directly.
