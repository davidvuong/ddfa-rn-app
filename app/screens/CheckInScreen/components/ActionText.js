import React, { Component } from 'react';
import {
  View,
  Text,
} from '@shoutem/ui';

const propTypes = {};

export default class ActionText extends Component {
  render() {
    return (
      <View styleName="horizontal h-center space-between">
        <Text>Upload</Text>
        <Text>Rating</Text>
        <Text>Price</Text>
      </View>
    );
  }
}

ActionText.propTypes = propTypes;
