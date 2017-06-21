import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Spinner,
  TextInput,
} from '@shoutem/ui';
import {
  ScrollView,
} from 'react-native';

import navigationOptions from '../NavigationOptions';
import GeoLocationService from '../../../services/GeoLocationService';

import ActionButtons from './ActionButtons';
import ActionText from './ActionText';
import CheckInHeader from './CheckInHeader';

const propTypes = {
  isFetchingLocation: PropTypes.bool,
  locationFetchErrorStatus: PropTypes.string,
  currentLocation: PropTypes.object,

  isFetchingNearby: PropTypes.bool,
  nearbyFetchErrorStatus: PropTypes.string,
  places: PropTypes.array,

  isCheckingIn: PropTypes.bool,
  checkInErrorStatus: PropTypes.string,

  getCurrentLocation: PropTypes.func.isRequired,
  getNearby: PropTypes.func.isRequired,
  checkIn: PropTypes.func.isRequied,

  selectedLocation: PropTypes.object,
  setSelectedLocation: PropTypes.func.isRequired,
};

export default class CheckIn extends Component {
  static navigationOptions = navigationOptions;

  DEFAULT_SEARCH_RADIUS = 200;
  MAX_DISTANCE_BETWEEN = 100;

  constructor(props) {
    super(props);

    this.state = {
      comment: null,
      isPaying: false,
      amountPaid: null,
      rating: null,
    };

    /* Helpers */
    this.selectAndSetCurrentLocation = this.selectAndSetCurrentLocation.bind(this);

    /* Render */
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
      let selectedLocation = GeoLocationService.sortByDistanceBetween(
        this.props.places,
        this.props.currentLocation.latitude,
        this.props.currentLocation.longitude
      )[0];

      // Make sure we don't do something silly and select something too far away.
      if (!selectedLocation || selectedLocation.distanceBetween >= this.MAX_DISTANCE_BETWEEN) {
        selectedLocation = this.props.currentLocation;
      }
      this.props.setSelectedLocation(selectedLocation);
    }, console.warn);
  }

  onCheckIn() {
    const { comment, isPaying, amountPaid, rating } = this.state;
    const { latitude, longitude, name, address } = this.props.selectedLocation;
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
    const { selectedLocation } = this.props;
    if (!selectedLocation) {
      return (
        <View styleName="fill-parent horizontal h-center vertical v-center">
          <Spinner />
        </View>
      );
    }
    return (
      <ScrollView style={{ flex: 1 }} scrollEnabled={false}>
        <CheckInHeader
          name={selectedLocation.name}
          address={selectedLocation.address}
          price={selectedLocation.price}
          rating={selectedLocation.rating}
          navigation={this.props.navigation}
        />
        <ActionText />

        <ScrollView scrollEnabled={false}>
          <TextInput
            placeholder="Is there something else you would like to add?"
            onChangeText={(comment) => this.setState({ comment })}
            style={{ height: 400 }}
            multiline={true}
            value={this.state.comment}
          />
        </ScrollView>
        <ActionButtons
          isCheckingIn={this.props.isCheckingIn}
          onCancel={() => { this.props.navigation.goBack(); }}
          onCheckIn={this.onCheckIn}
        />
      </ScrollView>
    );
  }
}

CheckIn.PropTypes = propTypes;
