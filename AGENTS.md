<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

- Keep the tourism experience in `public/erode/index.html`, `style.css`, and `script.js`; the TanStack home route embeds the same standalone page so the preview and downloadable vanilla project stay identical.
- Destination photographs live in `public/erode/images/` and every photo reference (embedded list, hero, and Supabase catalogue rows whose image starts with `/__l5e/`) is rewritten to the local `images/<filename>` path, so the site works on local hosts and offline with no CDN dependency.
- Use external Google Maps directions links rather than an embedded map; directions require no app credentials or paid API calls.
- Store the hosted destination catalogue in Supabase with stable text IDs and unique normalized names; public reads use a publishable-key TanStack server function and RLS, never elevated credentials.
- Deliver the hosted catalogue and selected destination to the vanilla iframe through origin-and-source-checked messages; the shared destination detail route reads the existing Supabase catalogue, while the standalone/offline fallback and localStorage favourites remain available without sign-in.
- Theme: "Kaveri Glass" lives in `public/erode/style.css` (tokens at the top, glass layer in section 15) and `public/erode/effects.js` (optional motion). Icons are Font Awesome Free from the CDN link in `index.html`; `icon()` in `script.js` maps names to FA classes. The logo is `public/erode/logo.svg` (favicon files sit beside it). The site must keep working if `effects.js` fails to load.
