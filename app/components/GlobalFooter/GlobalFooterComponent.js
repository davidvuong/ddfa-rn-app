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
  ActivityIndicator,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import Styles from './Styles';
import { navigateAndReset } from '../../navigator/AppNavigator';

export default class GlobalFooterComponent extends React.Component {
  state = {
    spinners: {},
  };

  /* Wrappers over `this.state.spinners`. */
  setSpinner = (spinnerType, isSpinning) => {
    const spinners = _.clone(this.state.spinners);
    spinners[spinnerType] = isSpinning;
    this.setState({ spinners });
  }
  isSpinning = (spinnerType) => {
    return !!this.state.spinners[spinnerType];
  }
  setThenResetSpinner = (spinnerType, delay = 3000) => {
    this.setSpinner(spinnerType, true);
    return Promise.delay(delay)
      .then(() => { this.setSpinner(spinnerType, false); });
  }

  /* Given a GooglePlace object, determine the location name. */
  getLocationName = (place) => {
    const { name, address, latitude, longitude } = place;
    return name || address || `${latitude} ${longitude}`;
  }

  selectLocation = () => {
    return RNGooglePlaces.openPlacePickerModal({ radius: 0.5 });
  }

  isRouteActive = (routeName) => {
    return this.props.navigation.state.routeName === routeName;
  }

  /* Below are all `onPress` callbacks (home, nearby, checkIn, logout). */
  onPressHome = () => {
    if (this.isRouteActive('CheckInList') || this.isSpinning('home')) {
      return;
    }
    this.setThenResetSpinner('home');
    navigateAndReset('CheckInList', this.props.navigation);
  }

  onPressNearby = () => {
    if (this.isRouteActive('CheckInNearby') || this.isSpinning('nearby')) {
      return;
    }
    this.setThenResetSpinner('nearby');

    const geoLocationOptions = { enableHighAccuracy: true, timeout: 5000 };
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.props.setSelectedLocation({ latitude, longitude }); // FIXME: Sharing with others.
      navigateAndReset('CheckInNearby', this.props.navigation);
    }, (error) => { console.log(error); }, geoLocationOptions);
  }

  onPressGallery = () => {
    if (this.isRouteActive('PhotoGallery') || this.isSpinning('photo-gallery')) {
      return;
    }
    this.setThenResetSpinner('photo-gallery');
    navigateAndReset('PhotoGallery', this.props.navigation);
  }

  onPressCheckIn = () => {
    let googlePlace;

    this.setThenResetSpinner('checkIn');
    this.selectLocation()
      .then((place) => {
        googlePlace = place;

        const { address, latitude, longitude, placeID } = place;
        const name = this.getLocationName(place);
        return this.props.createCheckIn(latitude, longitude, address, name, placeID);
      })
      .then((checkInId) => {
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
      })
      .catch(console.debug);
  }

  onPressLogout = () => {
    this.setThenResetSpinner('logout');
    const onPressLogoutCancel = () => { this.setSpinner('logout', false); };
    const onPressLogoutYes = () => {
      this.props.logoutUser()
        .then(() => {
          navigateAndReset('Login', this.props.navigation);
        })
        .catch(console.debug);
    };

    const buttons = [
      { text: 'Yes', onPress: onPressLogoutYes },
      { text: 'Cancel', style: 'cancel', onPress: onPressLogoutCancel },
    ];
    Alert.alert('Exit DDFA', 'Are you sure you want to log out?', buttons);
  }

  renderButton = (btnType, btnName, routeName, onPress) => {
    if (this.state.spinners[btnType]) {
      return <Button vertical><ActivityIndicator color="black" /></Button>;
    }

    const style = this.isRouteActive(routeName) ? Styles.footerButtonActive : Styles.footerButton;
    return (
      <Button vertical onPress={onPress} style={style}>
        <Text style={Styles.iconText} uppercase>{btnName}</Text>
      </Button>
    );
  }

  render() {
    return (
      <Footer style={Styles.footerContainer}>
        <FooterTab style={Styles.footerTab}>
          {this.renderButton('home', 'home', 'CheckInList', this.onPressHome)}
          {this.renderButton('photo-gallery', 'gallery', 'PhotoGallery', this.onPressGallery)}
          {this.renderButton('nearby', 'nearby', 'CheckInNearby', this.onPressNearby)}
          {this.renderButton('checkIn', 'check-in', null, this.onPressCheckIn)}
          {this.renderButton('logout', 'logout', null, this.onPressLogout)}
        </FooterTab>
      </Footer>
    );
  }
}
