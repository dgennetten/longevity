# Longevity Matrix

A personal supplement record site for K. Douglas Gennetten.

**Live site:** https://longevity.gennetten.org

---

## Purpose

This is a clean, personal record of supplements taken, designed to:
- Help remember what is being taken and why
- Share a public record with others
- Maintain an easy-to-edit data source

**Important:** This is NOT medical advice and NOT a protocol for anyone else. This is one person's personal record.

---

## Tech Stack

- **Vite** - Fast build tool
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- Responsive design (table on desktop, cards on mobile)

---

## Development

### Prerequisites

- Node.js 18+ and npm

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build Locally

```bash
npm run preview
```

---

## Editing Supplement Data

All supplement data lives in **one file**: `src/data/supplements.json`

### JSON Structure

Each supplement has these fields:

```json
{
  "id": 1,
  "name": "Supplement Name",
  "dose": "Amount",
  "schedule": "Frequency",
  "rx": false,
  "description": "What it is",
  "primaryProponent": "Who recommends it",
  "why": "Rationale",
  "notes": "Optional additional context",
  "considering": false
}
```

- **`id`** (number): Unique identifier
- **`name`** (string): Supplement name
- **`dose`** (string): Dosage amount
- **`schedule`** (string): When/how often it's taken
- **`rx`** (boolean): `true` for prescription items, `false` otherwise
- **`description`** (string): What the supplement is
- **`primaryProponent`** (string): Who primarily advocates for it
- **`why`** (string): Reason for taking it
- **`notes`** (string, optional): Additional context or caveats
- **`considering`** (boolean, optional): Set to `true` to display in the "Considering" section

### To Add a New Supplement

1. Open `src/data/supplements.json`
2. Add a new object to the array with a unique `id`
3. Fill in all required fields
4. Save the file
5. Rebuild: `npm run build`
6. Upload the new `dist/` folder to DreamHost

---

## Deployment to DreamHost

DreamHost serves static files via Apache. You'll upload the contents of the `dist/` folder.

### Step-by-Step Deployment

#### 1. Build the Site

```bash
npm run build
```

This creates a `dist/` folder with all static assets.

#### 2. What's in `dist/`

After the build, the `dist/` folder contains:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...other assets
└── favicon.svg (if present)
```

#### 3. Upload to DreamHost

**Option A: FTP/SFTP (Recommended)**

1. Connect to your DreamHost server via SFTP using a client like:
   - FileZilla
   - Cyberduck
   - Transmit
   - Or command-line `sftp`

2. Navigate to your domain's web directory:
   ```
   /home/[username]/longevity.gennetten.org/
   ```

3. **Delete the old contents** in that directory (or back them up first).

4. **Upload everything from the `dist/` folder** to the web root:
   - Upload `index.html`
   - Upload the entire `assets/` folder
   - Upload any other files (like `favicon.svg`)

**Option B: SSH + rsync**

If you have SSH access to DreamHost:

```bash
rsync -avz --delete dist/ [username]@[server].dreamhost.com:~/longevity.gennetten.org/
```

Replace `[username]` and `[server]` with your DreamHost credentials.

#### 4. Verify

Visit **https://longevity.gennetten.org** in your browser. You should see the updated site.

### Apache Configuration (Optional)

If you need custom Apache rules (e.g., redirects, caching), create a `.htaccess` file in the `dist/` folder before uploading, or add it directly on the server.

Example `.htaccess` for better caching:

```apache
# Cache static assets for 1 year
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Don't cache HTML
<FilesMatch "\.(html)$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
</FilesMatch>
```

---

## File Structure

```
.
├── src/
│   ├── data/
│   │   └── supplements.json       ← Edit this to change supplement data
│   ├── types/
│   │   └── Supplement.ts          ← TypeScript type definitions
│   ├── App.tsx                    ← Main React component
│   ├── main.tsx                   ← App entry point
│   └── index.css                  ← Tailwind imports
├── index.html                      ← HTML template
├── package.json                    ← Dependencies and scripts
├── tsconfig.json                   ← TypeScript config
├── vite.config.ts                  ← Vite config
└── README.md                       ← This file
```

---

## Maintenance

### Adding a Supplement

1. Edit `src/data/supplements.json`
2. Run `npm run build`
3. Upload new `dist/` folder to DreamHost

### Updating Styles

- Tailwind classes are in `src/App.tsx`
- Custom CSS (if needed) goes in `src/index.css`

### Troubleshooting

**Issue: Changes not showing up**

- Clear your browser cache
- Verify you uploaded the latest `dist/` folder
- Check the file timestamps on the server

**Issue: Blank page or errors**

- Open browser DevTools Console to see errors
- Verify all files from `dist/` were uploaded
- Check that `index.html` is in the web root

**Issue: Styles not loading**

- Ensure the `assets/` folder was uploaded
- Check file permissions on the server (should be readable)

---

## License

© 2026 K. Douglas Gennetten

---

## Contact

For questions or updates, visit [gennetten.org](https://gennetten.org).
