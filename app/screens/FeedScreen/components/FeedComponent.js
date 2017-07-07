import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import {
  Alert,
  StatusBar,
} from 'react-native';
import {
  View,
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';

import ActionButton from 'react-native-action-button';
import RNGooglePlaces from 'react-native-google-places';
import navigationOptions from '../NavigationOptions';

import AuthenticationService from '../../../services/AuthenticationService';
import GeoLocationService from '../../../services/GeoLocationService';
import InfiniteScrollFeed from './InfiniteScrollFeed';

const propTypes = {
  setSelectedLocation: PropTypes.func.isRequired,
  listCheckIns: PropTypes.func.isRequired,
  resetCheckIns: PropTypes.func.isRequired,
  checkIns: PropTypes.array.isRequired,
  isListingCheckIns: PropTypes.bool,
  checkInListErrorStatus: PropTypes.object,
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
    const actionButtonItemSize = 34;
    return (
      <View styleName="fill-parent">
        <StatusBar hidden />
        <InfiniteScrollFeed
          checkIns={this.props.checkIns}
          loadMore={this.props.listCheckIns}
          resetCheckIns={this.props.resetCheckIns}
          isLoading={this.props.isListingCheckIns}
          loadingMoreError={this.props.checkInListErrorStatus}
        />
        <ActionButton
          spacing={12}
          offsetX={8}
          offsetY={8}
          buttonColor={'rgba(0, 0, 0, 1)'}
        >
          <ActionButton.Item buttonColor="white" size={actionButtonItemSize} onPress={this.onLogout}>
            <Icon name="ios-power" size={14} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="white" size={actionButtonItemSize} onPress={this.onCheckIn}>
            <Icon name="ios-pin" size={16} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

FeedScreen.propTypes = propTypes;
