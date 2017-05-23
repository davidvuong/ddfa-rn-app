import React, { Component } from 'react';

import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';

import LoginInScreen from './routes/LogInScreen/LogInScreen';
import HomeScreen from './routes/HomeScreen/HomeScreen';

export default class App extends Component {
  render() {
    return (
      <Router sceneStyle={styles.router}>
        <Scene key="root">
          <Scene key="login" component={LoginInScreen} title="login" hideNavBar initial />
          <Scene key="home" component={HomeScreen} title="home" />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  router: {
    paddingTop: 64
  }
});
