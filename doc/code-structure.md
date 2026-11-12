# Zarmis Stack — code structure

```
zarmis_stack/
  brand.config.js          # identity + ads switch
  assets/                  # icon, adaptive, splash, logo-mark
  src/
    App.tsx                # arena navigator (no bottom tabs)
    constants/             # theme, game, copy, brand, layout
    utils/                 # storage, format
    game/                  # board, pieces, bag, scoring, useStackGame
    components/            # ArenaBackdrop, StackBoard, controls, sheets
    screens/               # Arena, Play, Stats, Settings
    settings/              # preferences
    feedback/              # haptics
    navigation/types.ts
```

## UI model

- **Arena** = home (brand + Play + floating Records/Settings chips)
- **Play** = full-pit session with HUD + control dock
- **Stats / Settings** = pushed full screens (back via chip or Android back)
- No `BottomTabBar` — intentional difference from Blocks / Spark / starter
