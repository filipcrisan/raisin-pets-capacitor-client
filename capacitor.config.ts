import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.raisinpets.app',
  appName: 'raisin-pets-capacitor-client',
  webDir: 'dist/raisin-pets-capacitor-client',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      iosClientId:
        '934410184091-hcbtachkju0mm550j2dpv2qp5fpcddm1.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
  ios: {
    contentInset: 'always',
  },
};

export default config;
