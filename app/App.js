import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { Spinner } from '@shoutem/ui';

import Config from './Config';
import ConfigureStore from './store/ConfigureStore';
import { getNavigator } from './navigator/AppNavigator';

import AuthenticationService from './services/AuthenticationService';
import GoogleMapsService from './services/GoogleMapsService';
import CheckInsService from './services/CheckInsService';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.store = ConfigureStore();
    this.state = { isLoggedIn: null };

    /* Initialize app services. */
    AuthenticationService.initialize(Config.HOST);
    AuthenticationService.token.then((token) => {
      this.setState({ isLoggedIn: !!token });

      GoogleMapsService.initialize(Config.HOST, token);
      CheckInsService.initialize(Config.HOST, token);
    });
  }

  render() {
    // _.isNull(NavigatorComponent) is true if !this.state.isLoggedIn
    const NavigatorComponent = getNavigator(this.state.isLoggedIn);
    return (
      <Provider store={this.store}>
        {NavigatorComponent ? <NavigatorComponent /> : <Spinner />}
      </Provider>
    );
  }
}
