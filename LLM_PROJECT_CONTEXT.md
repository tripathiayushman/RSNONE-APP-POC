# RSN One POC — Project Context

> **Current-state document.** What this app is, how it's put together, and the
> things that will bite you. If you are an agent picking this repo up, read this
> first, then [`MEMORY_BANK.md`](./MEMORY_BANK.md) for *why* it is this way.
>
> Last verified against the code: **2026-08-15**.

---

## 1. What this is

A clickable **Expo / React Native prototype of the RSN One member app**, built to
be shown in a meeting so stakeholders can see how the real product will look and
function. It is a **throwaway demo**, not a codebase that ships.

- **No backend, no database, no network.** All state is an in-memory React
  context that resets when the app reloads.
- **Themed on the real business.** The catalogue, prices, copy, photography and
  logo are the production ones — not invented stand-ins. See §4.
- **Separate repo from `rsn-one`.** Treat the main repo as **read-only** when
  working here; the only relationship is that assets and catalogue data were
  copied out of it.

Related: the real product lives in `D:/Projects/rsn-one` (Next.js web +
NestJS backend + Supabase). `rsn-one/apps/mobile` is an unrelated thin scaffold —
**this** repo is the real mobile design effort.

---

## 2. Stack

| | |
| --- | --- |
| Expo SDK | 57 (`expo ~57.0.9`) |
| React Native | 0.86.2 · React 19.2.3 |
| Navigation | `@react-navigation/native-stack` — one flat stack, 36 routes |
| Styling | `StyleSheet` + `expo-linear-gradient`. No Tailwind, no styled-components |
| Type | Cormorant Garamond (display) + EB Garamond (body), via `@expo-google-fonts` |
| Icons | `@expo/vector-icons` (Feather, plus Ionicons for one filled heart) |
| Feel | `expo-haptics`, `expo-system-ui`, `react-native-safe-area-context` |
| Language | TypeScript 6, `strict` |

**Not installed, deliberately:** `react-native-svg` (so brand art must be PNG),
`expo-updates` (so no EAS Update channels), `expo-router` (the app uses a manual
stack), any state library, any backend client.

`@react-navigation/bottom-tabs` is in `package.json` but **unused** — the tab bar
is a plain component, not a tab navigator.

---

## 3. Architecture

### Shell

Every screen composes the same three pieces:

```
<Screen>            gradient background + safe-area padding (+ optional `keyboard`)
  <TopBar>          "default" = wordmark + icons · "sub" = back + title/wordmark
  ...content...
  <BottomNav>       4 tabs, bag badge, pads for the home indicator
</Screen>
```

- `Screen` takes `edges` (which safe-area sides to pad) and `keyboard` (wraps in
  `KeyboardAvoidingView` — set on the seven screens with text fields).
- `BottomNav` reads `useBag()` directly for its badge, so it needs no props for it.
- **Screens with a `BottomNav` should use `edges={["top"]}`** — the nav pads its
  own bottom inset. Passing `edges` with `bottom` double-pads.

### Navigation

`src/navigation/types.ts` is the single route contract (36 keys);
`RootNavigator.tsx` registers them in one flat `createNativeStackNavigator`.
Headers are disabled globally because every screen draws its own `TopBar`.
`FilterSheet` is the only special case — a `transparentModal` sliding from the
bottom so it overlays `Listing`.

Adding a screen means touching **three** files: the screen, `types.ts`,
`RootNavigator.tsx`.

### State — `src/state/AppState.tsx`

One context, four slices, exposed as hooks:

| Hook | Holds |
| --- | --- |
| `useBag()` | line items, `addItem`/`removeItem`/`updateQty`/`clear`, `count`, `subtotal` |
| `useShelf()` | saved products (wishlist), `toggle`, `isSaved` |
| `useNotifications()` | seeded from `data/notifications.ts`, `markRead` |
| `useOrders()` | seeded from `data/orders.ts` **plus anything placed this session** — `place()`, `getById`, `lastOrderId` |

`useOrders` matters: checkout calls `place()`, so `OrderConfirmed`,
`OrderHistory`, `OrderDetail` and `Account` all show the order the user just
made. Read orders through the hook, **never** import `data/orders.ts` directly
into a screen.

### Design tokens — `src/theme/tokens.ts`

Transcribed 1:1 from `RSN-One-Figma-Mockups.html`. Eight colours, brass is the
only accent, **corner radius is 0 everywhere**, side margin is always 24.
`gradients` are directional approximations of the CSS radial gradients
(`expo-linear-gradient` has no radial support).

---

## 4. Data

