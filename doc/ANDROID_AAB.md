# Android AAB → Google Play (GitHub Actions)

| | |
|--|--|
| Workflow | **Actions → Zarmis Stack Android AAB** |
| Triggers | Push to `master`, or **Run workflow** |
| Default | Track `internal`, status `draft` |
| Package | `com.zarmis.stack` |
| Signing | `credentials.json` + `credentials/android/keystore.jks` (in repo) |
| Play secret | `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON` |

## One-time secrets

```bash
gh secret set GOOGLE_PLAY_SERVICE_ACCOUNT_JSON \
  --repo ZahidSaeed01/zarmis_stack \
  < ~/.config/zarmis-hub/play-service-account.json
```

Grant the SA access to **Zarmis Stack** in Play Console → Users and permissions if uploads 403.

## Tracks

| Track | Play Console | Workflow input |
|-------|--------------|----------------|
| Internal | Testing → Internal testing | `internal` (default) |
| Closed | Testing → Closed testing | `alpha` |
| Open | Testing → Open testing | `beta` |
| Production | Production | `production` |

## Ads guard

While `brand.config.js` → `ADS_ENABLED=false`, CI fails if `react-native-google-mobile-ads` is installed or linked. Flip ads on only after AdMob app + units exist.
