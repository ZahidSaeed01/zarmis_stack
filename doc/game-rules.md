# Zarmis Stack — v1 game rules (sketch)

Idea-phase rules. Tune after first playable prototype.

---

## Board

| Option | Size | Notes |
|--------|------|--------|
| **A — Classic (recommended)** | **10 columns × 20 rows** | Familiar feel; tall on phones — letterbox or slight cell shrink |
| B — Phone compact | 10 × 16 | Easier framing; shorter “runway” |

**Proposal for v1:** Option A (10×20). Revisit if HUD feels cramped on small devices.

Hidden buffer rows above the visible board (2 rows) so rotations near the top don’t clip unfairly.

---

## Pieces

Seven shapes (tetromino set): I, O, T, L, J, S, Z.

- Spawn: centered in top buffer / first visible rows  
- Random bag: 7-bag shuffle (fairer than pure random)  
- **Next queue:** show 1 piece (v1); expand to 3 later if wanted  
- **Hold:** optional post-MVP

---

## Gravity & timing

- Gravity tick starts slow (e.g. ~800–1000 ms per cell)  
- Level = every N lines cleared (e.g. 10) → tick faster  
- Soft drop: faster fall while held  
- Hard drop: instant lock + bonus points  
- Lock delay: short grace after landing so player can slide/rotate (mobile-friendly)

Exact numbers TBD in code constants.

---

## Controls (mobile)

**Proposal: both gestures + optional buttons**

| Action | Gesture | Button (optional HUD) |
|--------|---------|------------------------|
| Move L/R | Swipe left / right | ◀ ▶ |
| Soft drop | Swipe down (hold) | ▼ |
| Hard drop | Fast swipe down / double-tap | ⬇ |
| Rotate CW | Tap board / tap rotate | ↻ |
| Rotate CCW | (later) | ↺ |
| Hold | (later) | Hold |

Ghost piece (shadow) shows landing column — strongly recommended for v1.

---

## Scoring (draft)

| Event | Points (draft) |
|-------|----------------|
| Soft drop | +1 per cell |
| Hard drop | +2 per cell |
| 1 line | 100 × level |
| 2 lines | 300 × level |
| 3 lines | 500 × level |
| 4 lines | 800 × level |

Combo / back-to-back bonuses: nice later, not required for MVP.

---

## Clear & settle

1. After lock, find all full rows  
2. Animate clear  
3. Rows above fall down (no fancy cascade physics in v1)  
4. Spawn next piece  

Game over when the new piece cannot spawn (overlap with stack).

---

## HUD

- Score  
- Level  
- Lines cleared  
- Next piece preview  
- Pause  

---

## Persistence

- Best score  
- Total lines / games (Stats tab)  
- Settings: sound, haptics  

No account / no cloud for v1.

---

## Out of scope for MVP

- Multiplayer / battle  
- Microtransactions / IAP  
- Level map (unless we decide otherwise after Classic feels good)  
- Custom skins marketplace  
- Hold piece / 3-next queue (can add quickly later)
