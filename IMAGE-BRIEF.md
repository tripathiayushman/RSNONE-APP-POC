# RSN One — Image Generation Brief

Context for generating product/editorial photography (e.g. via ChatGPT/DALL·E)
and wiring it into the `mobile/` Expo app (e.g. via Codex). The app currently
renders every "photo" as a gradient placeholder (the `Plate` component) — this
brief describes the full set of real images needed to replace those
placeholders, and the exact (already-built) mechanism to drop them in.

The app itself needs no further code changes to support this — the hook
already exists and has been tested end-to-end with the gradient fallback.
Adding an image is a two-step, no-other-code-required process (see
"Integration steps" at the bottom).

## Brand / art direction (use this to write the image-generation prompts)

RSN One is "The House Registry" — a private, invitation-toned catalogue of
heritage leather goods, gold jewelry, and fragrance. Voice: understated,
old-money, editorial rather than commercial. Think a Cartier/Hermès archive
ledger, not a marketplace listing.

Visual language to match (derived from `mobile/src/theme/tokens.ts`):

- **Palette**: warm walnut/rose-brown (#3d281f, #2a1a16) fading to near-black
  (#150d0a, #190f0c), with a single warm rose-gold accent glow (#e0a596 /
  #c98f7f). Backgrounds are never flat black or flat white.
- **Lighting**: moody, low-key, single soft warm light source from the
  upper-left/upper area, falling off into shadow toward the edges and bottom
  — like a single tungsten lamp over a bench in a dim room. Not bright,
  even, studio-white product photography.
- **Composition**: subject centered with generous negative space margin on
  all sides (images get cropped to several different aspect ratios — see
  Technical specs). No visible people, hands, or faces. No text, logos, or
  watermarks baked into the image — all labels are rendered by the app.
- **Subject treatment**: editorial/archival still-life photography or
  photoreal render — cut calfskin, brass hardware, cast gold, glass perfume
  bottles, walnut wood. Textures should read as tactile and handmade, not
  glossy/CGI-perfect.

## Technical specs

- **Master resolution**: 1600×2000 px (4:5 portrait), JPG.
- **Margin**: keep the subject within the center ~70% of the frame — the
  same master image gets cropped (via `resizeMode="cover"`, center-anchored)
  to several different aspect ratios depending on where it's used: a squarish
  hero (~0.93:1), a wide banner (~1.7:1), a 3:4 grid card, and a ~0.82:1
  thumbnail. A tightly-cropped subject will lose edges in some placements.
- **Format**: flat JPG or PNG, no transparency needed (there's always an
  opaque background).
- **File naming**: exactly as given in the manifest tables below — the code
  already expects these exact paths.

## Manifest — 14 product photos

Save to `mobile/assets/products/<id>.jpg`. Source data:
`mobile/src/data/products.ts`.

| id | Name | Category | Prompt brief |
|---|---|---|---|
| `bordeaux-tote` | The Bordeaux Tote | Bags | French calfskin tote, brass hardware, structured silhouette, single hide |
| `signet-yellow` | Signet, 18k Yellow | Jewelry | Unengraved 18k yellow gold signet ring, weighted/substantial |
| `meridian-minaudiere` | The Meridian Minaudière | Evening | Lacquered calfskin evening clutch, hidden brass clasp, deep gloss |
| `vetiver-minuit` | Vetiver de Minuit | Fragrance | 100ml eau de parfum bottle, smoked-cedar/vetiver mood, brass cap |
| `attache-slim` | The Attaché, Slim | Bags | Slim bridle-leather attaché case, waxed finish, single-ledger profile |
| `cavallo-loafer` | The Cavallo Loafer | Footwear | Unlined suede loafer, leather sole, classic last |
| `cufflinks-onyx` | Cufflinks, Onyx & Gold | Jewelry | Black onyx cufflinks set in 18k gold, flush toggle |
| `marchetti-card-case` | The Marchetti Card Case | Small Leather Goods | Alligator card case, hand-painted edges |
| `ambre-imperiale` | Ambre Impériale | Fragrance | 100ml eau de parfum, amber/tobacco mood, brass-tinged |
| `voussoir-belt` | The Voussoir Belt | Accessories | Bridle-leather belt, solid brass keystone buckle |
| `pearl-brass-earrings` | Drop Earrings, Pearl & Brass | Jewelry | Single freshwater pearl below a brushed-brass baton |
| `corsair-weekender` | The Corsair Weekender | Bags | Large calfskin weekender bag, brass hardware, crossbody strap |
| `occhiali-sun-no3` | The Occhiali Sun, No. 3 | Eyewear | Italian acetate sunglasses, brass temple detail, glass lenses |
| `sommelier-case` | The Sommelier Case | Accessories | Two-bottle travel case, walnut shell wrapped in saddle leather |

(Full descriptive copy for richer prompts is in `mobile/src/data/products.ts`.)

## Manifest — 6 archive category/room images

Save to `mobile/assets/editorial/category-<slug>.jpg` (slug = lowercase,
spaces→hyphens, as shown). These appear as the tile background on the
Archive grid/list and the Home page's featured-rooms grid.

| key (in code) | file path | Room name | Prompt brief |
|---|---|---|---|
| `category:Jewelry` | `.../category-jewelry.jpg` | Jewelry | Signets, chains, and stones — a small tray/case of fine jewelry pieces |
| `category:Leather Goods` | `.../category-leather-goods.jpg` | Leather Goods | Cut leather hides, stitching tools, a bench-in-progress feel |
| `category:Ready-to-Wear` | `.../category-ready-to-wear.jpg` | Ready-to-Wear | Folded cloth/garment textures, mill-woven fabric close-up |
| `category:Fragrance` | `.../category-fragrance.jpg` | Fragrance | A row of extrait bottles, warm amber-toned still life |
| `category:Timepieces` | `.../category-timepieces.jpg` | Timepieces | A Swiss lever-escapement watch movement or case, macro |
| `category:Objects of the House` | `.../category-objects-of-the-house.jpg` | Objects of the House | Desk/bar objects — a pen, a flask, a card case, arranged still life |

## Manifest — 4 editorial/atmosphere images

Save to `mobile/assets/editorial/<key>.jpg`.

| key | file path | Used in | Prompt brief |
|---|---|---|---|
| `home-hero` | `.../home-hero.jpg` | Home screen main banner ("Plate No. 014 · Enter Collection") | A signature flagship shot — either the house's best product, or an atelier workbench scene mid-craft |
| `onboarding-reading-room` | `.../onboarding-reading-room.jpg` | Onboarding screen 1 ("Plate No. 001 · The Reading Room") | An heirloom study/library interior — leather armchair, warm lamplight, no people |
| `onboarding-seal` | `.../onboarding-seal.jpg` | Onboarding screen 2 ("Plate No. 002 · The Seal") | Macro shot of a wax seal or embossed stamp being pressed, evoking provenance/authentication |
| `salon-midnight-registry` | `.../salon-midnight-registry.jpg` | The Salon (private/invite-only screen, "Forty pieces · sealed") | Extremely low-key, near-black still life — a locked case or veiled objects, more shadow than light |

## Integration steps (for Codex, once files exist)

The hook is already built — this is intentionally mechanical:

1. Save each generated file to the exact path given above.
2. Open `mobile/src/assets/productImages.ts` and add one line per product,
   e.g.:
   ```
   "bordeaux-tote": require("../../assets/products/bordeaux-tote.jpg"),
   ```
3. Open `mobile/src/assets/editorialImages.ts` and add one line per
   category/editorial image, e.g.:
   ```
   "category:Jewelry": require("../../assets/editorial/category-jewelry.jpg"),
   "home-hero": require("../../assets/editorial/home-hero.jpg"),
   ```
4. No other code changes are needed. `Plate`, `ProductCard`, and `LotRow`
   already prefer the real photo over the gradient placeholder whenever an
   entry exists in either map; anything left out just keeps showing its
   gradient (the app never breaks from a partial image set).
5. Verify with `npx tsc --noEmit` (from `mobile/`) and, ideally,
   `npx expo start --web` to eyeball a few screens (Home, Archive, a
   Product Detail page, and the Salon).
