# Publishing rules · After the Flood IEC review space

This site is the shared review space for partners. It shows **only products Adib has approved**. Working drafts, proofs and alternatives that are not approved stay in the working folders (Luna and the cloud workspace) and are never uploaded here.

## Who does what

| Who | Does |
|---|---|
| Adib | Approves a product (an explicit owner approval or lock) |
| Hermes | After approval: adds the approved poster or leaflet files and one entry in `data/series.json` |
| Claude | Health Talk Guides, translation rows in `data/translation.json`, page structure and QC |

## Before you publish a product

1. The approval is recorded in the `mhpss-governance` / `iec` checkpoint (owner approval or lock), and the chapter front on Luna has the `(locked)` copy.
2. The file you upload is byte-identical to that locked copy (compare SHA-256).
3. Nothing marked PROOF, draft, unselected or pending is uploaded.

## How to add an approved product

1. Put the files in `assets/series/ch{N}/`:
   - the exact PDF, named `poster-{Option}-{revision}.pdf`, `leaflet-{revision}.pdf` or `guide-{version}.pdf`;
   - a web preview JPEG, 1100 px wide for posters (1600 px for leaflet spreads, 1400 px for guides), quality about 82.
2. Add one entry to the right list (`poster`, `leaflet` or `guide`) of the chapter in `data/series.json`:

```json
{"label": "Option B", "version": "r4", "approved": "2026-11-11",
 "image": "assets/series/ch2/poster-B-r4.jpg", "pdf": "assets/series/ch2/poster-B-r4.pdf",
 "format": "A3 portrait · community wall poster"}
```

   A leaflet with two sides uses `"images": [outside, inside]` and `"captions": [..., ...]` instead of `"image"`. An optional `"note"` shows a short line under the product.
3. Do not edit `index.html` to add a product; the page reads `data/series.json`.
4. Do not replace an approved file in place. A newer approved revision is a new entry; remove the older entry only when Adib says it is superseded.
5. Write a checkpoint event that names the files, their SHA-256 and the commit.

## Text on this site

- Partner-facing English only: no internal paths, agent names or working notes.
- Translation rows come from the single translation file (`02 Key Messages and Translation/Translation and Proofreading/IEC Series Translation EN-NE - Posters and Leaflets`), exported to `data/translation.json` only for approved products. Safety rows stay blank until a human translator fills them.
- Keep the disclosure: fictional illustrations, AI-assisted and developed under human direction; not a WHO website.

The previous consultation page (9 October 2026) is kept at `archive-2026-10-09.html`.
