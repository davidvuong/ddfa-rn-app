import React, { Component } from 'react';

import { NavigationActions } from 'react-navigation'
import {
  View,
  Text,
  Title,
  Caption,
  Button
} from '@shoutem/ui'
import Icon from 'react-native-vector-icons/Ionicons';

import AuthenticationService from '../../services/AuthenticationService';

export default class FeedScreen extends Component {
  static navigationOptions = {
    title: <Title>Feed</Title>,
    tabBarLabel: ({ focused }) => {
      return <Caption styleName={`h-center ${focused ? 'bold' : ''}`}>feed</Caption>;
    },
    tabBarIcon: () => (
      <Icon name="ios-paper" size={24} />
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
        <Text>Welcome to the feed screen!</Text>
        <Button styleName="secondary" onPress={this.onLogout}>
          <Text>LOGOUT</Text>
        </Button>
      </View>
    );
  }
}
