import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { Alert } from 'react-native';
import {
  View,
  Text,
  Button,
  Divider,
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';

import ActionButton from 'react-native-action-button';
import RNGooglePlaces from 'react-native-google-places';
import navigationOptions from '../NavigationOptions';

import AuthenticationService from '../../../services/AuthenticationService';
import GeoLocationService from '../../../services/GeoLocationService';

const propTypes = {
  setSelectedLocation: PropTypes.func.isRequired,
};

export default class FeedScreen extends Component {
  static navigationOptions = navigationOptions;

  constructor(props) {
    super(props);

    /* Helpers */
    this.navigateToLogin = this.navigateToLogin.bind(this);

    /* Render */
    this.onLogout = this.onLogout.bind(this);
    this.onCheckIn = this.onCheckIn.bind(this);
  }

  navigateToLogin() {
    AuthenticationService.logout().then(() => {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' }),
        ],
      }));
    }, (error) => { console.error(error.message); });
  }

  onCheckIn() {
    const options = { type: 'establishments' };
    RNGooglePlaces.openPlacePickerModal(options).then((place) => {
      place.address = place.address || place.name;

      const delta = GeoLocationService.calculateRegionDelta(place.latitude, place.longitude);
      place.latitudeDelta = delta.latitudeDelta;
      place.longitudeDelta = delta.longitudeDelta;

      this.props.setSelectedLocation(place);
      this.props.navigation.navigate('CheckIn');
    }).catch((error) => { console.log(error.message); });
  }

  onLogout() {
    const buttons = [
      { text: 'Yes', onPress: this.navigateToLogin },
      { text: 'Cancel', style: 'cancel' },
    ];
    Alert.alert('Exit DDFA', 'Are you sure you want to log out?', buttons);
  }

  render() {
    return (
      <View styleName="fill-parent">
        <ActionButton spacing={12}>
          <ActionButton.Item buttonColor="white" size={44} onPress={this.onLogout}>
            <Icon name="ios-power" size={22} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="white" size={44} onPress={this.onCheckIn}>
            <Icon name="ios-pin" size={22} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

FeedScreen.propTypes = propTypes;
