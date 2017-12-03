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
import AuthenticationService from './services/AuthenticationService'; // eslint-disable-line import/no-named-as-default
import CheckInService from './services/CheckInService';

type Props = {

};

type State = {
  isLoggedIn: ?boolean,
};

const style = {
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default class App extends React.Component<Props, State> {
  store: *;

  constructor(props: Props) {
    super(props);

    this.store = ConfigureStore(getReducer());
    this.state = { isLoggedIn: null };

    /* Initialize app services. */
    const httpService = new HttpService();
    AuthenticationService.initialize('localhost', httpService);
    AuthenticationService.getTokenFromStorage().then((token: string) => {
      CheckInService.initialize('localhost', AuthenticationService, httpService);
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
            <Content contentContainerStyle={style.content}>
              <Spinner color="black" />
            </ Content>
          </Container>
        )}
      </Provider>
    );
  }
}
