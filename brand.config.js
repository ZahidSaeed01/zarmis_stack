/**
 * SINGLE SOURCE OF TRUTH — Zarmis Stack identity.
 * Used by app.config.js (Expo), CI artifact names, and src/constants/brand.ts.
 */

/** Public display name (home screen, launcher title). */
const APP_DISPLAY_NAME = 'Zarmis Stack';

/** Short tagline under the name. */
const APP_TAGLINE = 'Drop · Stack · Clear';

/**
 * Expo slug / URL path / CI artifact prefix (kebab-case).
 * Workflow: `.github/workflows/zarmis-stack-android-aab.yml`
 */
const APP_SLUG = 'zarmis-stack';

/** Deep-link / URL scheme (no spaces, lowercase). */
const APP_SCHEME = 'zarmisstack';

/** Android applicationId / Play package name. */
const ANDROID_PACKAGE = 'com.zarmis.stack';

/** iOS bundle identifier. */
const IOS_BUNDLE_ID = 'com.zarmis.stack';

/** Splash + adaptive-icon background. */
const BRAND_BACKGROUND = '#0B1220';

/** Primary accent used in UI. */
const BRAND_ACCENT = '#2DD4BF';

/**
 * Master ads switch — also gates the AdMob native plugin in app.config.js.
 * Keep false until AdMob Android app + units exist.
 */
const ADS_ENABLED = false;

/**
 * AdMob App IDs (not unit IDs). Sample until a real Stack AdMob app exists.
 */
const ADMOB_ANDROID_APP_ID = 'ca-app-pub-3940256099942544~3347511713';
const ADMOB_IOS_APP_ID = 'ca-app-pub-3940256099942544~1458002511';

/** Privacy policy URL shown in store / in-app. */
const PRIVACY_POLICY_URL = 'https://zarmis.vercel.app/apps/zarmis-stack/privacy';

/** EAS project id — fill after `eas init`. Leave empty until then. */
const EAS_PROJECT_ID = '';

module.exports = {
  APP_DISPLAY_NAME,
  APP_TAGLINE,
  APP_SLUG,
  APP_SCHEME,
  ANDROID_PACKAGE,
  IOS_BUNDLE_ID,
  BRAND_BACKGROUND,
  BRAND_ACCENT,
  ADS_ENABLED,
  ADMOB_ANDROID_APP_ID,
  ADMOB_IOS_APP_ID,
  PRIVACY_POLICY_URL,
  EAS_PROJECT_ID,
};
