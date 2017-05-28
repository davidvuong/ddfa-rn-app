import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Config from './Config';
import AuthenticationService from './services/AuthenticationService';

import ConfigureStore from './store/ConfigureStore';

import {
  TabNavigationReducer,
  StackNavigationReducer
} from './reducers/NavigationReducer';

import AppNavigator from './navigator/AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.store = ConfigureStore(combineReducers({
      tabNavigation: TabNavigationReducer,
      stackNavigation: StackNavigationReducer,
    }), {});

    AuthenticationService.initialize(Config.HOST);
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppNavigator />
      </Provider>
    );
  }
}
