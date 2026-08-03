# RSN One — Mobile POC

A clickable Expo/React Native prototype of the RSN One member app, built to show
in a meeting **how the real product will look and function**. No backend, no
database, no network — all state is in-memory React context that resets on
reload.

It is themed on the real business: the Global Family Club, the real 31-piece
catalogue in NPR, the real photography, and the real logo.

## Get the app on a phone

**Download the APK from [Releases](../../releases)** — every push to `main`
builds one and publishes it. Open it on an Android phone, allow the
install-from-unknown-sources prompt, done. Each build is signed with the same
keystore, so a new one installs over the old one.

You can also trigger a build by hand from the **Actions** tab → *Android APK* →
*Run workflow*.

> iOS has no equivalent — Apple does not allow installing outside the App Store
> without a paid developer account. For an iPhone in the meeting, run
> `npx expo start` and open it in **Expo Go**.

## Run it locally

```bash
cd mobile
npm install
npx expo start          # then press w for web, or scan the QR in Expo Go
```

Verify a change:

```bash
npx tsc --noEmit                    # types
npx expo export --platform web      # proves Metro resolves every asset
```

## How the APK is built

[`android-release.yml`](.github/workflows/android-release.yml) builds on **EAS**
(`preview` profile → `buildType: apk`, so it's directly installable rather than
a Play-Store AAB), downloads the artifact, and attaches it to a Release.

### One-time setup

Run once, from `mobile/`:

```bash
npx eas login      # your Expo account
npx eas init       # writes extra.eas.projectId into app.json — commit it
```

Then add the repo secret so CI can build as you:

1. Create a token at **expo.dev → Settings → Access tokens**.
2. **Repo → Settings → Secrets and variables → Actions → New repository secret**
3. Name it `EXPO_TOKEN`, paste the token.

The workflow fails fast with a clear message if either step is missing, rather
than dying deep inside an EAS command.

### Fallback with no Expo account

[`android-release-local.yml`](.github/workflows/android-release-local.yml) builds
the same APK on the GitHub runner with `expo prebuild` + `gradlew assembleRelease`
— no Expo login, no EAS quota. It's **manual-dispatch only** and uploads a
workflow artifact instead of creating a Release, so it can't collide with the
EAS release tags. Use it if EAS is unavailable.

It needs no signing secrets either: the React Native template signs its
`release` build type with the keystore it ships. Fine for a prototype, and the
signature stays stable so builds install over each other.

The generated `android/` directory is gitignored; CI recreates it each run.

## What it demonstrates

**36 screens** across four arcs. Two walkthroughs cover the whole product:

**Walk A — buying something.** Splash → three onboarding cards (the registry,
sourcing at origin, the club) → sign in → Registry home → a room → a product →
bag → carriage → **cash on delivery** → review → confirmation → order history →
order tracking.

**Walk B — the club.** Account → Membership (standing, what admission grants,
the fee and its waiver) → Invitations (your code, who joined on it, what each
credited) → Wallet (referral rewards, bonuses, spend).

Walk B is the one that explains the business. Walk A alone reads as a shop.

## What is real vs. staged

| Real | Staged |
| --- | --- |
| The 31-product catalogue — names, prices (NPR), copy, origin, members-only flags — transcribed from production `storefront-demo/catalog.ts` | Member identity (Aarya Shrestha, GFC-00412) and their orders, referrals and wallet ledger |
| All 46 photographs and the wordmark, copied from production (see [ASSETS.md](ASSETS.md)) | Search results cap at 8; the Refine sheet's chips don't filter the grid |
| Payment model — cash on delivery, bank transfer, card marked "not yet accepted" | Sign-in accepts anything; "Share" opens the real OS share sheet, "Copy Code" only swaps its label |
| Currency split — goods in NPR, the club wallet in the house currency (¥) | Order ids continue the seeded RSN-24xx series |
| Membership terms — Rs. 4,999/year, waived while admission is open | |

Placing an order **does** append to the order history, so the confirmation
screen leads somewhere real rather than dead-ending.

## Built for a phone, not a shrunk website

- **Real icons, not Unicode.** The mockups used bare glyphs (`⚲ ♡ ⊞ ☰ ⊜ ▾`),
  which render inconsistently across Android OEM fonts and tofu on some devices.
  Everything now routes through [`Icon.tsx`](mobile/src/components/Icon.tsx)
  (Feather, which ships with Expo).
- **Touch targets.** Every bar action is a 40×40 hit area with extra `hitSlop`,
  rather than a 15px glyph.
- **Haptics** on the moments that matter — saving to the shelf, adding to the
  bag, confirming an order, copying the invitation code, switching tabs.
- **A live tab bar.** The bag tab carries a count badge, and the bar pads for the
  home indicator instead of assuming a fixed 20px.
- **Keyboard handling.** Every screen with a text field lifts above the keyboard
  (`<Screen keyboard>`), which the form screens previously did not.
- **Native gestures** — swipe-back is on via the native stack, and the modal
  filter sheet slides from the bottom.
- **Dark by default.** `userInterfaceStyle: "dark"` with `expo-system-ui`, so the
  system chrome matches the walnut ground and there is no white flash on launch.

## Known divergences from the web storefront

Deliberate, not oversights:

- **Palette.** The app's brass is rose-clay `#c98f7f`; the web storefront moved
  to gold `#C9A25A`. The rose matches the dark-mode logo artwork this app ships,
  so it was kept.
- **Typography.** Cormorant Garamond + EB Garamond here; Fraunces + Inter on the
  web. Swapping would reflow all 36 screens for no demo gain.
- **Wallet currency.** Shown in ¥ because that is what production holds the
  reward ledger in. Converting it to NPR would teach the room something false.

## Layout

```text
mobile/
  src/
    screens/     36 route components
    components/  the design system (Plate, LotRow, BrandMark, Icon, …)
    data/        products, orders, addresses, member, filters, correspondence
    assets/      the two image maps
    state/       AppState — bag, shelf, notifications, orders
    theme/       tokens transcribed from the Figma mockups
  assets/        46 photographs + brand + generated app icons
RSN-One-Figma-Mockups.html   the original design reference
ASSETS.md                    image provenance and the asset hook
```
