/**
 * Expo merges this with `app.json`. Identity fields come from `brand.config.js`
 * so renaming the game is a one-file change.
 */
const brand = require('./brand.config.js');

/** @param {{ config: Record<string, any> }} ctx */
module.exports = ({ config }) => {
  const extra = {
    ...(config.extra ?? {}),
    privacyPolicyUrl: brand.PRIVACY_POLICY_URL,
    adsEnabled: brand.ADS_ENABLED,
  };

  if (brand.EAS_PROJECT_ID) {
    extra.eas = {
      ...(extra.eas ?? {}),
      projectId: brand.EAS_PROJECT_ID,
    };
  } else {
    delete extra.eas;
  }

  /** @type {Array<string | [string, Record<string, unknown>]>} */
  const plugins = [
    'expo-font',
    './plugins/withOptionalPortraitFeature.js',
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '2.2.20',
          enableMinifyInReleaseBuilds: true,
          enableShrinkResourcesInReleaseBuilds: true,
        },
      },
    ],
  ];

  if (brand.ADS_ENABLED) {
    plugins.push([
      'react-native-google-mobile-ads',
      {
        androidAppId: brand.ADMOB_ANDROID_APP_ID,
        iosAppId: brand.ADMOB_IOS_APP_ID,
      },
    ]);
  }

  const androidPermissions = brand.ADS_ENABLED
    ? ['com.google.android.gms.permission.AD_ID']
    : [];

  return {
    ...config,
    name: brand.APP_DISPLAY_NAME,
    slug: brand.APP_SLUG,
    scheme: brand.APP_SCHEME,
    platforms: ['ios', 'android', 'web'],
    splash: {
      ...(config.splash ?? {}),
      backgroundColor: brand.BRAND_BACKGROUND,
    },
    ios: {
      ...(config.ios ?? {}),
      bundleIdentifier: brand.IOS_BUNDLE_ID,
    },
    android: {
      ...(config.android ?? {}),
      package: brand.ANDROID_PACKAGE,
      permissions: androidPermissions,
      adaptiveIcon: {
        ...(config.android?.adaptiveIcon ?? {}),
        backgroundColor: brand.BRAND_BACKGROUND,
      },
    },
    web: {
      ...(config.web ?? {}),
      favicon: './assets/favicon.png',
    },
    plugins,
    extra,
  };
};
