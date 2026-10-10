# Shyam & Sharanya — Wedding Invitation

GitHub Pages-ready static wedding invitation.

## Folder structure

```text
Shyam_Sharanya_GitHub_Pages_Invitation_Final/
├── index.html
├── .nojekyll
├── README.md
├── ASSET-MANIFEST.json
└── assets/
    └── images/
        ├── 01-wedding-ceremony.png
        ├── 02-reception1-legacy.png
        ├── 03-reception2-legacy.jpg
        ├── 04-reception1-illustration.jpg
        ├── 05-reception-stage-illustration.jpg
        ├── 06-hero-garden.png
        ├── 07-reception1-twilight.png
        ├── 08-reception2-twilight.png
        └── 09-couple-photo.jpg
```

## What is included

- `index.html` — complete invitation page.
- `assets/images/` — all 9 unique image assets extracted from the HTML and referenced locally.
- `.nojekyll` — prevents GitHub Pages from applying Jekyll processing.
- `ASSET-MANIFEST.json` — image dimensions, file sizes, hashes, and dependency notes.

## GitHub Pages deployment

1. Create a new GitHub repository.
2. Upload **all files and folders inside this package** to the repository root. Do not upload the ZIP itself as the website.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch (usually `main`) and the `/ (root)` folder.
6. Save.
7. GitHub will publish the invitation at:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`

Allow a few minutes for the first deployment.

## Important

- Keep the `assets` folder in the same location relative to `index.html`.
- Do not rename or move the image files unless you also update the paths in `index.html`.
- The site does not require npm, Node.js, a server, or a build command.
- The Google Maps buttons require an internet connection and open Google Maps externally.
- For a clean invitation URL, use a short repository name such as `shyam-sharanya-wedding`.

## Sharing the invitation

After GitHub Pages is active, send the published Pages URL. Example:

`https://YOUR-USERNAME.github.io/shyam-sharanya-wedding/`

If you later connect a custom domain, GitHub Pages can also serve the same invitation from that domain.
