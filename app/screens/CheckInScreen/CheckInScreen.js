import React, { Component } from 'react';

import {
  View,
  Text,
  Icon
} from '@shoutem/ui'

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
      <View styleName="fill-parent vertical horizontal v-center">
        <Text>Welcome to the check-in screen!</Text>
        <Text>{this.state.currentPositionStatus}</Text>
        <Text>{this.state.currentPosition}</Text>
      </View>
    );
  }
}
