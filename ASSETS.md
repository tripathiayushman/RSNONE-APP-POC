# RSN One POC — Asset Provenance

**Nothing here needs generating.** Every image in this POC is a real RSN One
photograph copied byte-for-byte out of the production repo
(`rsn-one/apps/web/public/`). This file records where each came from and how the
app resolves it, so nobody regenerates artwork that already exists.

> This replaces the old `IMAGE-BRIEF.md`, which briefed 14 *invented* products
> (The Bordeaux Tote, an 18k signet, Vetiver de Minuit). That catalogue was
> fiction and has been removed — following it now would overwrite 46 working
> `require()`s with broken paths.

## Where they came from

| POC path | Source (under `rsn-one/apps/web/public/`) | Count |
|---|---|---|
| `mobile/assets/products/<slug>.jpg` | `storefront/products/<slug>.jpg` | 31 |
| `mobile/assets/editorial/category-<slug>.jpg` | `storefront/categories/<slug>.jpg` | 6 |
| `mobile/assets/editorial/home-hero.jpg` | `storefront/home/hero-still.jpg` | 1 |
| `mobile/assets/editorial/provenance.jpg` | `storefront/home/provenance.jpg` | 1 |
| `mobile/assets/editorial/corridor-globe.jpg` | `storefront/home/corridor-globe.jpg` | 1 |
| `mobile/assets/editorial/membership-hero.jpg` | `storefront/membership/mem-hero.jpg` | 1 |
| `mobile/assets/editorial/concierge.jpg` | `storefront/membership/concierge.jpg` | 1 |
| `mobile/assets/editorial/standard-{origin,priced,sealed}.jpg` | `storefront/standards/{origin,priced,sealed}.jpg` | 3 |
| `mobile/assets/brand/rsn-one-logo.png` | `shop/logo-dark.png` (see note) | 1 |

**46 files, ~3.9 MB.** The product filenames are the product ids in
`mobile/src/data/products.ts`, which are the real catalogue slugs from
`rsn-one/apps/web/src/lib/storefront-demo/catalog.ts`.

### The logo was re-saved, not copied verbatim

`shop/logo-dark.png` is an 8-bit palette PNG whose fully-transparent palette
entry carries a **cool teal RGB (`#4C6971`)**. Its ~13k antialiased edge pixels
therefore blend toward teal, which reads as a cold fringe when the mark is drawn
small on the app's warm walnut. The POC copy is re-saved as true RGBA with the
transparent ground flooded to the house cream (`#ede4d3`), so edges blend toward
the lettering. Same artwork, same dimensions (1122×515), no visual change other
than the removed halo.

### App icons are generated, not copied

`assets/icon.png`, `favicon.png`, `splash-icon.png` and the three
`android-icon-*.png` are composited from the wordmark. The horizontal lockup is
2.18:1 — illegible at 48 px and badly clipped by Android's adaptive-icon circle
— so the launcher icons use a **stacked "RSN / one" monogram** (~1.2:1) on the
walnut ground, while the splash keeps the full horizontal wordmark.

If you ever need to rebuild them, convert to RGBA *before* resizing: PIL forces
NEAREST resampling on mode `P` regardless of the filter you pass, and a
`.convert("RGB")` would turn the transparent 88% into an opaque teal rectangle.

## How the app resolves an image

Two maps, both `Partial<Record<string, ImageSourcePropType>>`:

- `mobile/src/assets/productImages.ts` — keyed by `Product.id`
- `mobile/src/assets/editorialImages.ts` — keyed by a free string
  (`category:<slug>`, `home-hero`, `standard-sealed`, …), plus the `brandLogo`
  and `BRAND_LOGO_ASPECT` exports the `BrandMark` component uses

`Plate`, `ProductCard` and `LotRow` all take an optional `source`. A key with no
entry falls back to the gradient placeholder, so a missing image degrades
quietly instead of breaking a screen.

### Two traps worth knowing

1. **`LotRow` only renders an image when `thumb` is set.** Passing `productId`
   without `thumb` shows no picture and no error.
2. **TypeScript gives you zero coverage on these paths.** `require()` resolves
   to `any` and there is no `declare module "*.jpg"` in the tree, so a typo in an
   asset path passes `tsc --noEmit` and only fails at bundle time. Verify with:

   ```bash
   cd mobile
   grep -rhoE "require\(['\"][^'\"]+\.(png|jpe?g)['\"]\)" src \
     | sed -E "s/require\(['\"]//; s/['\"]\)//" | sort -u \
     | while read p; do [ -f "src/assets/$p" ] || echo "MISSING: $p"; done
   ```

   Currently: 46 paths, 46 files on disk, zero missing, zero orphans.

## Adding or replacing an image

1. Drop the file at `mobile/assets/products/<id>.jpg` (id must match a row in
   `src/data/products.ts`) or `mobile/assets/editorial/<key>.jpg`.
2. Add one line to the matching map.
3. Run the path check above, then `npx tsc --noEmit`, then
   `npx expo export --platform web` to confirm Metro resolves it.

No other code changes are needed.
