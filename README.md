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
keystore, so a new one installs over the old one. (One exception: EAS builds
and Gradle-fallback builds are signed with *different* keystores, so switching
between them — including updating a phone that still has a pre-EAS build —
needs a one-time uninstall first.)

You can also trigger a build by hand from the **Actions** tab — *Android APK*
or *iOS TestFlight* → *Run workflow*.

**On an iPhone**, pick by goal:

| You want | Do this |
| --- | --- |
| **iPhone, today, free Apple account** | `cd mobile && npx expo start`, scan the QR in **Expo Go** (add `--tunnel` if the phone and laptop are on different networks) |
| **Send it to someone remote, free** | They install **Expo Go**, then open `exp://u.expo.dev/5f4765ed-b590-4c19-bf19-046570f3cf8b?channel-name=demo&runtime-version=exposdk:57.0.0` on the phone. Refresh the published bundle after changes with `eas update --branch demo --environment preview` |
| **Testers install like a real app** | Finish [APPLE_SETUP.md](APPLE_SETUP.md) ($99/yr Apple Developer Program). Every push then auto-submits to **TestFlight**; internal testers get it minutes after Apple finishes processing |
| **No iPhone at hand** | Run the *iOS TestFlight* workflow by hand — it publishes an **iOS Simulator** build as a `poc-ios-v*` pre-release, which needs a Mac with Xcode to run |

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

[`android-release.yml`](.github/workflows/android-release.yml) picks one of two
paths automatically, then cuts the Release either way — so pushing works out of
the box and configuring EAS later is an upgrade, not a prerequisite.

| | When | Needs |
| --- | --- | --- |
| **EAS** | `EXPO_TOKEN` secret is set | An Expo account + one-time `eas init` |
| **Gradle on the runner** | it isn't | Nothing at all |

Both produce a directly installable APK rather than a Play-Store AAB.

### Optional: switch to EAS

Run once, from `mobile/` (already done for this repo):

```bash
npx eas login
npx eas init       # writes extra.eas.projectId into app.json — commit it
```

Then create a token at **expo.dev → Settings → Access tokens** and add it under
**repo Settings → Secrets and variables → Actions** as `EXPO_TOKEN`. The next
push builds on EAS instead.

### Forcing a Gradle build

[`android-release-local.yml`](.github/workflows/android-release-local.yml) is a
manual-dispatch job for when EAS *is* configured but you don't want to wait for
it — a queued free-tier build the morning of a demo, say. It uploads a workflow
artifact instead of cutting a Release, so it can't collide with the release tags.

Neither path needs signing secrets: on the Gradle path the React Native template
signs `release` with the keystore it ships, which is fine for a prototype and
keeps the signature stable so builds install over each other — *within* the
Gradle path. EAS builds are signed with a different, EAS-managed keystore, so
crossing paths on the same phone needs an uninstall first. The generated
`android/` directory is gitignored; CI recreates it each run.

## How the iOS build works

[`ios-testflight.yml`](.github/workflows/ios-testflight.yml) also picks one of
two paths automatically — but the switch is a line in `mobile/eas.json`, not a
secret: whether `submit.production.ios.ascAppId` holds a real App Store
Connect app id or is not filled in yet.

| | When | Produces |
| --- | --- | --- |
| **TestFlight** | `ascAppId` is a real ASC app id | On every push: a signed `production` build, auto-submitted to TestFlight. No Release is cut — TestFlight *is* the channel |
| **Simulator** | it's not filled in yet — **manual runs only** | An unsigned `preview` build on a `poc-ios-v*` pre-release — zero Apple credentials needed, but a Mac with Xcode to run it |

Both paths build on EAS. While TestFlight is locked, pushes skip iOS entirely
rather than building for the Simulator: an automatic simulator build would
share the free-tier EAS queue and monthly quota with the Android APK build
that every push already runs, and the tarball is only usable on a Mac anyway.
Simulator releases are marked pre-release so the repo's **Latest release**
always stays the installable Android APK.

Unlike Android there is **no runner fallback**: Apple signing requires a
Developer account, so the workflow hard-fails without the `EXPO_TOKEN` secret
rather than degrading. Signing credentials live on EAS servers — stored during
a one-time interactive build — so CI never holds an Apple secret. The tag
prefix is deliberately not Android's `poc-v`: run numbers are per-workflow,
and shared tags would eventually collide.

The one-time human steps — Developer Program enrollment, the interactive
credential build, the first `eas submit` that yields the `ascAppId` to paste
into `mobile/eas.json` — are written up in [APPLE_SETUP.md](APPLE_SETUP.md).

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
LLM_PROJECT_CONTEXT.md       how the app is built — read this first
MEMORY_BANK.md               how it was developed, and why
ASSETS.md                    image provenance and the asset hook
APPLE_SETUP.md               the one-time Apple/TestFlight setup
```

## Docs

- **[LLM_PROJECT_CONTEXT.md](LLM_PROJECT_CONTEXT.md)** — current state:
  architecture, data, state, assets, conventions, and the traps that will bite
  you. Start here.
- **[MEMORY_BANK.md](MEMORY_BANK.md)** — the development history and the
  reasoning behind each decision, including what was *rejected* and why.
- **[ASSETS.md](ASSETS.md)** — where every image came from.
- **[APPLE_SETUP.md](APPLE_SETUP.md)** — the one-time human steps that unlock
  the TestFlight path of the iOS workflow.
