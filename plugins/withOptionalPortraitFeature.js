const { withAndroidManifest, createRunOncePlugin } = require('expo/config-plugins');

/**
 * Expo `orientation: "portrait"` injects
 *   <uses-feature android:name="android.hardware.screen.portrait" />
 * which defaults to required=true and Play flags it as restricting
 * Phone/Tablet/Desktop/PC Games/XR availability.
 * Keep portrait lock in the activity; only mark the feature optional.
 */
const FEATURE = 'android.hardware.screen.portrait';

function withOptionalPortraitFeature(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    if (!manifest['uses-feature']) {
      manifest['uses-feature'] = [];
    }

    const features = manifest['uses-feature'];
    const existing = features.find((f) => f?.$?.['android:name'] === FEATURE);

    if (existing) {
      existing.$['android:required'] = 'false';
    } else {
      features.push({
        $: {
          'android:name': FEATURE,
          'android:required': 'false',
        },
      });
    }

    return config;
  });
}

module.exports = createRunOncePlugin(
  withOptionalPortraitFeature,
  'withOptionalPortraitFeature',
  '1.0.0',
);
