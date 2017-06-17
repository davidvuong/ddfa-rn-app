import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

import MapView from 'react-native-maps';
import styles from '../Styles';

const propTypes = {
  places: PropTypes.array.isRequired,
  currentLocation: PropTypes.object.isRequired,

  selectedLocationTmp: PropTypes.object,
  setSelectedLocationTmp: PropTypes.func.isRequired,
};

export default class PlacesNearbyMap extends Component {
  constructor(props) {
    super(props);

    /* Helpers */
    this.onPinPress = this.onPinPress.bind(this);
    this.isSelected = this.isSelected.bind(this);

    /* Renderer */
    this.renderMapMarkers = this.renderMapMarkers.bind(this);
  }

  onPinPress(event) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const selectedLocation = this.props.places[_.findIndex(this.props.places, (p) => {
      return p.latitude === latitude && p.longitude === longitude;
    })];
    this.props.setSelectedLocationTmp(selectedLocation);
  }

  isSelected(place) {
    return place === this.props.selectedLocationTmp;
  }

  renderMapMarkers() {
    return _.map(this.props.places, (place, index) => {
      return (
        <MapView.Marker
          title={place.name}
          description={place.address}
          onPress={this.onPinPress}
          pinColor={this.isSelected(place) ? 'orange' : 'blue'}
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
