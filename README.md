# Victor Tserovski — Software Portfolio

**Real workflows. Thoughtfully built software.**

I’m Victor, a Senior Data Operations Analyst at NielsenIQ. I build desktop apps, browser extensions and websites with AI coding agents, taking responsibility for the requirements, product decisions and testing.

[View the portfolio](https://victortserovski.github.io/)

## Selected work

- **Nova Control:** Windows software for concrete-plant dispatch, production records and invoicing, with Omron PLC integration and 19 built-in reports. Validated through 524 automated checks against a simulator; real-PLC bench testing is pending.
- **Fake Discount Bulgaria:** A Chrome and Edge extension that records prices across 20 Bulgarian online stores and compares claimed discounts with locally observed history. Price targets are checked on visits. Since version 3.19, recorded price history stays in local browser storage. [Chrome Web Store](https://chromewebstore.google.com/detail/fake-discount-bulgaria-ca/napohmhembobenfaaanfdabjehnjcdci) · [Source](https://github.com/victortserovski/Fake-Discount-BG)
- **Малки Подаръчета:** A personalised stationery storefront with live previews, ten themes across six occasions and a non-binding request flow. The workshop confirms the final design before production. [Live website](https://malkipodaracheta.bg/)
- **SIMA-MA:** A Bulgarian and English manufacturing website with 32 pages, 93 optimised project photos and a browser suite covering seven screen widths. The migration preserves old WordPress links and carries the selected service into the quote form. [Live website](https://sima-ma.com/en/)

## Recognition

- **2nd place, NielsenIQ vibe-coding hackathon:** a solo prototype of an AI pricing agent for sellers. The challenge called for exploring what-if pricing scenarios and preparing quotes outside the CRM. My work involved reverse-engineering Excel workbooks containing about 40 sheets and more than 500,000 formulas, using approximately $7 in AI tokens.

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
