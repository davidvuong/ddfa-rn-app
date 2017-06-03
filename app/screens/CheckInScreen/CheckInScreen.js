import React, { Component } from 'react';
import _ from 'lodash';

import {
  View,
  Icon,
  Title,
  Text,
  Spinner
} from '@shoutem/ui';

import MapView from 'react-native-maps';
import GeoLocationService from '../../services/GeoLocationService';

const CURRENT_POSITION_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
};

export default class CheckInScreen extends Component {
  static navigationOptions = {
    title: <Title>Check-In</Title>,
    tabBarLabel: 'check-in',
    tabBarIcon: () => (
      <Icon name="address-full" />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPosition: null,
      currentPositionStatus: CURRENT_POSITION_STATUS.PENDING,
    };
  }

  componentDidMount() {
    this._getCurrentLocation();
  }

  _getCurrentLocation() {
    this.setState({ currentPositionStatus: CURRENT_POSITION_STATUS.IN_PROGRESS });

    GeoLocationService.promptLocationAccess().then(() => {
      return GeoLocationService.getCurrentLocation();
    }).then((position) => {
      this.setState({
        currentPosition: position,
        currentPositionStatus: CURRENT_POSITION_STATUS.SUCCESS,
      });
    }, () => {
      this.setState({
        currentPositionStatus: CURRENT_POSITION_STATUS.ERROR,
      });
    });
  }

  _shouldShowSpinner() {
    return _.includes([
      CURRENT_POSITION_STATUS.IN_PROGRESS,
      CURRENT_POSITION_STATUS.PENDING
    ], this.state.currentPositionStatus);
  }

  render() {
    if (this._shouldShowSpinner()) {
      return (
        <View styleName="fill-parent vertical v-center">
          <Spinner style={styles.spinner} />
        </View>
      );
    }
    if (this.state.currentPositionStatus === CURRENT_POSITION_STATUS.ERROR) {
      return (
        <View styleName="fill-parent vertical v-center">
          <Text>Allow location services to enable check-in feature.</Text>
        </View>
      );
    }

    const { currentPosition } = this.state;
    const { latitude, longitude, latitudeDelta, longitudeDelta } = currentPosition;
    return (
      <View styleName="fill-parent">
        <MapView
          style={styles.map}
          initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
        />
      </View>
    );
  }
}

const styles = {
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  spinner: {
    size: 'large',
  },
};
