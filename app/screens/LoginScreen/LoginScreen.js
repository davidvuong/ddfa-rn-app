import React, { Component } from 'react';

import {
  View,
  Screen,
  TextInput,
  Button,
  Text
} from '@shoutem/ui';
import { NavigationActions } from 'react-navigation'

import AuthenticationService from '../../services/AuthenticationService';

export default class LoginScreen extends Component {
  static navigationOptions = {
    headerMode: 'none',
  };

  constructor(props) {
    super(props);

    this.state = { username: null, password: null };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { username, password } = this.state;
    if (!username || !password) { return; }

    AuthenticationService.login(username, password).then(() => {
      this.setState({ password: null });

      // Replace the navigation stack, start from the Home page.
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      }));
    }, console.warn);
  }

  render() {
    return (
      <View styleName="fill-parent">
        <Screen>
          <TextInput
            onChangeText={(username) => this.setState({ username })}
            placeholder="Username"
            value={this.state.username}
          />
          <TextInput
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            value={this.state.password}
            secureTextEntry
          />
          <Button styleName="secondary" onPress={this.onLogin}>
            <Text styleName="bold bright h-center">LOGIN</Text>
          </Button>
        </Screen>
      </View>
    );
  }
}