All under `src/data/`. Everything is a plain typed array — no fetching.

| File | Contents |
| --- | --- |
| `products.ts` | **31 real products**, 6 real categories, `formatNpr()`, `getProductById`, `countByCategory` |
| `member.ts` | The signed-in member, referral roster, wallet ledger, `formatCny()` |
| `orders.ts` | 4 seeded orders (extended at runtime by `useOrders`) |
| `addresses.ts` | 3 Nepal addresses |
| `filters.ts` | Origin chips + availability chips for the Refine sheet |
| `notifications.ts` / `correspondence.ts` | Inbox rows |

### The catalogue is real

`products.ts` is transcribed from
`rsn-one/apps/web/src/lib/storefront-demo/catalog.ts` — the same slugs, names,
descriptions, categories, origins and NPR prices. The `id` of every product is
also the filename of its photograph.

**Currency is split on purpose:**

- **Goods are NPR** (`formatNpr` → `Rs. 14,750`) — what members pay.
- **The wallet is CNY** (`formatCny` → `¥195.00`) — production holds the
  referral-reward ledger in the house currency. This is correct, not a bug. Do
  not "fix" it by converting to NPR.

### The club model

`member.ts` mirrors the production member portal
(`rsn-one/apps/web/src/app/member/{wallet,referrals}`): referral statuses are
`pending | active | cancelled`, and wallet transaction kinds are the real seven
(`reward_release`, `leadership_bonus`, `community_bonus`, `purchase`, `voucher`,
`withdraw`, `adjustment`).

### Payment reflects reality

There is **no card gateway** in the real product. Checkout offers cash on
delivery (preferred), bank transfer, and card marked *"not yet accepted"*.
Membership is `Rs. 4,999/year`, **waived** while admission is open. Don't add a
fake card form.

---

## 5. Assets

**46 images, ~3.9 MB**, all copied byte-for-byte from
`rsn-one/apps/web/public/{storefront,shop}`. Full provenance table:
[`ASSETS.md`](./ASSETS.md).

Two maps resolve them:

- `src/assets/productImages.ts` — keyed by `Product.id` (31 entries)
- `src/assets/editorialImages.ts` — keyed by free string (`category:<slug>`,
  `home-hero`, `standard-sealed`, …) plus `brandLogo` + `BRAND_LOGO_ASPECT`

Both are `Partial<Record<string, ImageSourcePropType>>`, so a missing key
resolves to `undefined` and `Plate` falls back to its gradient. Nothing breaks
from a partial set.

### ⚠️ Three traps

1. **TypeScript gives zero coverage on asset paths.** `require()` resolves to
   `any` and there is no `declare module "*.jpg"`. A typo passes `tsc` and only
   fails at bundle time. **Always** run `npx expo export --platform web` after
   touching an image map. There is a path-check one-liner in `ASSETS.md`.
2. **`LotRow` only renders an image when `thumb` is set.** Passing `productId`
   without `thumb` silently shows nothing.
3. **The logo PNG was re-saved, not copied.** The production
   `shop/logo-dark.png` is 8-bit palette whose transparent entry carries a teal
   RGB (`#4C6971`), which halos on the warm walnut at small sizes. The copy here
   is true RGBA flooded to cream. If you ever re-copy it from `rsn-one`, redo
   that fix (script logic is described in `ASSETS.md`).

### Brand

`BrandMark` renders the wordmark, always sized by width so it can't distort.
It appears in the `TopBar` (both variants — `brandTitle` swaps the sub-variant
title for the mark), `Splash`, `OrderConfirmed`, `SalonRooms`, and the
`Referrals` invitation card.

App icons are **generated**, not copied: the horizontal lockup is 2.18:1 and
illegible at 48 px, so the launcher uses a stacked "RSN / one" monogram while the
splash keeps the full wordmark.

---

## 6. Building and releasing

### Android — `.github/workflows/android-release.yml`

`route → (eas | gradle) → release`.

- If the `EXPO_TOKEN` secret exists → build on **EAS** (`preview` profile,
  `buildType: apk`).
- If it doesn't → build with **Gradle** on the runner (`expo prebuild` +
  `assembleRelease`). No Expo account or signing secrets needed; the React
  Native template signs `release` with the keystore it ships, which keeps the
  signature stable so builds install over each other — *within* the Gradle
  path. EAS builds are signed with a different, EAS-managed keystore, so
  switching a phone between the two paths needs a one-time uninstall first.

Either way an APK is attached to a GitHub Release (tags `poc-v<N>`).
`android-release-local.yml` is a manual-dispatch job to force the Gradle path
when EAS is configured but slow.

