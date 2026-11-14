# Publishing rules · After the Flood IEC review space

This site is the shared review space for partners and language reviewers. It shows two kinds of product, and nothing else:

1. **English products with Adib's design ACC.**
2. **Nepali drafts of those products with a layout ACC** (recorded by Claude on Adib's delegation after a layout check; not a language approval). Each is shown above its English product and labelled *Nepali · draft translation, language review pending · machine translation*, so native Nepali and MHPSS reviewers can read and comment on it.

Not uploaded: English drafts that wait for review or have a revision request, Nepali drafts without layout ACC, proofs and unselected alternatives. They stay in the working folders on Luna.

## Taking content down or putting it up (rule set 14 Nov 2026)

Why this rule exists: on 14 Nov 2026 at 05:00 NPT the 18 Nepali poster drafts were taken down because "not yet proofread" was read as "not approved". One question had also bundled them with two English leaflet drafts under a single option, "only ACC online". Native reviewers lost access until Adib asked for the drafts back at 11:00 NPT.

1. **Removing anything that is live needs Adib's own words naming that item or group.** A general principle such as "online only what has ACC" does not by itself remove a group that an earlier decision of his put up. Ask first.
2. **One question per group, never bundled.** English drafts, Nepali drafts, Health Talk Guides and the translation tab are separate questions. Each option says what changes for reviewers, for example "the Nepali reviewers will no longer see the 18 posters".
3. **"ACC" on this site has two levels.** Design ACC for English; layout ACC for Nepali drafts. A rule about "ACC only" keeps the layout-ACC Nepali drafts unless Adib says otherwise.
4. **"Not yet proofread" is never a reason to take a Nepali draft down from this site.** This site is where native proofreading happens; a draft allowed only after proofreading could never be proofread. Proofreading and clinical clearance are the gate for the later public website.
5. **Read before changing.** Before any change, read this file and the newest `mhpss-governance` / `iec` checkpoints. If a new instruction conflicts with a rule here, quote both to Adib and ask which one wins.
6. **Record every change.** Each publication or takedown gets a checkpoint event with Adib's words (quoted), the time, the list of items and the commit. When a rule changes, this file changes in the same commit.
7. **The later public website is a different place.** Community downloads there carry only products with design ACC plus language, clinical and distribution clearance.

## Chapter 1 owner approval and option mapping

On 12 November 2026, after viewing the comparison, Adib approved all three Chapter 1 posters and explicitly exchanged the B/C identities: **A = panorama r3 (unchanged); B = bench companionship r3.2 (previously C); C = structured composition r3 (previously B)**. All three catalogue entries now carry approval, not pending comparison status. Chapter-front locked copies on Luna use this current mapping; historical source directories and old web asset URLs retain their original identities for traceability. Use versioned current-label assets and the existing catalogue/viewer without changing page structure. This approval does not itself certify clinical, Nepali, rights or print clearance. The earlier pre-approval display exception for these two posters is superseded by this explicit approval; it never applied to other drafts.

## Who does what

| Who | Does |
|---|---|
| Adib | Approves a product (an explicit owner approval or lock) |
| Hermes | After approval: adds the approved poster or leaflet files and one entry in `data/series.json` |
| Claude | Health Talk Guides, translation rows in `data/translation.json`, page structure and QC |

## Before you publish a product

1. The approval is recorded in the `mhpss-governance` / `iec` checkpoint (owner approval or lock), and the chapter front on Luna has the `(locked)` copy.
2. The file you upload is byte-identical to that locked copy (compare SHA-256).
3. Nothing marked PROOF, unselected or pending is uploaded. The only drafts allowed are Nepali drafts with layout ACC (see the top of this file).
4. A Nepali draft goes into the `"ne"` object of its English entry: `version`, `pdf` (online), `print`, `image` or `online_image` and `print_image`, optional `note`. The file must be byte-identical to the layout-ACC file on Luna (print) or its light online copy.

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
- `data/translation.json` holds the current Nepali text of the products on this site: posters from the poster message bank (13 Nov 2026), leaflets from the leaflet message bank (14 Nov 2026), both in `02 Key Messages and Translation/Translation and Proofreading/` on Luna. Every row is a machine draft until a native Nepali and MHPSS reviewer has checked it; SAFETY rows are reviewed first. When a bank changes, the table and the Nepali files change together.
- Keep the disclosure: fictional illustrations, AI-assisted and developed under human direction; not a WHO website.

## Reviewer feedback

- Every product page has a feedback section: reviewers enter their name, organisation and email once, then send comments. Poster pages with more than one approved option also carry a poll (one preferred option per reviewer; the latest choice counts).
- Entries are stored in the review team's database (collection `feedback`). The page can only add entries; it cannot read, change or delete them, so votes and comments are never shown to other reviewers. The rules in force are kept in `backend/firestore.rules`.
- The poll and the comment box appear automatically from `data/series.json`; adding an approved product needs no extra step.

The pages from the October 2026 consultation were removed on 14 Nov 2026; they remain in the repository history.
