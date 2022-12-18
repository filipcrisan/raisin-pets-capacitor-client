import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.raisinpets.app',
  appName: 'raisin-pets-capacitor-client',
  webDir: 'dist/raisin-pets-capacitor-client',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      androidClientId: '934410184091-v2meq8n5viva9m212v5h0urutmbfj51q.apps.googleusercontent.com',
      iosClientId: '934410184091-hcbtachkju0mm550j2dpv2qp5fpcddm1.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  },
  server: {
    cleartext: true, // needed for android
  },
};

export default config;