The generated `android/` directory is **gitignored** — CI recreates it. Don't
commit it.

### iOS — `.github/workflows/ios-testflight.yml`

`route → (testflight | simulator)`, triggered by pushes to `main` (docs-only
pushes are ignored) and by manual dispatch. Every iOS build runs on EAS —
there is **no runner fallback**, because Apple signing requires a Developer
account — so the route job hard-fails without `EXPO_TOKEN`. All jobs stay on
`ubuntu-latest`; EAS does the macOS build in its cloud.

The path choice is a line in `mobile/eas.json`, not a secret:

- While `submit.production.ios.ascAppId` is not filled in yet → **pushes skip
  the iOS build entirely** (the route job's summary says why): an automatic
  simulator build would share the free-tier EAS queue and monthly quota with
  the Android APK build that every push already runs. A **manual dispatch**
  builds the `preview` profile for the **iOS Simulator** (`ios.simulator:
  true` — zero Apple credentials) and publishes the `.tar.gz` as a
  **pre-release** tagged `poc-ios-v<N>` with `make_latest: false`, so the
  repo's Latest release stays the installable Android APK. The prefix
  deliberately differs from Android's `poc-v`: run numbers are per-workflow,
  so shared tags would collide. A malformed `eas.json` fails the route step
  with the parse error rather than being mistaken for "not filled in".
- Once `ascAppId` holds a real App Store Connect id → every push builds the
  `production` profile and `--auto-submit`s to **TestFlight**. No Release is
  cut on this path — TestFlight is the channel. Internal testers see the
  build minutes after Apple finishes processing; external testers wait on
  Beta App Review.

The one-time human steps that flip the switch — Developer Program enrollment,
an interactive `eas build` that stores the signing credentials on EAS servers,
a first `eas submit` that yields the `ascAppId` — are in
[`APPLE_SETUP.md`](./APPLE_SETUP.md). CI never holds an Apple credential.

Build numbers come from EAS remote versioning (`appVersionSource: remote` +
`autoIncrement`) — **never** add a `buildNumber` to `app.json`. `app.json`
also sets `ios.infoPlist.ITSAppUsesNonExemptEncryption: false` so TestFlight
builds don't stall on the export-compliance question; don't remove it.

**Expo project:** `@tripathiayushman/rsn-one`
(`projectId` in `app.json` → `extra.eas.projectId`).

---

## 7. Verifying a change

```bash
cd mobile
npx tsc --noEmit                    # types
npx expo export --platform web      # the ONLY check that catches bad asset paths
```

Both must pass. `tsc` alone is not sufficient — see §5 trap 1.

For a visual check: `npx expo start`, then `w` for web or Expo Go on a phone.

---

## 8. What is real vs. staged

| Real | Staged |
| --- | --- |
| Catalogue, prices, copy, origins, members-only flags | Member identity (Aarya Shrestha, GFC-00412) and their orders/referrals/wallet |
| All 46 photographs and the wordmark | Search caps at 8 results |
| Payment model (COD / transfer / card-not-yet) | The Refine sheet's chips **don't filter the grid** |
| Currency split (NPR goods, ¥ wallet) | Sign-in accepts anything |
| Membership terms (Rs. 4,999, waived) | "Copy Code" only swaps its label — no clipboard dep |
| Order placement persists to history | "Share" *does* open the real OS share sheet |

Deliberately still inert: `Withdraw` and `Add a Card` are `disabled` — that reads
as roadmap, not breakage. `Invoice, PDF` on `OrderDetail` has no handler.

---

## 9. Known divergences from the web storefront

Deliberate. Don't "fix" without asking.

- **Palette.** App brass is rose-clay `#c98f7f`; the web moved to gold
  `#C9A25A`. The rose matches the dark-mode logo artwork this app ships.
- **Typography.** Cormorant + EB Garamond here; Fraunces + Inter on the web.
  Swapping reflows all 36 screens for no demo gain.
- **Wallet currency.** ¥, as above.

---

## 10. Conventions

- **Comments explain *why*, not *what*.** Match the surrounding density.
- **No emoji in UI copy.** The house voice is understated and editorial —
  read a few product descriptions in `products.ts` before writing new copy.
- **Icons come from `components/Icon.tsx`.** Never inline a Unicode glyph; the
  mockups did and it tofu'd on Android.
- **Prices are formatted by `formatNpr` / `formatCny`.** Don't hand-roll `$` or
  `Rs.` strings — four local formatters had to be removed once already.
- **No new dependencies** without a reason that survives "it's a throwaway demo".
