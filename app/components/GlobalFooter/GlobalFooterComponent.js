import _ from 'lodash';
import Promise from 'bluebird';
import * as React from 'react';
import {
  Text,
  Footer,
  FooterTab,
  Button,
  Icon,
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
  spinnerTimers = {};

  componentWillUnmount() {
    // Avoids ReactJS warnings about calling `setState` on an unmounted component.
    _.each(this.spinnerTimers, (timer) => {
      clearTimeout(timer);
    });
  }

  /* Wrappers over `this.state.spinners`. */
  setSpinner = (spinnerType, isSpinning) => {
    const spinners = _.clone(this.state.spinners);
    spinners[spinnerType] = isSpinning;
    this.setState({ spinners });
  }
  isSpinning = (spinnerType) => {
    return !!this.state.spinners[spinnerType];
  }
  setThenResetSpinner = (spinnerType, delay = 1500) => {
    this.setSpinner(spinnerType, true);
    this.spinnerTimers[spinnerType] = setTimeout(() => {
      this.setSpinner(spinnerType, false);
    }, delay);
  }
  isRouteActive = (routeName) => {
    return this.props.navigation.state.routeName === routeName;
  }

  /* Below are all `onPress` callbacks (home, nearby, checkIn, logout). */
  onPressHome = () => {
    if (this.isRouteActive('CheckInList') || this.isSpinning('home')) { return; }
    this.setThenResetSpinner('home');
    navigateAndReset('CheckInList', this.props.navigation);
  }

  onPressNearby = () => {
    if (this.isRouteActive('CheckInNearby') || this.isSpinning('nearby')) { return; }
    this.setThenResetSpinner('nearby');

    const geoLocationOptions = { enableHighAccuracy: true, timeout: 3000 };
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.props.setSelectedLocation({ latitude, longitude }); // FIXME: Sharing with others.
      navigateAndReset('CheckInNearby', this.props.navigation);
    }, console.debug, geoLocationOptions);
  }

  onPressGallery = () => {
    if (this.isRouteActive('PhotoGallery') || this.isSpinning('photos')) { return; }
    this.setThenResetSpinner('photos');
    navigateAndReset('PhotoGallery', this.props.navigation);
  }

  onPressCheckIn = () => {
    if (this.isSpinning('checkIn')) { return; }
    this.setThenResetSpinner('checkIn');

    const getPlaceName = (place) => {
      const { name, address, latitude, longitude } = place;
      return name || address || `${latitude} ${longitude}`;
    };

    RNGooglePlaces.openPlacePickerModal({ radius: 0.5 })
      .then((place) => {
        const locationName = getPlaceName(place);
        const checkInPromise = this.props.createCheckIn(
          place.latitude,
          place.longitude,
          place.address,
          locationName,
          place.placeID,
        );
        return Promise.all([checkInPromise, place, locationName]);
      })
      .then((results) => {
        const [checkInId, place, name] = results;
        const { address, latitude, longitude, rating, pricingLevel } = place;
        this.props.setSelectedLocation({
          checkInId,
          name,
          address,
          latitude,
          longitude,
          rating: _.isNil(rating) ? null : rating,
          pricingLevel: _.isNil(pricingLevel) ? null : pricingLevel,
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

  renderButton = (btnName, routeName, onPress) => {
    if (this.state.spinners[btnName]) {
      return <Button style={Styles.footerButtonSpinning}><ActivityIndicator color="white" /></Button>;
    }
    if (btnName === 'checkIn') {
      return (
        <Button vertical onPress={this.onPressCheckIn} style={Styles.checkInButton}>
          <Icon style={Styles.checkInButtonIcon} name="md-pin" />
        </Button>
      );
    }
    const style = this.isRouteActive(routeName) ? Styles.footerButtonActive : Styles.footerButton;
    return (
      <Button onPress={onPress} style={style}>
        <Text style={Styles.buttonText} uppercase>{btnName}</Text>
      </Button>
    );
  }

  render() {
    return (
      <Footer style={Styles.footerContainer}>
        <FooterTab style={Styles.footerTab}>
          {this.renderButton('home', 'CheckInList', this.onPressHome)}
          {this.renderButton('photos', 'PhotoGallery', this.onPressGallery)}
          {this.renderButton('checkIn', null, null)}
          {this.renderButton('nearby', 'CheckInNearby', this.onPressNearby)}
          {this.renderButton('logout', null, this.onPressLogout)}
        </FooterTab>
      </Footer>
    );
  }
}
