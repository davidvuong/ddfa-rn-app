import React, { Component } from 'react';

import {
  View,
  Text,
  Title,
  Icon,
} from '@shoutem/ui'

export default class ReviewsScreen extends Component {
  static navigationOptions = {
    title: <Title>Reviews</Title>,
    tabBarLabel: 'reviews',
    tabBarIcon: () => (
      <Icon name="activity" />
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
