# ddfa-rn-app

**Welcome to ddfa-rn-app!**

This is the frontend component of the DDFA (Double D Food Adventures) app. It's written in JavaScript using [React Native](https://facebook.github.io/react-native/) and supports both iOS and Android. You can checkout the backend [here](https://github.com/davidvuong/ddfa-api).

## Installation

1. Install [React Native](https://facebook.github.io/react-native/docs/getting-started.html):

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

## Bundle JS to Run on Device (without development server)

TODO...

## Debugging with Android Studio

TODO...

## iOS Specific Tasks

TODO...
