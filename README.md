# ddfa-rn-app

**Welcome to ddfa-rn-app!**

This is the frontend component of the DDFA (Double D Food Adventures) app. It's written in JavaScript using [React Native](https://facebook.github.io/react-native/) and supports both iOS and Android. You can checkout the backend [here](https://github.com/davidvuong/ddfa-api).

## Installation

1. Install NodeJS and Watchman:

    ```bash
    brew install nvm
    nvm install 6.10

    brew install watchman
    ```

1. Clone this repository:

    ```bash
    git clone git@github.com:davidvuong/ddfa-rn-app.git
    ```

1. Install project dependencies:

    ```bash
    yarn
    ```

    **A couple gotchas! when installing new dependencies:**

    1. Pure JavaScript dependencies don't require `react-native link`
    1. Make sure to restart your `packager` after installing a new dependency
    1. Sometimes you also need to restart your simulator, especially when you `react-native link`

    I found it also helped to remove the build directory and recompiling after adding a dependency:

    ```bash
    rm -rf ./ios/build && yarn run ios
    rm -rf ./android/build && yarn run android
    ```

    There were times where I got very bizarre errors when adding a new dependency. If all else fails, nuke it and reinstall from scratch:

    ```bash
    rm -rf ./node_modules && rm -rf ./ios/build && yarn run ios
    rm -rf ./node_modules && rm -rf ./android/build && yarn run android
    ```

1. Obtain both `.env.local` and `.env.remote` files. The contents look like:

    ```
    GOOGLE_MAPS_API_KEY=...
    API_HOST=...
    API_PORT=...
    ```

1. Run the React Native application:

    I prefer to run the packager myself (more control over my terminal):

    ```bash
    yarn start
    ENVFILE=.env.remote yarn run ios
    ENVFILE=.env.remote yarn run android
    ```

## Bugs

As of writing this, there are a few bugs in some of the dependencies used in this project:

* https://github.com/GeekyAnts/NativeBase/issues/1359
* https://github.com/GeekyAnts/theme/pull/4

For whatever reason, these PRs have yet to be merged into `master` so for now, please manually change them inside `node_modules` (do not forget to also change them inside `/dist/...`).

Another thing: For whatever reason, due to a combination of `native-base` and `shoutem/theme`, unless "remote debugging" is enabled, things will blow up...

## Bundle JS to Run on Device (without development server)

**Android:**

```
react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug

cd android && ./gradlew assembleDebug
cd app/build/outputs/apk/ && adb install app-debug.apk
```

**iOS:**

TODO...

## Debugging with Android Studio

TODO...

## Attributions

Avatar Icons - https://www.flaticon.com/packs/avatar-set
