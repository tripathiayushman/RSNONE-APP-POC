# RSN One POC — Memory Bank

> A running record of how this POC was built and **why it is the way it is**.
> [`LLM_PROJECT_CONTEXT.md`](./LLM_PROJECT_CONTEXT.md) describes the *current
> state*; this file is the *history and the reasoning*. Read it before
> relitigating a decision — most of the obvious "improvements" were considered
> and rejected for a stated reason.
>
> Unlike the main repo's memory bank, this one is **not** kept up to date by a
> workflow. Append a dated entry if you do substantial work; otherwise treat
> the entries below as a point-in-time record.

**Last updated: 2026-08-03.**

---

## Where it came from

The repo started as three commits (`4358511` → `bd6da62`): a Figma mockup export
(`RSN-One-Figma-Mockups.html`), an Expo app of 32 screens transcribed from it,
and an image-generation brief.

That original app was **a fictional European luxury house** — "The House
Registry", est. MMXII, selling *The Bordeaux Tote* at *$4,850*, 18k signet
rings and *Vetiver de Minuit*, to a member called Adeline Marchetti in Rome.
Every photograph was a gradient placeholder, and `IMAGE-BRIEF.md` briefed Codex
to generate 14 product shots for those invented goods.

The design system underneath it was genuinely good — tokens transcribed 1:1 from
the mockups, a coherent component set, zero corner radius, a single brass accent.
The *content* was the problem.

---

## 2026-08-03 — Retheme onto the real business

**Commits:** `1c81d85`, `bcb2793` · **Files:** 103 changed, +2168 −635

### The decision

The owner asked for real images and preferred copying them from the main repo
over generating new ones with Codex. Investigating that turned up the actual
finding:

> `rsn-one/apps/web/public/storefront/products/` already held **31 real product
> photographs whose filenames were exactly the real catalogue slugs** — plus
> category, membership, standards and home editorial photography, and the real
> logo.

Which forced the real decision. You cannot drop a photo of Himalayan wildflower
honey into a screen captioned *"Vetiver de Minuit — $340"*. **Reusing the real
images and rethemeing the catalogue are the same act.** So the POC was moved
onto the real business wholesale.

A research pass (7 agents across both repos) reached the same conclusion
independently, and two adversarial reviewers then attacked the plan. Their
findings are folded in below.

### Why the retheme, in stakeholder terms

1. A POC's job is to compress the argument. *The Bordeaux Tote — $4,850* answers
   a question nobody asked and invites the one you don't want: *"wait, is that
   what we sell?"*
2. The real catalogue is **better** demo material — Himalayan honey from Jumla,
   Ilam first-flush tea from one garden, a Kathmandu-Valley wool runner at
   Rs. 41,200. That's the differentiated business.
3. It was the **cheaper** path. The alternative required commissioning 14
   net-new invented-product images that would be thrown away.
4. Rethemed, the POC doubles as a mobile design brief. Invented, it's a mood board.

### What changed

**Catalogue** — `products.ts` rebuilt from
`rsn-one/apps/web/src/lib/storefront-demo/catalog.ts`: 31 real pieces, 6 real
rooms, NPR prices, `origin` on every record, `membersOnly` flags. Orders,
addresses, notifications, correspondence and filters followed (Nepal addresses,
Kathmandu delivery, **origin** facets replacing leather-material facets).

Four separate local `$` formatters were collapsed into one `formatNpr`.

**Photography** — 46 files copied. The logo needed a fix: the production
`shop/logo-dark.png` is 8-bit palette whose transparent entry carries a **teal
RGB (`#4C6971`)**, so its ~13k antialiased edge pixels blended cold against the
warm walnut. Re-saved as true RGBA flooded to cream.

App icons were **generated** rather than copied — the horizontal wordmark is
2.18:1, illegible at 48 px and clipped by Android's adaptive-icon circle. The
launcher now uses a stacked "RSN / one" monogram (~1.2:1); the splash keeps the
full lockup.

**The club** — the POC had *no* membership, wallet or referral screens at all,
which is the actual business model. Added `Membership`, `Wallet`, `Referrals`
and `data/member.ts`, modelled on the production member portal. Plus a third
onboarding card explaining the club up front, and an invitation-code field at
signup so the referral loop closes from both ends.

**Payment** — rewritten to the truth: cash on delivery, bank transfer, card
marked *"not yet accepted"*. The original had an invented card-number form.

### What the reviewers caught

Worth recording because they're the kind of thing that reads as broken in a demo:

