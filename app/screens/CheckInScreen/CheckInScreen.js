import React, { Component } from 'react';

import {
  View,
  Text
} from 'react-native';

export default class CheckInScreen extends Component {
  static navigationOptions = {
    title: 'Check-in',
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <Text>Welcome to the check-in screen!</Text>
      </View>
    );
  }
}
