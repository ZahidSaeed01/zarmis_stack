# Zarmis Stack

Falling-block puzzle: pieces drop, rows clear, chase your best. Expo + React Native.

| | |
|--|--|
| Package | `com.zarmis.stack` |
| GitHub | `ZahidSaeed01/zarmis_stack` |
| Play Console | Zarmis Stack (`4973719416476253428`) |
| Identity | `brand.config.js` |
| UI | Arena shell — **no bottom tabs** (floating glass chips) |

## Docs

- [Game idea](./doc/idea.md)
- [Brand & icons](./doc/brand-and-icons.md)
- [Game rules](./doc/game-rules.md)
- [End-to-end guide](./doc/end-to-end-guide.md)
- [Android AAB → Play](./doc/ANDROID_AAB.md)
- [Store listing](./doc/store-listing.md)
- [Code structure](./doc/code-structure.md)

## Run locally

```bash
npm install
npm start
```

**Live**
- Classic endless mode (10×20), 7-bag pieces, ghost + next
- Arena home (brand-first) → play pit → pause / result sheets
- Records + Settings as full screens (no tab bar)
- Haptics toggle, local best / stats
- `ADS_ENABLED=false` until AdMob is wired

## Name pattern

`zarmis_stack` folder · `zarmis-stack` slug · `com.zarmis.stack` · scheme `zarmisstack`
