// @flow
import * as React from 'react';
import { Provider } from 'react-redux';

import {
  Container,
  Content,
  Spinner,
  Root,
} from 'native-base';

import ConfigureStore from './store/ConfigureStore';
import getReducer from './reducers/AppReducer';
import getNavigator from './navigator/AppNavigator';
import loadConfig from './Config';

import HttpService from './services/HttpService';
import AuthenticationService from './services/Api/AuthenticationService';
import CheckInService from './services/Api/CheckInService';
import PhotoService from './services/Api/PhotoService';
import ReviewService from './services/Api/ReviewService';

type Props = {};

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
  store = ConfigureStore(getReducer());
  state = { isLoggedIn: null };
  config = loadConfig();

  constructor(props: Props) {
    super(props);

    // @see: https://github.com/facebook/react-native/issues/9599
    if (typeof global.self === 'undefined') {
      global.self = global;
    }

    /* Initialize app services. */
    const baseApiEndpoint: string = `${this.config.api.host}:${this.config.api.port}`;
    const httpService = new HttpService();

    AuthenticationService.initialize(baseApiEndpoint, httpService);
    AuthenticationService.getTokenFromStorage()
      .then((token: string) => {
        CheckInService.initialize(baseApiEndpoint, AuthenticationService, httpService);
        PhotoService.initialize(baseApiEndpoint, AuthenticationService, httpService);
        ReviewService.initialize(baseApiEndpoint, AuthenticationService, httpService);

        return AuthenticationService.isTokenValid(token);
      })
      .then((isLoggedIn: boolean) => {
        this.setState({ isLoggedIn });
        if (!isLoggedIn) {
          AuthenticationService.logout();
        }
      });
  }

  render() {
    const NavigatorComponent = getNavigator(this.state.isLoggedIn);
    return (
      <Root>
        <Provider store={this.store}>
          {NavigatorComponent ? <NavigatorComponent /> : (
            <Container>
              <Content contentContainerStyle={style.content}>
                <Spinner color="black" />
              </Content>
            </Container>
          )}
        </Provider>
      </Root>
    );
  }
}
