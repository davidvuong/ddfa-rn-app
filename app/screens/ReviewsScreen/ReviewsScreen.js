import React, { Component } from 'react';

import {
  View,
  Text,
  Title,
  Caption,
} from '@shoutem/ui'
import Icon from 'react-native-vector-icons/Ionicons';

export default class ReviewsScreen extends Component {
  static navigationOptions = {
    title: <Title>Reviews</Title>,
    tabBarLabel: ({ focused }) => {
      return <Caption styleName={`h-center ${focused ? 'bold' : ''}`}>reviews</Caption>;
    },
    tabBarIcon: () => (
      <Icon name="ios-chatboxes" size={24} />
    )
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View styleName="fill-parent vertical horizontal v-center">
        <Text>Welcome to the reviews screen!</Text>
      </View>
    );
  }
}
