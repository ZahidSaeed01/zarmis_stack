# Zarmis Stack — Complete End-to-End Guide

Falling-block / line-clear puzzle: product rules, Play Console, AdMob, GitHub (`ZahidSaeed01/zarmis_stack`), GitHub Actions → AAB → Play.

| | |
|--|--|
| **Display name** | **Zarmis Stack** |
| **Local folder** | `applications/zarmis_stack/` |
| **GitHub repo** | `https://github.com/ZahidSaeed01/zarmis_stack` |
| **Android package** | `com.zarmis.stack` *(immutable once on Play)* |
| **Play Console app** | `4973719416476253428` (Zarmis Stack) |
| **Play account** | `zarmisgroup@gmail.com` — see [`docs/PLAY_CONSOLE_ACCESS.md`](../../docs/PLAY_CONSOLE_ACCESS.md) |
| **CI** | [`ANDROID_AAB.md`](./ANDROID_AAB.md) |

---

## Master checklist

### Phase 0 — Decisions

- [x] Name: **Zarmis Stack**
- [x] Package: `com.zarmis.stack`
- [x] Folder / repo: `zarmis_stack`
- [x] Theme: ink `#0B1220` + teal `#2DD4BF`
- [x] UI: arena shell (no bottom tabs)
- [x] Icons / logo generated under `assets/`

### Phase 1 — Accounts & legal

- [x] Play Console → Create app (Game, Free) **Zarmis Stack** (`4973719416476253428`)
- [ ] Grant Play upload SA access if needed
- [ ] AdMob → Android app for `com.zarmis.stack` (later)
- [ ] Privacy policy page live
- [x] Upload keystore under `credentials/android/`
- [ ] GitHub repo + Actions secret `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`

### Phase 2 — Scaffold

- [x] Expo project + brand.config.js
- [x] Classic playable MVP
- [x] Workflow `zarmis-stack-android-aab.yml`

### Phase 3 — Store

- [ ] Listing text + feature graphic + screenshots in local `store/`
- [ ] Content rating / Data safety / Ads declarations
- [ ] Internal testing AAB

---

## Identity lock

| Field | Value |
|-------|--------|
| Display | Zarmis Stack |
| Tagline | Drop · Stack · Clear |
| Slug | zarmis-stack |
| Scheme | zarmisstack |
| Package | com.zarmis.stack |
| Background | `#0B1220` |
| Accent | `#2DD4BF` |
| Warn | `#F59E0B` |

## Differentiation

| App | Mechanic | Chrome |
|-----|----------|--------|
| Blocks | Place tray pieces | Bottom tabs |
| Spark | Match-3 | Bottom tabs / map |
| **Stack** | Gravity + line clear | **Arena + floating chips** |

## Quick links

| | |
|--|--|
| Play Console | https://play.google.com/console |
| Idea | [`idea.md`](./idea.md) |
| Brand | [`brand-and-icons.md`](./brand-and-icons.md) |
