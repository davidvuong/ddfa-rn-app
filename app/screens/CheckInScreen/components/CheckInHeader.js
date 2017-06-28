import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Heading,
  Subtitle,
  Overlay,
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

import styles from '../Style';

const propTypes = {
  location: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default class CheckInHeader extends Component {
  render() {
    const {
      name, address, latitude, longitude, latitudeDelta, longitudeDelta,
    } = this.props.location;

    return (
      <MapView
        style={styles.checkInHeaderContainer}

        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}

        initialRegion={{
          latitude, longitude, latitudeDelta, longitudeDelta,
        }}
      >
        <Overlay styleName="fill-parent">
          <Heading>{name}</Heading>
          <Subtitle style={styles.checkInHeaderSubtitle}>
            <Icon style={styles.checkInHeaderSubtitleIcon} name="ios-pin" />
            {` ${address}`}
          </Subtitle>
        </Overlay>
      </MapView>
    );
  }
}

CheckInHeader.propTypes = propTypes;
