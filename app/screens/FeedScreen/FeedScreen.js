import React, { Component } from 'react';
import {
  View,
  Text,
} from '@shoutem/ui'
import ActionButton from 'react-native-action-button';
import navigationOptions from './NavigationOptions';

export default class FeedScreen extends Component {
  static navigationOptions = navigationOptions;

  constructor(props) {
    super(props);

    this.onActionButtonPress = this.onActionButtonPress.bind(this);
  }

  onActionButtonPress() {
    this.props.navigation.navigate('LocationPicker');
  }

  render() {
    return (
      <View styleName="fill-parent">
        <Text>Welcome to the feed screen!</Text>
        <ActionButton onPress={this.onActionButtonPress} />
      </View>
    );
  }
}
