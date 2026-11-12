/**
 * Public brand strings — edit `brand.config.js` at the project root only.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const brand = require('../../brand.config.js') as {
  APP_DISPLAY_NAME: string;
  APP_TAGLINE: string;
  APP_SLUG: string;
  APP_SCHEME: string;
  ANDROID_PACKAGE: string;
  BRAND_BACKGROUND: string;
  BRAND_ACCENT: string;
  ADS_ENABLED: boolean;
  PRIVACY_POLICY_URL: string;
};

export const APP_DISPLAY_NAME: string = brand.APP_DISPLAY_NAME;
export const APP_TAGLINE: string = brand.APP_TAGLINE;
export const APP_SLUG: string = brand.APP_SLUG;
export const APP_SCHEME: string = brand.APP_SCHEME;
export const ANDROID_PACKAGE: string = brand.ANDROID_PACKAGE;
export const BRAND_BACKGROUND: string = brand.BRAND_BACKGROUND;
export const BRAND_ACCENT: string = brand.BRAND_ACCENT;
export const ADS_ENABLED: boolean = brand.ADS_ENABLED;
export const PRIVACY_POLICY_URL: string = brand.PRIVACY_POLICY_URL;
