import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import ConfigureStore from './store/ConfigureStore';
import NavigationReducer from './reducers/NavigationReducer';
import AppWithNavigationState from './navigator/AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.store = ConfigureStore(combineReducers({
      navigation: NavigationReducer,
    }), {});
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
