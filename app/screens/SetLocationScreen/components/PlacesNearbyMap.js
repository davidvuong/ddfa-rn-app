import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import MapView from 'react-native-maps';
import styles from '../Styles';

const propTypes = {
  places: PropTypes.array.isRequired,
  currentLocation: PropTypes.object.isRequired,
};

export default class PlacesNearbyMap extends Component {
  constructor(props) {
    super(props);

    this.renderMapMarkers = this.renderMapMarkers.bind(this);
  }

  renderMapMarkers() {
    return _.map(this.props.places, (place, index) => {
      return (
        <MapView.Marker
          title={place.name}
          description={place.address}
          pinColor="blue"
          coordinate={{ latitude: place.latitude, longitude: place.longitude }}
          key={index}
        />
      );
    });
  }

  render() {
    const { currentLocation } = this.props;
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: currentLocation.latitudeDelta,
          longitudeDelta: currentLocation.longitudeDelta,
        }}
      >
        {this.renderMapMarkers()}
        <MapView.Marker coordinate={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
        }} />
      </MapView>
    );
  }
}

PlacesNearbyMap.propTypes = propTypes;

