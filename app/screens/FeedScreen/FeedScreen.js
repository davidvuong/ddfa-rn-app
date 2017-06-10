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
import ActionButton from 'react-native-action-button';

import AuthenticationService from '../../services/AuthenticationService';

export default class FeedScreen extends Component {
  static navigationOptions = {
    title: <Title>Feed</Title>,
    tabBarLabel: () => {
      return <Caption styleName="h-center">Feed</Caption>;
    },
    tabBarIcon: () => (
      <Icon name="ios-paper" size={24} />
    )
  };

  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.onActionButtonPress = this.onActionButtonPress.bind(this);
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

  onActionButtonPress() {
    console.log('I pressed the action button!!!');
  }

  render() {
    return (
      <View styleName="fill-parent">
        <Text>Welcome to the feed screen!</Text>
        <Button styleName="secondary" onPress={this.onLogout}>
          <Text>LOGOUT</Text>
        </Button>

        <ActionButton onPress={this.onActionButtonPress} />
      </View>
    );
  }
}
