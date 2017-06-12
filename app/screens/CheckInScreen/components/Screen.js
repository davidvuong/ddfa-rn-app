import React, { Component } from 'react';
import {
  View,
  Text,
} from '@shoutem/ui'

import navigationOptions from '../NavigationOptions';
import GeoLocationService from '../../../services/GeoLocationService';
import ActionButtons from './ActionButtons';

export default class CheckIn extends Component {
  static navigationOptions = navigationOptions;

  DEFAULT_SEARCH_RADIUS = 200;

  constructor(props) {
    super(props);

    this.state = {
      selectedLocation: null,
    };

    /* Internal */
    this.selectAndSetCurrentLocation = this.selectAndSetCurrentLocation.bind(this);

    /* External */
    this.onCheckIn = this.onCheckIn.bind(this);
  }

  componentDidMount() {
    this.selectAndSetCurrentLocation();
  }

  selectAndSetCurrentLocation() {
    this.props.getCurrentLocation().then(() => {
      return this.props.getNearby(
        this.props.currentLocation.latitude,
        this.props.currentLocation.longitude,
        this.DEFAULT_SEARCH_RADIUS
      );
    }).then(() => {
      const selectedLocation = GeoLocationService.sortByDistanceBetween(
        this.props.places,
        this.props.currentLocation.latitude,
        this.props.currentLocation.longitude
      )[0];
      this.setState({ selectedLocation });
    });
  }

  onCheckIn() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View styleName="fill-parent">
        <Text>Welcome to the check-in screen!</Text>
        <Text>{JSON.stringify(this.props.currentLocation)}</Text>
        <Text>{JSON.stringify(this.state.selectedLocation)}</Text>

        <ActionButtons
          onCancel={() => { this.props.navigation.goBack() }}
          onCheckIn={this.onCheckIn}
        />
      </View>
    );
  }
}
