import React, { Component } from 'react';
import {
  View,
  Screen
} from '@shoutem/ui';
import {
  TextInput,
  Button,
  Divider,
} from '@shoutem/ui';
import {
  Text,
  Title,
  Caption
} from '@shoutem/ui';

import { NavigationActions } from 'react-navigation';

export default class LoginComponent extends Component {
  static navigationOptions = {
    title: <Title>DDFA Login</Title>
  };

  constructor(props) {
    super(props);

    this.state = { username: null, password: null };

    /* Helpers */
    this.navigateToMainPage = this.navigateToMainPage.bind(this);

    /* Render */
    this.onLogin = this.onLogin.bind(this);
  }

  navigateToMainPage() {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'BottomTabNavigator' })
      ]
    }));
  }

  onLogin() {
    const { username, password } = this.state;
    if (!username || !password) { return; }

    this.props.loginUser(username, password).then(() => {
      this.setState({ password: null });
      this.navigateToMainPage();
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
          <Divider />
          <Button styleName="secondary" onPress={this.onLogin}>
            <Text styleName="bold bright h-center">LOGIN</Text>
          </Button>
          <Divider />
          <Caption styleName="h-center">Double D Food Adventures</Caption>
        </Screen>
      </View>
    );
  }
}
