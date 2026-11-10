# Anime Game: Early Access Landing Page

React + TypeScript + Vite + Tailwind CSS v4. One page: announce the game, collect emails, link to Ko-fi.

## Run
```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build in dist/
```

## Configure (before launch)
1. **Game name and Ko-fi URL**: edit `src/config.ts` (`GAME_NAME`, `KOFI_URL`, `SOCIALS`). Until `KOFI_URL` is a real `https://` link, the Support button stays disabled. Social links are hidden until filled in.
2. **Email collection (Google Sheets)**: the form is **not connected by default** and shows an error until you do this.
   1. Create a new Google Sheet. Open **Extensions > Apps Script**, delete the sample code, paste in `apps-script/Code.gs`, save.
   2. Click **Deploy > New deployment > Web app**. Set *Execute as*: **Me**, *Who has access*: **Anyone**. Deploy and authorize when asked.
   3. Copy the Web app URL (ends in `/exec`).
   4. Copy `.env.example` to `.env`, set `VITE_SIGNUP_ENDPOINT=<that URL>`, then restart `npm run dev` or rebuild.
   5. Submit a real address on the page and confirm a row appears in the `Emails` tab (Timestamp, Email, Language).
   - After editing `Code.gs` later, use **Deploy > Manage deployments > Edit > New version**, or the URL keeps running the old code.
   - Emails are validated in the browser and again in the script; duplicates are ignored.
   - The Web app URL is public by design and can only append validated emails. No secret keys are in the frontend.

## Language
English/Arabic toggle in the nav (remembers choice; defaults to Arabic for Arabic browsers). Copy lives in `src/i18n.ts`. Arabic uses Reem Kufi (headings) and Tajawal (body) from Google Fonts.

## Assets still to supply
- Logo (replace the `?` badge in `Logo` in `src/App.tsx`, and `public/favicon.png`)
- Hero artwork or game screenshots (replace `src/components/HeroVisual.tsx`; currently placeholder silhouettes)
- `public/og-image.png` (1200×630) for social sharing
- Final game name (also in `index.html` title and meta tags)
- Real Ko-fi URL and social links
