import React, { Component } from 'react';
import { Provider } from 'react-redux';

import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import Config from './Config';
import ConfigureStore from './store/ConfigureStore';
import getReducer from './Reducer';

import { getNavigator } from './navigator/AppNavigator';

import HttpService from './services/HttpRequestService';
import AuthenticationService from './services/AuthenticationService';
import CheckInService from './services/CheckInService';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.store = ConfigureStore(getReducer());
    this.state = { isLoggedIn: null };

    /* Initialize app services. */
    AuthenticationService.initialize(Config.HOST, HttpService);
    AuthenticationService.getTokenFromStorage().then((token) => {
      CheckInService.initialize(Config.HOST, AuthenticationService, HttpService);
      this.setState({ isLoggedIn: !!token });
    });
  }

  render() {
    // _.isNull(NavigatorComponent) is true if !this.state.isLoggedIn
    const NavigatorComponent = getNavigator(this.state.isLoggedIn);
    return (
      <Provider store={this.store}>
        {NavigatorComponent ? <NavigatorComponent /> : (
          <View styleName="fill-parent horizontal h-center vertical v-center">
            <ActivityIndicator />
          </View>
        )}
      </Provider>
    );
  }
}
