// @flow
import * as React from 'react';

import {
  View,
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

import { navigateAndReset } from '../../../navigator/AppNavigator';
import { Images } from '../../../Images';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  navigation: *,
  loginUser: (string, string) => Promise<*>,
};

type State = {
  isLoggingIn: boolean,
  username: ?string,
  password: ?string,
};

export default class LoginComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = {
    isLoggingIn: false,
    username: null,
    password: null,
  };

  isLoginButtonDisabled = () => {
    return this.state.isLoggingIn || !this.state.username || !this.state.password;
  }

  onPressLogin = () => {
    const { username, password } = this.state;
    if (!username || !password) { return; }

    this.setState({ isLoggingIn: true });
    this.props.loginUser(username, password)
      .then(() => { navigateAndReset('CheckInList'); })
      .catch(() => {
        Toast.show({
          text: 'Login failed - please try again...',
          position: 'bottom',
          buttonText: 'OK',
          type: 'warning',
          duration: 3000,
        });
        this.setState({ ...this.state, password: null, isLoggingIn: false });
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
          <View enableAutoAutomaticScroll={true} style={Styles.inputGroupContainer}>
            <Item style={Styles.inputContainer}>
              <Input
                placeholder='Username'
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
              <Text>{this.state.isLoggingIn ? 'Logging in...' : 'Log In'}</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}
