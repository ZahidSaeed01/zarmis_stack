# Zarmis Stack — game idea & product brief

**Phase:** idea lock (no code yet)  
**Folder:** `applications/zarmis_stack/`  
**Genre:** falling-block / line-clear puzzle (Tetris-family)

---

## 1) One-sentence pitch

Shapes fall from the top of a grid; rotate and slide them into place; stack clean rows and clear them before the pile reaches the top.

---

## 2) Why this game (Zarmis family)

We already ship two casual puzzles with the same app shell (Home · Play · Stats · Settings):

| App | Feel | Input |
|-----|------|--------|
| **Blocks** | Calm place-and-clear on an empty board | Drag pieces from a tray |
| **Spark** | Color match cascades, level goals | Tap-swap gems |
| **Stack** | Real-time gravity, skill + timing | Swipe / tap to move & rotate falling pieces |

Same brand, **different muscle**: Stack is the “arcade pulse” title — short sessions, rising speed, high-score chasing.

**Not a clone of Blocks.** Blocks does not drop; Stack does not place static tray pieces.

---

## 3) Name lock

| Field | Value |
|-------|--------|
| Display name | **Zarmis Stack** |
| Folder / repo | `zarmis_stack` |
| Expo slug | `zarmis-stack` |
| Scheme | `zarmisstack` |
| Android / iOS id | `com.zarmis.stack` |
| Tagline | **Drop · Stack · Clear** |

### Why “Stack”

- Short, like Blocks / Spark / Four / Path
- Emphasizes building the pile and keeping it tidy
- Easy Play search + icon metaphor (stacked bricks)

---

## 4) Reference genre (not copy)

Familiar bar: classic falling tetrominoes + modern mobile UX (ghost piece, hold, next queue, soft/hard drop).

We will **not** use trademarked names (Tetris, etc.) in store text, assets, or code comments aimed at listing.

Competitors to study for UX only: mobile falling-block / “block puzzle drop” titles — controls, HUD, game-over flow.

---

## 5) Player fantasy & tone

- **Fantasy:** keep the stack clean; one more perfect clear; beat your best
- **Tone:** clean Zarmis UI, juicy clears, readable board — not neon cyber clutter
- **Session:** 1–5 minutes classic marathon, or short “sprint” challenges later

---

## 6) Core loop (v1)

```
spawn piece at top
  → player moves / rotates while it falls
  → soft drop or hard drop
  → lock into stack
  → if any row is full → clear + score + (optional) gravity settle
  → next piece
  → if spawn blocked → game over
```

Details: see [`game-rules.md`](./game-rules.md).

---

## 7) Modes (phased)

| Mode | v1? | Notes |
|------|-----|--------|
| **Classic** — endless, speed rises with level | ✅ | Main mode |
| **Sprint** — clear N lines as fast as possible | later | Good for leaderboard feel |
| **Zen** — no game over / slow fall | later | Accessibility / chill |
| **Levels / map** | optional | Only if we want Spark-like progression; Classic alone is enough for MVP |

**MVP = Classic only.**

---

## 8) Screens (same shell as family)

1. **Home** — title, Play CTA, best score teaser, brand mark  
2. **Play** — board + HUD (score, level, lines, next piece)  
3. **Stats** — best score, lines cleared, games played  
4. **Settings** — sound, haptics, privacy link, ads toggles later  

Result sheet on game over: score, best, Play again.

---

## 9) Monetization (same pattern as Blocks / Spark)

- AdMob banner (home + game over) + interstitial on “Play again” with gate  
- `ADS_ENABLED=false` until AdMob app + units exist  
- Privacy policy under `zarmis.vercel.app/apps/zarmis-stack/privacy`

---

## 10) Tech (when we scaffold)

- Expo + React Native from `game_starter`
- Identity in `brand.config.js`
- Local persistence for best / stats
- Docs + CI path mirrored from Blocks / Spark (`doc/end-to-end-guide.md` later)

---

## 11) Open decisions (confirm before scaffold)

- [x] Final name: **Zarmis Stack**
- [ ] Palette / icon direction — see [`brand-and-icons.md`](./brand-and-icons.md)
- [ ] Board size: **10×20** (classic) vs **10×16** (phone-friendlier)
- [ ] Controls: swipe + tap rotate vs on-screen buttons vs both
- [ ] Hold piece in v1? (nice-to-have; can ship without)

---

## 12) Definition of “idea done”

- Name + package + folder locked  
- Pitch + differentiation vs Blocks/Spark written  
- Brand/icon direction chosen  
- v1 rules sketch agreed  
- Ready to scaffold app code without redesigning the product mid-flight
