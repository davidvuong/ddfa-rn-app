// @flow
import * as React from 'react';
import { NavigationActions } from 'react-navigation';

import {
  Container,
  Header,
  Content,
  Body,
  Text,
  Button,
  Item,
  Input,
  Toast,
} from 'native-base';
import {
  Image,
} from 'react-native';

import { Images } from '../../../Images';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  isLoggingIn: ?boolean,
  loginErrorStatus: ?Error,
  navigation: *,
  loginUser: (string, string) => *,
};

type State = {
  username: ?string,
  password: ?string,
};

export default class LoginComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  constructor(props: Props) {
    super(props);
    this.state = { username: null, password: null };

    (this: any).isLoginButtonDisabled = this.isLoginButtonDisabled.bind(this);
    (this: any).onPressLogin = this.onPressLogin.bind(this);
    (this: any).navigateToMainPage = this.navigateToMainPage.bind(this);
  }

  navigateToMainPage() {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'CheckInList' }),
      ],
    }));
  }

  isLoginButtonDisabled() {
    return this.props.isLoggingIn || !this.state.username || !this.state.password;
  }

  onPressLogin() {
    if (!this.state.username || !this.state.password) { return; }

    this.props.loginUser(this.state.username, this.state.password)
      .then(() => {
        this.navigateToMainPage();
      })
      .catch(() => {
        Toast.show({
          text: 'Login failed - please try again...',
          position: 'bottom',
          buttonText: 'OK',
          type: 'warning',
          duration: 3000,
        });
        this.setState({ ...this.state, password: null });
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text style={Styles.headerTitle}>DDFA Login</Text>
          </Body>
        </Header>
        <Content scrollEnabled={false} bounces={false}>
          <Container style={{ flex: 1 }}>
            <Image source={Images.backgroundImage1} style={Styles.backgroundImage} />
          </Container>
          <Container enableAutoAutomaticScroll={true} style={Styles.inputGroupContainer}>
            <Item style={Styles.inputContainer}>
              <Input
                placeholder='Username'
                value={this.state.username}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={(username: string) => { this.setState({ username }); }}
                style={Styles.inputStyle}
              />
            </Item>
            <Item style={Styles.inputContainer}>
              <Input
                placeholder='Password'
                secureTextEntry
                value={this.state.password}
                onChangeText={(password: string) => { this.setState({ password }); }}
                style={Styles.inputStyle}
              />
            </Item>
            <Button
              rounded
              full
              primary
              disabled={this.isLoginButtonDisabled()}
              onPress={this.onPressLogin}
              style={Styles.loginButton}
            >
              <Text>{this.props.isLoggingIn ? 'Logging in...' : 'Log In'}</Text>
            </Button>
          </Container>
        </Content>
      </Container>
    );
  }
}
