# ddfa-app

**Welcome to ddfa-app!**

This is the frontend component of the DDFA (Double D Food Adventures) app. You can checkout the backend [here](https://github.com/davidvuong/ddfa-api).

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

    *NOTE: Every time you install a new dependency, you need to `react-native link`!*

1. Run the React Native application:

    ```bash
    react-native run-ios
    react-native run-android
    ```
