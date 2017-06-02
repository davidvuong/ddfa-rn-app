import React, { Component } from 'react';

import {
  View,
  Text,
  Icon
} from '@shoutem/ui'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarLabel: 'home',
    tabBarIcon: () => (
      <Icon name="photo" />
    )
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View styleName="fill-parent vertical horizontal v-center">
        <Text>Welcome to the home screen!</Text>
      </View>
    );
  }
}
