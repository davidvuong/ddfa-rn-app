# ddfa-app

**Welcome to ddfa-app!**

This is the frontend component of the DDFA (Double D Food Adventures) app. It's written in React Native and currently only supports iOS devices. You can checkout the backend [here](https://github.com/davidvuong/ddfa-api).

## Installation

1. Install [React Native](https://facebook.github.io/react-native/docs/getting-started.html)

    ```bash
    brew install nvm
    nvm install 6.10

    brew install watchman
    npm install -g react-native-cli
    ```

1. Clone this repository:

    ```bash
    git clone git@github.com:davidvuong/ddfa-app.git
    ```

1. Install project dependencies:

    ```bash
    npm install
    react-native link
    ```

    **A couple gotchas! when installing new dependencies:**

    1. Pure JavaScript dependencies don't require `react-native link` (e.g. includes assets or custom Java/ObjectiveC code)
    1. Make sure to restart your `packager` after installing a new dependency
    1. Sometimes you also need to restart your simulator, especially when you `react-native link`

    I found it also helped to remove the build directory and recompiling after adding a dependency:

    ```bash
    rm -rf ./ios/build && npm run ios
    ```

    There were times where I got very bizarre errors when adding a new dependency. If all else fails, nuke it and reinstall from scratch:

    ```bash
    rm -rf ./ios/build && rm -rf ./node_modules && npm prune && npm cache clean && npm i
    npm run ios
    ```

1. Run the React Native application:

    I prefer to run the packager myself (more control over my terminal):

    ```bash
    npm run ios
    npm start
    ```

    Alternatively, `react-native run-ios` will open up the `packager` in a new `Terminal.app` window:

    ```bash
    react-native run-ios
    ```

    **NOTE:** If `npm run ios` doesn't start up the simulator app, just open it yourself and then click on the DDFA app.
