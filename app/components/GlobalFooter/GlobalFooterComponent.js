// @flow
import _ from 'lodash';
import Promise from 'bluebird';
import * as React from 'react';
import {
  Text,
  Footer,
  FooterTab,
  Button,
} from 'native-base';
import {
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import Styles from './Styles';
import { navigateAndReset } from '../../navigator/AppNavigator';

type Props = {
  navigation: *,
  logoutUser: () => *,
  createCheckIn: (number, number, string, string, ?string) => Promise<string>,
  setSelectedLocation: (*) => *,
  resetCheckIns: () => *,
  listCheckIns: (string) => *,
};

type State = {
  spinners: Object,
};

export default class GlobalFooterComponent extends React.Component<Props, State> {
  RNGooglePlacesOptions = { radius: 0.5 };
  state = {
    spinners: {},
  };

  /* Wrappers over `this.state.spinners`. */
  setSpinner = (spinnerType: string, isSpinning: boolean) => {
    const spinners = _.clone(this.state.spinners);
    spinners[spinnerType] = isSpinning;
    this.setState({ spinners });
  }
  isSpinning = (spinnerType: string): boolean => {
    return !!this.state.spinners[spinnerType];
  }

  /* Given a GooglePlace object, determine the location name. */
  getLocationName = (place: *) => {
    const { name, address, latitude, longitude } = place;
    return name || address || `${latitude} ${longitude}`;
  }

  /* Below are all `onPress` callbacks (home, nearby, checkIn, logout). */
  onPressHome = () => {
    if (this.props.navigation.state.routeName === 'CheckInList' || this.isSpinning('home')) {
      return;
    }
    this.setSpinner('home', true);
    navigateAndReset('CheckInList', this.props.navigation);
  }

  onPressNearby = () => {
    if (this.props.navigation.state.routeName === 'CheckInNearby' || this.isSpinning('nearby')) {
      return;
    }
    this.setSpinner('nearby', true);
    RNGooglePlaces.openPlacePickerModal(this.RNGooglePlacesOptions)
      .then((place: *) => {
        const { latitude, longitude } = place;
        this.props.setSelectedLocation({ latitude, longitude }); // FIXME: Sharing with others.
        navigateAndReset('CheckInNearby', this.props.navigation);
      })
      .catch((error: Error) => {
        console.debug(error);
        this.setSpinner('nearby', false);
      });
  }

  onPressCheckIn = () => {
    let googlePlace: *;

    this.setSpinner('checkIn', true);
    RNGooglePlaces.openPlacePickerModal(this.RNGooglePlacesOptions)
      .then((place: *) => {
        googlePlace = place;

        const { address, latitude, longitude, placeID } = place;
        const name = this.getLocationName(place);
        return this.props.createCheckIn(latitude, longitude, address, name, placeID);
      })
      .then((checkInId: string) => {
        const { address, latitude, longitude, rating, pricingLevel } = googlePlace;
        const name = this.getLocationName(googlePlace);
        this.props.setSelectedLocation({
          checkInId,
          name,
          address,
          latitude,
          longitude,
          rating: rating || null,
          pricingLevel: pricingLevel || null,
        });
        this.props.navigation.navigate('ReviewCreate', {
          goBackCallback: () => {
            this.props.resetCheckIns();
            return this.props.listCheckIns((new Date()).toISOString());
          },
        });
        this.setSpinner('checkIn', false);
      })
      .catch((error: Error) => {
        console.debug(error);
        this.setSpinner('checkIn', false);
      });
  }

  onPressLogout = () => {
    this.setSpinner('logout', true);
    const onPressLogoutCancel = () => { this.setSpinner('logout', false); };
    const onPressLogoutYes = () => {
      this.props.logoutUser()
        .then(() => {
          navigateAndReset('Login', this.props.navigations);
          this.setSpinner('logout', false);
        })
        .catch(() => { this.setSpinner('login', false); });
    };

    const buttons = [
      { text: 'Yes', onPress: onPressLogoutYes },
      { text: 'Cancel', style: 'cancel', onPress: onPressLogoutCancel },
    ];
    Alert.alert('Exit DDFA', 'Are you sure you want to log out?', buttons);
  }

  renderButton = (btnType: string, btnName: string, onPress: *) => {
    if (this.state.spinners[btnType]) {
      return <Button vertical><ActivityIndicator color="black" /></Button>;
    }
    return (
      <Button vertical onPress={onPress}>
        <Text style={Styles.iconText} uppercase>{btnName}</Text>
      </Button>
    );
  }

  render() {
    return (
      <Footer style={Styles.footerContainer}>
        <FooterTab style={Styles.footerTab}>
          {this.renderButton('home', 'home', this.onPressHome)}
          {this.renderButton('nearby', 'nearby', this.onPressNearby)}
          {this.renderButton('check-in', 'check-in', this.onPressCheckIn)}
          {this.renderButton('logout', 'logout', this.onPressLogout)}
        </FooterTab>
      </Footer>
    );
  }
}
