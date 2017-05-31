import React, { Component } from 'react';

import {
  View,
  Text
} from '@shoutem/ui'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
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
