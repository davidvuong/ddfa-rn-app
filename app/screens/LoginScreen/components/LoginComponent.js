import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Screen,
} from '@shoutem/ui';
import {
  TextInput,
  Button,
  Divider,
  Spinner,
} from '@shoutem/ui';
import {
  Text,
  Caption,
} from '@shoutem/ui';
import { NavigationActions } from 'react-navigation';

import styles from '../Style';
import navigationOptions from '../NavigationOptions';

const propTypes = {
  isLoggingIn: PropTypes.bool,
  loginErrorStatus: PropTypes.string,
};

export default class LoginComponent extends Component {
  static navigationOptions = navigationOptions;

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
        NavigationActions.navigate({ routeName: 'Feed' })
      ]
    }));
  }

  onLogin() {
    const { username, password } = this.state;
    if (!username || !password) { return; }

    this.props.loginUser(username, password).then(() => {
      this.navigateToMainPage();
    }, console.warn);
  }

  render() {
    const { isLoggingIn } = this.props;
    return (
      <View styleName="fill-parent" style={styles.container}>
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
          <Button
            styleName="secondary"
            onPress={this.onLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn && <Spinner style={styles.loginSpinner} />}
            <Text styleName="bold bright h-center">
              {isLoggingIn ? 'LOGGING IN' : 'LOGIN'}
            </Text>
          </Button>
          <Divider />
          <Caption styleName="h-center">Double D Food Adventures</Caption>
        </Screen>
      </View>
    );
  }
}

LoginComponent.PropTypes = propTypes;
