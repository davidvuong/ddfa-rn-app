import React, { Component } from 'react';

import { NavigationActions } from 'react-navigation'
import {
  View,
  Text,
  Title,
  Icon,
  Button,
  Divider
} from '@shoutem/ui'

import AuthenticationService from '../../services/AuthenticationService';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: <Title>Home</Title>,
    tabBarLabel: 'home',
    tabBarIcon: () => (
      <Icon name="photo" />
    )
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.onLogout = this.onLogout.bind(this)
  }

  _navigateToLoginPage() {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' })
      ],
    }));
  }

  onLogout() {
    AuthenticationService.logout().then(() => {
      this._navigateToLoginPage();
    }, console.warn);
  }

  render() {
    return (
      <View styleName="fill-parent vertical horizontal v-center">
        <Text>Welcome to the home screen!</Text>
        <Divider />
        <Button styleName="secondary" onPress={this.onLogout}>
          <Text>LOGOUT</Text>
        </Button>
      </View>
    );
  }
}
