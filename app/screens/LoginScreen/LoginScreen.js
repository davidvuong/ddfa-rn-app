import React, { Component } from 'react';
import _ from 'lodash';

import {
  View,
  Screen,
  TextInput,
  Button,
  Text,
  Title,
  Caption,
  Divider,
  Spinner
} from '@shoutem/ui';
import { NavigationActions } from 'react-navigation'

import AuthenticationService from '../../services/AuthenticationService';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: <Title>DDFA Login</Title>
  };

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      isLoggedIn: null,
    };
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {
    AuthenticationService.isLoggedIn().then((isLoggedIn) => {
      this.setState({ isLoggedIn });
      if (this.state.isLoggedIn) {
        this._navigateToMainPage();
      }
    }, () => {
      this.setState({ isLoggedIn: false });
    });
  }

  _navigateToMainPage() {
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

    AuthenticationService.login(username, password).then(() => {
      this.setState({ password: null });
      this._navigateToMainPage();
    }, console.warn);
  }

  render() {
    if (_.isNull(this.state.isLoggedIn) || this.state.isLoggedIn) {
      return (
        <View styleName="fill-parent vertical v-center">
          <Spinner style={styles.spinner} />
        </View>
      );
    }

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

const styles = {
  spinner: {
    size: 'large'
  },
};
