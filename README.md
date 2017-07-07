# ddfa-app

**Welcome to ddfa-app!**

This is the frontend component of the DDFA (Double D Food Adventures) app. It's written in JavaScript (ES6) using [React Native](https://facebook.github.io/react-native/) and only supports iOS. You can checkout the backend [here](https://github.com/davidvuong/ddfa-api).

## Installation

1. Install [React Native](https://facebook.github.io/react-native/docs/getting-started.html):

    ```bash
    brew install nvm
    nvm install 6.10

    brew install watchman
    ```

1. Clone this repository:

    ```bash
    git clone git@github.com:davidvuong/ddfa-app.git
    ```

1. Install project dependencies:

    ```bash
    npm install
    ```

    **A couple gotchas! when installing new dependencies:**

    1. Pure JavaScript dependencies don't require `react-native link`
    1. Make sure to restart your `packager` after installing a new dependency
    1. Sometimes you also need to restart your simulator, especially when you `react-native link`

    I found it also helped to remove the build directory and recompiling after adding a dependency:

    ```bash
    rm -rf ./ios/build && npm run build:ios
    ```

    There were times where I got very bizarre errors when adding a new dependency. If all else fails, nuke it and reinstall from scratch:

    ```bash
    rm -rf ./ios/build && rm -rf ./node_modules && npm prune && npm cache clean && npm i && npm run build:ios
    ```

    Less overkill nuke:

    ```bash
    rm -rf ./ios/build && npm run build:ios
    ```

1. Obtain the `.env` file and store it in the root of ddfa-app.

1. Run the React Native application:

    I prefer to run the packager myself (more control over my terminal):

    ```bash
    npm start
    npm run build:ios
    ```

    **NOTE:** If `npm run build:ios` does not start up the simulator app, open it yourself and click on the DDFA app.

## Bundle JS to Run on Device (without development server)

```bash
rm ios/main.jsbundle && rm ios/main.jsbundle.meta && react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output ios/main.jsbundle --reset-cache --verbose
```

... and then follow these steps to disable debug mode: http://facebook.github.io/react-native/releases/0.19/docs/debugging.html#debugging-react-native-apps

## Debugging with Android Studio

- Sometimes the device running app cannot connect to the development server:

    ```bash
    npm start

    adb devices
    adb reverse tcp:8081 tcp:8081
    ```

## iOS Specific Tasks

- You need to install cocoapods to manage hard-iOS dependencies:

    ```bash
    gem install cocoapods
    ```

    Most iOS developers suggest [keeping](https://stackoverflow.com/questions/9446644/what-goes-into-your-gitignore-if-youre-using-cocoapods) [Pod](http://www.egeek.me/2012/12/29/should-i-store-cocoapods-products-in-git/) [artifacts](https://www.dzombak.com/blog/2014/03/including-pods-in-source-control.html) in version control. It results in a larger repository but the advantages outweigh it. You'll only ever need cocapods if you need to install a dependency (so when a React Native plugin requires one).

- You need to set `release` mode to remove development features:

    - Open Xcode (`.xcworkspace` not `.xcodeproj`)
    - Click on PROJECT: DDFA > Info > Configuration > Use "Release"

## 3rd Party Usage Guide

This project uses a few 3rd parties. Below are a few links to help you use the right library/tool to extend DDFA.

1. [`@shoutem/ui`](https://shoutem.github.io/docs/ui-toolkit/introduction) for common React components:

    `@shoutem/ui` provides a few useful components to make cross platform development a bit easier. For example typography (title, subtitle, text), spinners, buttons, text input etc.
    
    `@shoutem/ui` uses `@shoutem/theme` to define the way shoutem components look. For reference, this is the default [theme.js](https://github.com/shoutem/ui/blob/develop/theme.js).

1. [`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons) for icons:

    `react-native-vector-icons` bundle a few icon sets including FontAwesome and Entypo. I'm using [Ionicons](http://ionicframework.com/docs/ionicons/) for all icons in this app.

1. [`eslint`](http://eslint.org/) for linting:

    `eslint` is the preferred linter. The [documentation](http://eslint.org/docs/user-guide/configuring#configuring-rules) does a good job at describing how to alter the `.eslint` config file.

1. [`prop-types`](https://github.com/facebook/prop-types) for component property validation:

    I don't use `flow` in ddfa-app but I do use PropTypes as a way to perform basic validation when passing properties (usually view Redux `Provider`) to a component. See [here](https://github.com/facebook/prop-types#usage) for their example usage.

1. [`react-native-config`](https://github.com/luggit/react-native-config) for sharing environment variables:

    There's a `.env` file at the root of this project containing all environment variables used by iOS and Android versions of DDFA-app. See their README on how to access them in JS, ObjectiveC and Java.

## React Native Pain Points

Below are a few pain points I experienced while developing this React Native app... some have solutions, others do not, some are just rants:

1. **Missing stack traces in your remote JS debug console.**

    According to their own documentation (deep inside `ExceptionsManager.js`):

    ```js
    // Workaround for reporting errors caused by `throw 'some string'`
    // Unfortunately there is no way to figure out the stacktrace in this
    // case, so if you ended up here trying to trace an error, look for
    // `throw '<error message>'` somewhere in your codebase.
    ```

    Most of the time exceptions don't occur due to `throw X`. They typically occur because I done something I didn't think through or because I misused a 3rd party library. More often, these exceptions also tend to be unexpected like `can't access x of undefined`. `ExceptionsManager` catches these exceptions too. Expecting the developer to run `grep -ie 'throw <error_message>'` is not really a workaround...

1. **The inspection tool inside the simulator is extremely limited.**

    You can click on elements in the screen, sort of read the DOM hierarchy and layout but that's about it. You can't really do very much and doesn't seem very useful.

    Turns out there's a way to get React DevTools working. See [here](http://facebook.github.io/react-native/docs/debugging.html#react-developer-tools)... it works fairly well but a little buggy.

1. **Many popular libraries have outdated documentation.**

    I feel like this is just an inherit issue with using bleeding edge technology. Everything breaks, documentation is never up to date or reliable. The solution is to read the source.

    It's also not the fault of React Native. An Experimental Navigation module was released in an older version of React but [a very popular navigation library](https://github.com/aksonov/react-native-router-flux/issues/1289) decided to use it. When it was removed, if you used the latest version of React Native, it would break everything. Why are developers using experimental features and pushing those changes into a stable release? I don't know...

    To add to this point, a lot of popular libraries are also in the middle of a big refactor. It's likely what you write now will no longer be relevant 6 months later. This seems akin to the rest of the JavaScript ecosystem.

1. **When hot reloading sometimes works, it's awesome. However, it doesn't work all the time.**

    This makes the feature unreliable and I'm hesitant to use it. I'll get into a situation where the bug that I thought I fixed is still occurring. Is this because I didn't fix it or because hot reload didn't pick up the change?

1. **The `EDITOR` environment variable isn't respected when opening files in terminal via simulator.**

    The solution is to use `REACT_EDITOR`. It's also super unclear... (https://github.com/facebook/react-native/pull/13443) there's a PR to address it though.

1. **The act of opening files in my _terminal editor_ by clicking on links inside a _smartphone simulator_...**

    IMO, this is possibly the worst part about the React Native development experience. There's one main reason, it breaks my terminal session when I try to reload the app if a file is open.

    The solution is to close your session, open a new terminal, `lsof -i :8081` and `kill -9` the packager. There are also a bunch of other reasons:

    - Why open inside a terminal? Why not inside remote js debugger? Can't use Chrome DevTools
    - Opening more than one file before closing the previous file first also breaks my terminal
    - By default opening the editor in `nano` doesn't jump you to the line and column the error occurred
    - Clicking on the same file more than once spawns a new process instead of replacing the current buffer (accidentally clicking on the same error more than once is a common occurrence)

    ```
    501  7871  7413   0 12:16am ttys001    0:00.00 nano /Users/davidvuong/workspace/ddfa/node_modules/react-native/Libraries/Renderer/src/renderers/shared/stack/reconciler/ReactReconciler.js
    501  7875  7413   0 12:16am ttys001    0:00.00 nano /Users/davidvuong/workspace/ddfa/node_modules/react-native/Libraries/Renderer/src/renderers/shared/stack/reconciler/ReactReconciler.js
    501  7886  7413   0 12:16am ttys001    0:00.00 nano /Users/davidvuong/workspace/ddfa/node_modules/react-native/Libraries/Renderer/src/renderers/shared/stack/reconciler/ReactReconciler.js
    501  7890  7413   0 12:16am ttys001    0:00.00 nano /Users/davidvuong/workspace/ddfa/node_modules/react-native/Libraries/Renderer/src/renderers/shared/stack/reconciler/ReactReconciler.js
    501  7894  7413   0 12:16am ttys001    0:00.00 nano /Users/davidvuong/workspace/ddfa/node_modules/react-native/Libraries/Renderer/src/renderers/shared/stack/reconciler/ReactReconciler.js
    501  7898  7413   0 12:16am ttys001    0:00.00 nano /Users/davidvuong/workspace/ddfa/node_modules/react-native/Libraries/Renderer/src/renderers/shared/stack/reconciler/ReactReconciler.js
    ```
