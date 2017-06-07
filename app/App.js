import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Config from './Config';
import ConfigureStore from './store/ConfigureStore';
import AppNavigator from './navigator/AppNavigator';

import AuthenticationService from './services/AuthenticationService';
import GoogleMapsService from './services/GoogleMapsService';
import CheckInsService from './services/CheckInsService';

export default class App extends Component {
  constructor(props) {
    super(props);

    AuthenticationService.initialize(Config.HOST);
    AuthenticationService.token.then((token) => {
      GoogleMapsService.initialize(Config.HOST, token);
      CheckInsService.initialize(Config.HOST, token);
    });
  }

  render() {
    return (
      <Provider store={ConfigureStore()}>
        <AppNavigator />
      </Provider>
    );
  }
}