- **The confirmation screen dead-ended.** Placing an order showed a receipt and
  the order never appeared anywhere. Added `useOrders()` with `place()`, and
  pointed `OrderHistory` / `OrderDetail` / `Account` at it.
- **The most tappable button did nothing.** "Share the Invitation" and "Copy
  Code" on the referral screen — the growth loop's verb — had no `onPress`.
- **Self-contradiction.** `SalonRooms` printed *"Salon terms are applied at the
  desk, never printed"* two taps from a Splash reading *"priced without
  theatre"*. Rewritten.
- **A stopped clock.** `SalonRooms` had a frozen `06 : 12 : 44` countdown.
- **Arithmetic.** The bag total ignored the 5% duties the checkout charged;
  returns were "30 days" on one screen and "fourteen days" on another.
- **A 4-dot carousel** over a single non-swipeable image.
- Assorted `MMXXII` / `MMXXVI` date fiction contradicting `member.ts`.

### Rejected, with reasons

- **A three-tier price ladder** (guest / member / sold-elsewhere) on every PDP.
  Rejected: the production catalog carries an explicit **"PRICE MOAT"** comment —
  one price field, never leaking another tier's. A "sold elsewhere" figure
  derived as `member × 2.1` is a fabricated comparative price, which is the one
  number in a demo carrying real legal exposure. The *real* design is a single
  illustrative `HonestyBand` on the homepage, so a "The Standard" band was built
  on `Home` instead using the three real `standards/*.jpg` images and the
  storefront's verbatim copy.
- **Deleting the Salon screens.** One reviewer argued for it (two membership
  doors, contradictory copy). Kept instead: `member-exclusive` is a real
  production route, and the design team drew these screens. Fixed the
  contradictions rather than deleting the work.
- **Retokening the palette to the web's gold**, and **swapping the fonts to
  Fraunces + Inter.** Both reflow 36 screens for zero demo gain. Documented as
  deliberate divergences instead.
- **Converting the wallet to NPR.** Production holds the reward ledger in CNY.
  Converting would teach the room something false.

### Documentation

`IMAGE-BRIEF.md` was **deleted**, not updated — it briefed the invented
catalogue, and following it would have overwritten 46 working `require()`s with
14 broken ones. Replaced by `ASSETS.md` (provenance + the asset-path traps) and
a `README.md`.

---

## 2026-08-03 — Native mobile pass + APK pipeline

**Commits:** `236ab41`, `21ca83e`, `a70979d`, `01f2cc1`

The owner asked for the POC to feel like a mobile app rather than a shrunk
website, and for a pushable APK.

### Mobile feel

The biggest real defect: the whole UI drew its icons as **bare Unicode glyphs**
(`⚲ ♡ ⊞ ☰ ⊜ ▾ ← → ✕`). Those render inconsistently across Android OEM fonts and
tofu outright on some devices — a live risk of the demo looking broken on
whatever phone is in the room. All of it now routes through
`components/Icon.tsx` (Feather, which ships with Expo; Ionicons for the one
filled heart).

Also: 40×40 touch targets instead of 15 px glyphs; haptics on save / add-to-bag /
order-confirm / copy-code / tab-switch; a live bag-count badge; a tab bar that
pads for the home indicator instead of assuming 20 px; `<Screen keyboard>` wired
into the seven screens with text fields (**none** handled the keyboard before);
`userInterfaceStyle: "dark"` + `expo-system-ui` so there's no white launch flash.

### Release pipeline — three iterations

1. **Gradle on the runner.** `expo prebuild` + `assembleRelease`, no Expo
   account or signing secrets: the RN template signs `release` with the debug
   keystore it ships, which also keeps the signature stable so builds install
   over each other. Verified locally that prebuild succeeds and that
   `signingConfigs.debug` is what `release` resolves to.
2. **Moved to EAS** at the owner's choice. This snagged twice:
   - `eas.json` used `"// note"` keys as comments. **EAS validates strictly and
     rejects unknown keys** — `eas init` failed outright. Removed.
   - `channel` was set on both profiles; that configures EAS Update, and
     `expo-updates` isn't installed. Removed.
   Project linked as `@tripathiayushman/rsn-one`; EAS auto-generated the Android
   keystore on first build.
3. **Made it degrade gracefully.** The workflow hard-failed on a missing
   `EXPO_TOKEN`, so runs #2 and #3 produced no APK. Once the repo went public,
   Gradle-on-Actions became free and unlimited, so blocking on the secret was
   the wrong call. Restructured to `route → (eas | gradle) → release`: a `route`
   job surfaces whether the secret exists as an output (`secrets` can't be read
   from a job-level `if`), and whichever path runs, the release job publishes
   the APK and names the builder in the notes.

