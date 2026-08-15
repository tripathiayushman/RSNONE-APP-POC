# RSN One POC — Apple / TestFlight Setup

One-time, human-in-the-loop steps that unlock the TestFlight path of
[`ios-testflight.yml`](.github/workflows/ios-testflight.yml). Until they are
done, pushes skip the iOS build (the route job explains why in the run
summary), and an **iOS Simulator** build — zero Apple credentials needed — can
be started by hand from Actions → *iOS TestFlight* → *Run workflow*; it
publishes as a `poc-ios-v<N>` pre-release. Nothing here blocks day-to-day work.

Everything below is API calls, so any machine works — Windows included. No Mac
is needed until someone wants to *run* a simulator build.

**Cost:** $99/year (Apple Developer Program). **Lead time:** enrollment
approval is usually hours, up to ~48 h.

## 1. Enroll in the Apple Developer Program

Required for TestFlight; not required for the simulator path.

- https://developer.apple.com/programs/enroll/ — $99/year, tied to an Apple ID.
- Approval is usually hours but can take up to ~48 hours, so do this first.
- Note the **Team ID** (Membership page, ten characters like `AB12CD34EF`) —
  it goes into `eas.json` in step 3.

## 2. Let EAS create and store the signing credentials

From any machine, one interactive run. Log in as the project owner
(`tripathiayushman` — the project is `@tripathiayushman/rsn-one`; do **not**
re-run `eas init` or change owner/slug):

```bash
cd mobile
npx eas login
npx eas build --platform ios --profile production
```

The build prompts for your Apple sign-in, registers the bundle id
`com.rsnone.poc`, creates the distribution certificate and provisioning
profile, and **stores them on EAS servers**. That storage is the whole point:
CI never touches an Apple credential, so no new GitHub secrets are needed for
building.

## 3. First submission, then pin the app id

Also one-time interactive, after the step-2 build finishes:

```bash
npx eas submit --platform ios --latest
```

This walks through creating the app record in App Store Connect and stores an
ASC API key on EAS for future non-interactive submits. When it completes it
prints the **ASC App ID** (a numeric id like `6448239211`). Add this block to
`mobile/eas.json`, with it and the Team ID from step 1:

```json
"submit": {
  "production": {
    "ios": {
      "ascAppId": "<the numeric id eas submit printed>",
      "appleTeamId": "<your ten-character Team ID>"
    }
  }
}
```

Commit and push. The workflow's route job reads this field: while `ascAppId`
is missing, pushes skip the iOS build (simulator builds stay manual-only);
once it holds a real numeric id, every push to `main` builds the production
profile and auto-submits to TestFlight. Build numbers are handled by EAS remote versioning
(`appVersionSource: remote` + `autoIncrement`) — never add a `buildNumber` to
`app.json` or bump anything locally.

## 4. The EXPO_TOKEN repository secret

The iOS workflow hard-fails without it — there is no runner fallback, because
Apple signing requires the Developer account, so every iOS build must run on
EAS. The Android EAS path uses the same secret, so it may already exist: check
GitHub → Settings → Secrets and variables → Actions. If not, create a token at
https://expo.dev/settings/access-tokens and add it as `EXPO_TOKEN`.

## 5. Getting builds to testers

App Store Connect → your app → TestFlight:

| Audience | Setup | Wait |
| --- | --- | --- |
| Internal Testing | Add up to 100 members of your ASC team | Minutes after Apple finishes processing; no review |
| External Testing | Create a group, add emails or a public link | Beta App Review, ~24–48 hours the first time |

For a same-day meeting, use internal testers — or skip TestFlight entirely and
run the app in Expo Go (`cd mobile && npx expo start`, scan the QR code).

## 6. Troubleshooting

| Symptom | What's going on |
| --- | --- |
| TestFlight asks about export compliance | Should not happen — `app.json` sets `ITSAppUsesNonExemptEncryption: false`, which answers the question at build time. If it appears, the setting was removed; restore it. |
| "Build number already used" on submit | Should not happen — EAS remote versioning (`autoIncrement`) assigns numbers. If it appears, someone added a local `buildNumber` or built outside EAS; remove the local value. |
| Certificate or profile expired / revoked | `cd mobile && npx eas credentials -p ios` to inspect and regenerate. Distribution certificates last three years; it is the provisioning profile that expires after one. |
| Push didn't submit to TestFlight when it was expected | First check a run actually started — docs-only pushes (only `.md` files) don't trigger the workflow at all. Otherwise `ascAppId` in `mobile/eas.json` is missing or not a plain numeric id — finish step 3. (A JSON typo in `eas.json` fails the route step outright with the parse error, so a *green* route that skipped iOS means the field itself is absent or malformed.) |
