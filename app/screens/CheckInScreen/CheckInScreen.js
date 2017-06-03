import React, { Component } from 'react';

import {
  Icon
} from '@shoutem/ui';

import {
  StyleSheet
} from 'react-native';

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
    title: 'Check-in',
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

  render() {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
