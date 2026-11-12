# Zarmis Stack — name, brand & icons

Locked for idea phase. Values move into `brand.config.js` after scaffold.

---

## Identity

| Key | Value |
|-----|--------|
| Display name | Zarmis Stack |
| Tagline | Drop · Stack · Clear |
| Slug | `zarmis-stack` |
| Scheme | `zarmisstack` |
| Package | `com.zarmis.stack` |
| Category (Play) | Game → Puzzle |
| Tags | Falling blocks, Casual, Single player, Offline |

---

## Family color contrast

Keep each Zarmis game readable in a folder of icons:

| App | Background | Accent | Motif |
|-----|------------|--------|--------|
| Blocks | `#0F172A` slate | `#38BDF8` sky | Soft block cluster |
| Spark | `#0C1B2A` deep blue | `#FF7A59` coral | Gem / spark |
| **Stack** | `#0B1220` near-ink | `#2DD4BF` teal | Stacked bricks / falling piece |

**Why teal:** different from Blocks’ sky blue and Spark’s coral; reads as motion without purple neon cliché.

### Proposed tokens

```text
BRAND_BACKGROUND = #0B1220
BRAND_ACCENT     = #2DD4BF   /* teal — primary CTA / active piece glow */
BRAND_WARN       = #F59E0B   /* amber — danger line / near-top stack */
BRAND_SURFACE    = #111827
BRAND_TEXT       = #F8FAFC
```

Piece colors (board only — not brand accent): classic readable set — cyan, amber, violet, green, red, blue, orange — muted enough for dark board, distinct from each other.

---

## Icon direction

### App icon (launcher)

**One idea, one silhouette:**

- Dark ink square (`#0B1220`)
- Short stack of bricks (2–3) with one piece mid-drop above, teal fill + light top edge
- Subtle downward motion cue — **subtle**, not a sticker collage
- No wordmark on the 1024 icon (family pattern)
- Adaptive icon: same mark, safe zone center ~66%

### Splash

- Same background as brand
- Centered logo mark + “Zarmis Stack” wordmark below
- No gameplay screenshot on splash

### In-app mark

- Small mark for Home hero (brand first, then one headline + Play)
- Reuse icon silhouette so Home ↔ launcher match

### Store

| Asset | Spec (later) |
|-------|----------------|
| Hi-res icon | 512×512 |
| Feature graphic | 1024×500 — dark board strip + stack motif + title |
| Phone screenshots | 1080×1920 — play HUD, clear moment, game over |

---

## Typography (UI)

Match family when scaffolding: expressive display for title on Home; clean sans for HUD numbers (score / level / lines). Follow `game_starter` / Spark once copied.

---

## Motion language (for later build)

1. Soft piece fall (constant tick) + hard-drop blur  
2. Row clear: flash → shrink → stack settle  
3. Level-up pulse on HUD  

Keep motion purposeful (2–3 signatures), not particle spam.

---

## Store voice (draft)

**Short (≤80):**

```text
Falling blocks puzzle. Stack, clear rows — beat your best.
```

**Full (draft):**

```text
Zarmis Stack is a falling-block puzzle for short sessions or long high-score runs.

How to play
• Guide each piece as it falls
• Rotate and place to keep the stack tidy
• Cleared rows vanish and the pile drops
• Speed rises as you level up — how long can you last?

Features
• Classic endless mode
• Ghost preview and next-piece queue
• Offline play — no account
• Clean Zarmis look with juicy clears

Perfect for a quick break or a focused score chase.
```

---

## Don’ts

- Don’t reuse Blocks’ sky-blue tray look as the Stack identity  
- Don’t put “Tetris” (or lookalike spelling) in listing / icons  
- Don’t pack the icon with a full board + UI chrome — silhouette only
