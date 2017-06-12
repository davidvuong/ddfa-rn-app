import React, { Component } from 'react';
import {
  View,
  Text,
} from '@shoutem/ui'
import navigationOptions from './NavigationOptions';

export default class CheckInScreen extends Component {
  static navigationOptions = navigationOptions;

  render() {
    return (
      <View styleName="fill-parent">
        <Text>Welcome to the check-in screen!</Text>
      </View>
    );
  }
}