**First successful EAS build:** `e228f79b`, ~11 minutes, `preview` profile.

### Verified

`tsc --noEmit` clean and `expo export --platform web` bundling all assets at
every step. **Not** verified locally: a Gradle APK build — this machine has an
Android SDK but no JDK.

---

## 2026-08-03 — Fixed images rendering at native size instead of their box

**Commits:** (uncommitted at time of writing — see the next commit) · **Files:** `Plate.tsx`, `BrandMark.tsx`, `Search.tsx`

### The bug

The owner reported the app's "background" looked wrong and didn't fit the
screen, and separately that images seemed to be missing entirely. Both turned
out to be the same bug, not two.

`Plate` and `BrandMark` render their photo with `<Image style={StyleSheet.absoluteFill} .../>` — `top/left/right/bottom: 0`, no explicit `width`/`height`. On
native that's enough; Yoga stretches an absolutely-positioned child with all
four insets set to fill its parent regardless of the child's own content.
**On web it is not enough.** Per CSS2.1 §10.3.8, an absolutely positioned
*replaced element* (`<img>` is one) with `width: auto` falls back to its
**intrinsic size** even when `left`/`right` are both `0` — the inset alone
doesn't stretch it the way it stretches a `<div>`. So every photo rendered at
its raw pixel dimensions: the 1122×515 wordmark logo, a 1200×1200 category
photo, an ~2000px-wide product shot — each one dozens of times larger than
its 74–420px box, spilling off the screen or, in a small `LotRow` thumb slot,
overlapping the row above and below it into an unreadable mess. That reads
exactly like "the background doesn't fit" from a glance, and in the smaller
slots it reads like "there's no image there" because what's visible is an
unrecognizable, wildly-cropped fragment rather than a photo.

Neither `tsc --noEmit` nor `expo export --platform web` catches this —
export only proves Metro can *resolve* the asset, not that the browser lays
it out correctly. It only shows up by actually rendering a screen, which
nothing in the verification loop had done since the retheme added real
photography. (See `LLM_PROJECT_CONTEXT.md` §7 — the two commands there are
still the right gate for *build* correctness, this was a *runtime* miss.)

### The fix

Added an explicit `width: '100%', height: '100%'` alongside `absoluteFill` on
both `<Image>` call sites (`Plate.tsx`, `BrandMark.tsx` — the only two places
an `<Image>` exists in this codebase). Confirmed via a headless-browser
inspection of the actual rendered DOM (not just a screenshot) that the image
box now matches its container exactly, then re-screenshotted Splash,
onboarding, Sign In, Home (hero, the Standards band, the room grid), and a
Product Detail page. All render correctly now — no code changes needed
beyond the two `style` arrays; the photography and every `require()` path
were already correct.

Also fixed `Search.tsx`: it passed `productId` to `LotRow` without `thumb`,
the exact trap `ASSETS.md` documents — so search results silently showed no
thumbnail at all. One-line fix (add `thumb`).

### On "missing images"

There aren't any. Diffed every `Product.id` in `products.ts` against
`productImages.ts`: 31 products, 31 photos, zero gaps, zero orphans. Every
`editorialImages` key referenced anywhere in `src/screens` has a matching
entry, 14 for 14. The perception of missing images was entirely the sizing
bug above — small slots rendered an oversized, cropped-to-nothing fragment
that didn't read as a photo. **No new photography is needed**; nothing was
briefed to Codex for image generation as a result.

---

## Standing decisions

| | |
| --- | --- |
| **Don't brief Codex for imagery** | Everything comes from `rsn-one`. See `ASSETS.md`. |
| **`rsn-one` is read-only from here** | This repo only ever copies out of it. |
| **`tsc` alone is not a green light** | It gives zero coverage on `require()` asset paths. Always also run `expo export`. |
| **Don't add dependencies casually** | It's a throwaway demo; the dep list is deliberately short. |
| **Keep the voice** | Understated, editorial, no emoji. Read `products.ts` before writing copy. |
| **Repo is public** | Made public 2026-08-03 so Actions is free and Release links are shareable. |

---

## Open / not done

- The Refine sheet's chips don't actually filter the `Listing` grid — decorative.
- `Withdraw`, `Add a Card` are `disabled` (reads as roadmap); `Invoice, PDF` has
  no handler.
- Search caps at 8 results.
- No iOS distribution. Apple doesn't allow sideloading without a paid developer
  account; use Expo Go for an iPhone.
- No tests. Deliberate for a demo — `tsc` + a bundle are the gate.
