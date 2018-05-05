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

export default class LoginComponent extends React.Component {
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
    if (!username || !password) { return null; }

    this.setState({ isLoggingIn: true });
    return this.props.loginUser(username, password)
      .then(() => { return navigateAndReset('CheckInList', this.props.navigation); })
      .then(() => {
        // Stops warnings about React Navigation promise not being handled.
        //
        // `navigateAndReset` calls `navigation.dispatch` which returns a promise. I don't need
        // to deal with the promise so this callback is just to tell React Native's yellow text
        // to shut up and be quiet :)
        return null;
      })
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
          <View enableAutoAutomaticScroll style={Styles.inputGroupContainer}>
            <Item style={Styles.inputContainer}>
              <Input
                placeholder='Username'
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={(username) => { this.setState({ username }); }}
                style={Styles.inputStyle}
              />
            </Item>
            <Item style={Styles.inputContainer}>
              <Input
                placeholder='Password'
                secureTextEntry
                onChangeText={(password) => { this.setState({ password }); }}
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
