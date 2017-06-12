import React, { Component } from 'react';
import {
  View,
  Text,
} from '@shoutem/ui'

import navigationOptions from '../NavigationOptions';
import ActionButtons from './ActionButtons';

export default class CheckIn extends Component {
  static navigationOptions = navigationOptions;

  constructor(props) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
    this.onCheckIn = this.onCheckIn.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentLocation().then(() => {
      const { latitude, longitude } = this.props.location;
      this.props.getNearby(latitude, longitude, 200);
    });
  }

  onCancel() {
    this.props.navigation.goBack();
  }

  onCheckIn() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View styleName="fill-parent">
        <Text>Welcome to the check-in screen!</Text>
        <Text>{JSON.stringify(this.props.location)}</Text>
        <Text>{JSON.stringify(this.props.places)}</Text>

        <ActionButtons
          onCancel={this.onCancel}
          onCheckIn={this.onCheckIn}
        />
      </View>
    );
  }
}
