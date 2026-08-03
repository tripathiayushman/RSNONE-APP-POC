# RSN One — Mobile POC

A clickable Expo/React Native prototype of the RSN One member app, built to show
in a meeting **how the real product will look and function**. No backend, no
database, no network — all state is in-memory React context that resets on
reload.

It is themed on the real business: the Global Family Club, the real 31-piece
catalogue in NPR, the real photography, and the real logo.

## Run it

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
|---|---|
| The 31-product catalogue — names, prices (NPR), copy, origin, members-only flags — transcribed from production `storefront-demo/catalog.ts` | Member identity (Aarya Shrestha, GFC-00412) and their orders, referrals and wallet ledger |
| All 46 photographs and the wordmark, copied from production (see [ASSETS.md](ASSETS.md)) | Search results cap at 8; the Refine sheet's chips don't filter the grid |
| Payment model — cash on delivery, bank transfer, card marked "not yet accepted" | Sign-in accepts anything; "Share" opens the real OS share sheet, "Copy Code" only swaps its label |
| Currency split — goods in NPR, the club wallet in the house currency (¥) | Order ids continue the seeded RSN-24xx series |
| Membership terms — Rs. 4,999/year, waived while admission is open | |

Placing an order **does** append to the order history, so the confirmation
screen leads somewhere real rather than dead-ending.

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

```
mobile/
  src/
    screens/     36 route components
    components/  the design system (Plate, LotRow, BrandMark, …)
    data/        products, orders, addresses, member, filters, correspondence
    assets/      the two image maps
    state/       AppState — bag, shelf, notifications, orders
    theme/       tokens transcribed from the Figma mockups
  assets/        46 photographs + brand + generated app icons
RSN-One-Figma-Mockups.html   the original design reference
ASSETS.md                    image provenance and the asset hook
```
