# Zarmis Stack — Play Console setup checklist

App id: `4973719416476253428` · Package: `com.zarmis.stack`  
Dashboard: https://play.google.com/console/u/0/developers/8087134185437926791/app/4973719416476253428/app-dashboard

## Ready locally

| Asset | Path |
|-------|------|
| App icon 512 | `store/icon-512.png` |
| Feature graphic 1024×500 | `store/feature-graphic.png` |
| Phone screenshots | `store/phone-1.png`, `store/phone-2.png` *(placeholders — replace with real captures before production)* |
| Privacy URL | `https://zarmis.vercel.app/apps/zarmis-stack/privacy` *(added in `zarmis` site catalog — deploy site)* |
| Listing copy | See [`store-listing.md`](./store-listing.md) |

## Store listing (in progress)

Default listing draft text filled:

- **Name:** Zarmis Stack  
- **Short:** Falling blocks puzzle. Stack, clear rows — beat your best.  
- **Full:** from `store-listing.md`

**Still upload in Play UI** (Add assets):

1. App icon → `store/icon-512.png`  
2. Feature graphic → `store/feature-graphic.png`  
3. Phone screenshots (≥2) → `store/phone-1.png`, `store/phone-2.png`  
4. Save → Next → Submit / save draft  

Listing editor:  
https://play.google.com/console/u/0/developers/8087134185437926791/app/4973719416476253428/store-listings/default/edit

## App content (0/11 dashboard tasks)

Work through **Dashboard → Provide game information**:

| Task | Answer for Stack (ads off) |
|------|----------------------------|
| Privacy policy | `https://zarmis.vercel.app/apps/zarmis-stack/privacy` |
| App access / Sign-in | No restrictions / no sign-in required |
| Ads | **No**, app does not contain ads (`ADS_ENABLED=false`) |
| Content rating | IARC questionnaire — casual puzzle, no violence/sex/gambling |
| Target audience | 18+ or general (not Designed for Families) |
| Data safety | No collected data shared; local prefs/scores only; no ads SDK |
| Government apps | No |
| Financial features | No |
| Health | No |
| Category + contact | Game → Puzzle · email `zarmisgroup@gmail.com` |
| Store listing | graphics + text above |

App content overview:  
https://play.google.com/console/u/0/developers/8087134185437926791/app/4973719416476253428/app-content/overview

## Internal testing AAB

```bash
# In Terminal (outside Cursor sandbox)
cd /Users/bb/Projects/applications/zarmis_stack
unset GH_TOKEN GITHUB_TOKEN
gh secret set GOOGLE_PLAY_SERVICE_ACCOUNT_JSON \
  --repo ZahidSaeed01/zarmis_stack \
  < ~/.config/zarmis-hub/play-service-account.json
gh workflow run "Zarmis Stack Android AAB" --repo ZahidSaeed01/zarmis_stack
```

Grant Play upload SA access to this app if the upload 403s.

## Deploy privacy page

Commit/push the `zarmis` site change that adds `zarmis-stack` to `lib/content/apps.ts` + `public/apps/zarmis-stack*.png`, then confirm:

https://zarmis.vercel.app/apps/zarmis-stack/privacy
