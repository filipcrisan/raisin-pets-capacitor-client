![raisin-pets-logo](./images/logo-raisin-purple.png?raw=true "Logo")

## about
This is the Capacitor client implementation of the raisin' pets application.

## build, sync & run

The first necessary step is building the application, which is straight-forward, both on iOS and Android. Then, each used project platform has to be synched with the latest build. For actually running the application, a proper device should be plugged into your computer, or a simulator can be used alternatively.

If using a simulator, certain features might not work, due to the simulator's limitations.

### build

For building (both on iOS and Android), run the following command:

```
ng build
```

### sync

For syncing the projects (both iOS and Android), run the following command:

```
npx cap sync
```

### run iOS

For starting the application, run the following command:

```
npx cap run ios
```

### run Android

For starting the application, run the following command:

```
npx cap run android
```