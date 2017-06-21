import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View as RNView } from 'react-native';

import ActionButtons from './ActionButtons';
import PlacesNearbyMap from './PlacesNearbyMap';
import PlacesNearbyList from './PlacesNearbyList';
import navigationOptions from '../NavigationOptions';
import styles from '../Styles';

const propTypes = {
  places: PropTypes.array.isRequired,

  currentLocation: PropTypes.object.isRequired,
  setSelectedLocation: PropTypes.func.isRequired,

  selectedLocationTmp: PropTypes.object,
  setSelectedLocationTmp: PropTypes.func.isRequired,
};

export default class SetLocationScreen extends Component {
  static navigationOptions = navigationOptions;

  constructor(props) {
    super(props);

    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm() {
    if (!this.props.selectedLocationTmp) { return; }
    this.props.setSelectedLocation(this.props.selectedLocationTmp);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <RNView style={styles.container}>
        <PlacesNearbyMap
          places={this.props.places}
          currentLocation={this.props.currentLocation}
          selectedLocationTmp={this.props.selectedLocationTmp}
          setSelectedLocationTmp={this.props.setSelectedLocationTmp}
        />
        <PlacesNearbyList
          places={this.props.places}
          selectedLocationTmp={this.props.selectedLocationTmp}
          setSelectedLocationTmp={this.props.setSelectedLocationTmp}
        />
        <ActionButtons
          onCancel={() => { this.props.navigation.goBack(); }}
          onConfirm={this.onConfirm}
        />
      </RNView>
    );
  }
}

SetLocationScreen.propTypes = propTypes;

/**
 * TODO
 *
 * 8. Tapping on a marker or item in the list will set the "new" currentLocation
 * 9. Pressing confirm will update the Redux store to set the new selectedLocation
 * 10. Use information from Google Maps to show more info when tapping on cursor (price, rating)
 * 11. Possibly also show the distance between current location and newly selected location
 *
 * Future:
 *
 * 1. Query previous checkins and merge two sets together.
 */
