# Victor Tserovski — Software Portfolio

**Real workflows. Thoughtfully built software.**

I’m Victor, a Senior Data Operations Analyst who builds desktop, browser and web software with AI coding agents (Claude Code, Codex, Cursor), then tests it as if it were going to production.

[View the portfolio](https://victortserovski.github.io/)

## Selected work

- **Nova Control:** A Windows program that runs a ready-mix concrete plant’s day, from orders and truckloads to batch records, invoices and 19 reports. It talks in real time to the plant’s existing Omron PLCs. 524 automated checks against a built-in PLC simulator. Feature-complete; a bench test with a real PLC comes next, so it is not yet in production.
- **Fake Discount Bulgaria:** A Chrome and Edge extension that checks “discounts” in 20 Bulgarian online stores against the prices you have actually seen. All data stays in the browser. [Chrome Web Store](https://chromewebstore.google.com/detail/fake-discount-bulgaria-ca/napohmhembobenfaaanfdabjehnjcdci) · [Source](https://github.com/victortserovski/Fake-Discount-BG)
- **Малки Подаръчета:** A storefront for personalised handmade stationery, with live product previews, 60 event-and-theme designs and a non-binding request flow. [Live website](https://malkipodaracheta.bg/)
- **SIMA-MA:** A Bulgarian and English website for an industrial manufacturer: 32 pages, 93 optimised photos, and automated browser checks on every release. [Live website](https://sima-ma.com/en/)

## Recognition

- **2nd place, NielsenIQ vibe-coding hackathon:** working solo, I built a prototype AI pricing agent for sellers, reverse-engineering Excel workbooks with about 40 sheets and 500,000+ formulas. Built with a low-cost coding agent for about $7.

## Site maintenance

Plain HTML and CSS with system fonts, no build step and no libraries. One small inline script swaps a video’s preview image for the real player when someone presses play, so no video data loads up front. The page follows the visitor’s light or dark system setting.

- Edit content in `index.html` and styles in `portfolio.css`. After changing the CSS, bump the `?v=` date on its `<link>` so browsers fetch the new file.
- Published media and the CV live in `assets/`:
  - `portrait.webp` (800 px) and `portrait-small.webp` (400 px): the colour portrait.
  - `<project>.webp` (1280 px) and `<project>-640.webp`: video preview images.
  - Videos: `gifts` and `sima` have a WebM (smaller, used by most browsers) plus an MP4 fallback for older iPhones. `nova.mp4` is MP4 only, since that came out smaller. `discount.webm` is the original recording of an earlier extension version. WebM files keep their seek index at the start of the file (`ffmpeg -c copy -cues_to_front 1`) so skipping works straight away.
  - `social-preview-2026-10.png` (1200 × 630): the image LinkedIn and other sites show for a shared link. If you replace it, give it a new file name, update the `og:image` and `twitter:image` tags, and refresh the preview with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).
- Project READMEs and raw recordings in `assets/` stay local (see `.gitignore`).
- Preview locally with `python .claude/serve.py 8000`, then open `http://localhost:8000/`. (Python’s built-in `python -m http.server` can’t skip within videos because it ignores range requests; GitHub Pages handles them, so the live site is fine.)
- GitHub Pages publishes the `main` branch from the repository root. `.nojekyll` keeps it a plain static site.

## License

All rights reserved. Copyright Victor Tserovski.
