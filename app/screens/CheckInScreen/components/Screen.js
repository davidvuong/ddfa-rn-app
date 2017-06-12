import React, { Component } from 'react';
import {
  View,
  Spinner,
  TextInput,
} from '@shoutem/ui';
import { StatusBar } from 'react-native';

import navigationOptions from '../NavigationOptions';
import GeoLocationService from '../../../services/GeoLocationService';

import ActionButtons from './ActionButtons';
import ActionText from './ActionText';
import Header from './Header';

export default class CheckIn extends Component {
  static navigationOptions = navigationOptions;

  DEFAULT_SEARCH_RADIUS = 200;

  constructor(props) {
    super(props);

    this.state = {
      selectedLocation: null,
      comment: null,
      isPaying: false,
      amountPaid: null,
      rating: null,
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
    }, console.warn);
  }

  onCheckIn() {
    const { comment, isPaying, amountPaid, rating, selectedLocation } = this.state;
    const { latitude, longitude, name, address } = selectedLocation;
    this.props.checkIn(
      latitude,
      longitude,
      address,
      name,
      comment,
      rating,
      isPaying,
      amountPaid
    ).then(() => {
      this.props.navigation.goBack();
    }, console.warn);
  }

  render() {
    const { selectedLocation } = this.state;
    if (!selectedLocation) {
      return (
        <View styleName="fill-parent horizontal h-center vertical v-center">
          <StatusBar hidden />
          <Spinner />
        </View>
      )
    }
    return (
      <View styleName="fill-parent">
        <StatusBar hidden />
        <Header
          name={selectedLocation.name}
          address={selectedLocation.address}
          price={selectedLocation.price}
          rating={selectedLocation.rating}
        />
        <ActionText />
        <View>
          <TextInput
            placeholder="Is there something else you would like to add?"
            style={{ height: 300 }}
            multiline={true}
            value={this.state.comment}
          />
        </View>
        <ActionButtons
          onCancel={() => { this.props.navigation.goBack() }}
          onCheckIn={this.onCheckIn}
        />
      </View>
    );
  }
}
