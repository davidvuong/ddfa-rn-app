# ddfa-rn-app

:warning: This has been deprecated. If you're interested in the project please refer to [https://github.com/davidvuong/ddfa](davidvuong/ddfa) :warning:

**Welcome to ddfa-rn-app!**

**DDFA (Double D Food Adventures)** is a mobile app I use to track of restaurants I visit with my partner. It helps us decide where to (or not to) eat, it tracks our rating (food, service, environment), our photos, etc.

The app also provides insights such as how much we pay on average, which of us pays more often, what we usually order, what times we usually eat, how long do we typically eat for etc.

DDFA has 2 components, this component is the frontend mobile app. It's written in JavaScript using [React Native](https://facebook.github.io/react-native/) and supports both iOS and Android. You can checkout the backend API [here](https://github.com/davidvuong/ddfa-api).

## Installation

1. Install NodeJS and Watchman:

    ```bash
    brew install nvm
    nvm install 6.12

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

    **NOTE:** Don't use `localhost` when testing in an Android emulator as it references the emulator and not the host (see [here](https://stackoverflow.com/questions/5528850/how-do-you-connect-localhost-in-the-android-emulator) for more information).

1. Run the React Native application:

    ```bash
    yarn start
    ENVFILE=.env.local yarn run ios
    ENVFILE=.env.local yarn run android
    ```

    **NOTE:** I've tested this against Java v1.8 so if you have another version of Java installed, you should consider using `jenv` to manage your versions::

    ```bash
    brew tap caskroom/versions
    brew install jenv
    brew cask install java8
    jenv add /Library/Java/JavaVirtualMachines/jdk1.8.0_66.jdk/Contents/Home/
    jenv versions
    jenv local 1.8
    java -version
    ```

    Run `jenv doctor` if you're having problems (don't forget to update your profile then run `source`).

## Bundle JS to run on device (without development server)

**Android:**

Change the values of `DDFA_RELEASE_STORE_PASSWORD` and `DDFA_RELEASE_KEY_PASSWORD` in `android/app/gradle.properties`.

```bash
# Keystore: https://developer.android.com/training/articles/keystore.html
keytool -genkey -v -keystore ddfa.keystore -alias ddfa -keyalg RSA -keysize 2048 -validity 10000

cd android && ./gradlew clean && ./gradlew assembleRelease
adb install -r ./app/build/outputs/apk/app-release.apk
```

**iOS:**

TODO...

## Attributions

- Avatar Icons - https://www.flaticon.com/packs/avatar-set
- Image Upload Placeholder - https://www.flaticon.com/packs/photography-15
