import React, { Component } from 'react';

import {
  View,
  Text,
  Icon
} from '@shoutem/ui'

export default class CheckInScreen extends Component {
  static navigationOptions = {
    title: 'Check-in',
    tabBarLabel: 'check-in',
    tabBarIcon: () => (
      <Icon name="address-full" />
    )
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View styleName="fill-parent vertical horizontal v-center">
        <Text>Welcome to the check-in screen!</Text>
      </View>
    );
  }
}
