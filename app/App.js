// @flow
import * as React from 'react';
import { Provider } from 'react-redux';

import {
  Container,
  Content,
  Spinner,
} from 'native-base';

import ConfigureStore from './store/ConfigureStore';
import getReducer from './Reducer';
import getNavigator from './navigator/AppNavigator';

import HttpService from './services/HttpService';
import AuthenticationService from './services/AuthenticationService';
import CheckInService from './services/CheckInService';

type Props = {

};

type State = {
  isLoggedIn: ?boolean,
};

export default class App extends React.Component<Props, State> {
  store: *;

  constructor(props: Props) {
    super(props);

    this.store = ConfigureStore(getReducer());
    this.state = { isLoggedIn: null };

    /* Initialize app services. */
    AuthenticationService.initialize('localhost', HttpService);
    AuthenticationService.getTokenFromStorage().then((token: string) => {
      CheckInService.initialize('localhost', AuthenticationService, HttpService);
      this.setState({ isLoggedIn: !!token });
    });
  }

  render() {
    // _.isNull(NavigatorComponent) is true if !this.state.isLoggedIn
    const NavigatorComponent = getNavigator(this.state.isLoggedIn);
    return (
      <Provider store={this.store}>
        {NavigatorComponent ? <NavigatorComponent /> : (
          <Container>
            <Content>
              <Spinner />
            </ Content>
          </Container>
        )}
      </Provider>
    );
  }
}
