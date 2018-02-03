// @flow
import Promise from 'bluebird';
import * as React from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Text,
  Icon,
  Footer,
  FooterTab,
  Button,
} from 'native-base';
import {
  Alert,
  Platform,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import Styles from './Styles';

type Props = {
  navigation: *,
  logoutUser: () => *,
  createCheckIn: (number, number, string, string, ?string) => Promise<string>,
  setSelectedLocation: (*) => *,
};

type State = {};

export default class GlobalFooterComponent extends React.Component<Props, State> {
  RNGooglePlacesOptions = { radius: 0.5 };

  navigateToLogin = () => {
    this.props.logoutUser()
      .then(() => {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login' }),
          ],
        }));
      })
      .catch((error: Error) => { console.error(error.message); });
  }

  onPressHome = () => {
    if (this.props.navigation.state.routeName === 'CheckInList') {
      return;
    }
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'CheckInList' }),
      ],
    }));
  }

  onPressSearch = () => {
    if (this.props.navigation.state.routeName === 'CheckInNearby') {
      return;
    }
    RNGooglePlaces.openPlacePickerModal(this.RNGooglePlacesOptions)
      .then((place: *) => {
        const { latitude, longitude } = place;
        this.props.setSelectedLocation({ latitude, longitude });
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'CheckInNearby' }),
          ],
        }));
      })
      .catch(() => {
        // pass
      });
  }

  onPressLogout = () => {
    const buttons = [
      { text: 'Yes', onPress: this.navigateToLogin },
      { text: 'Cancel', style: 'cancel' },
    ];
    Alert.alert('Exit DDFA', 'Are you sure you want to log out?', buttons);
  }

  /* Given a GooglePlace object, determine the location name. */
  getLocationName = (place: *) => {
    const { name, address, latitude, longitude } = place;
    return name || address || `${latitude} ${longitude}`;
  }

  onPressCheckIn = () => {
    let googlePlace: *;

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
          rating:
          rating || null,
          pricingLevel: pricingLevel || null,
        });
        this.props.navigation.navigate('ReviewCreate');
      })
      .catch(() => {
        // pass
      });
  }

  render() {
    return (
      <Footer style={Styles.footerContainer}>
        <FooterTab style={Styles.footerTab}>
          <Button vertical onPress={this.onPressHome}>
            {Platform.OS === 'ios' ? <Icon name="ios-apps" style={Styles.icon} /> : null}
            {Platform.OS === 'ios' ? null : <Text style={Styles.iconText}>home</Text>}
          </Button>
          <Button vertical onPress={this.onPressSearch}>
            {Platform.OS === 'ios' ? <Icon name="ios-search" style={Styles.icon} /> : null}
            {Platform.OS === 'ios' ? null : <Text style={Styles.iconText}>nearby</Text>}
          </Button>
          <Button vertical onPress={this.onPressCheckIn}>
            {Platform.OS === 'ios' ? <Icon name="ios-navigate" style={Styles.icon} /> : null}
            {Platform.OS === 'ios' ? null : <Text style={Styles.iconText}>check-in</Text>}
          </Button>
          <Button vertical onPress={this.onPressLogout}>
            {Platform.OS === 'ios' ? <Icon name="ios-log-out" style={Styles.icon} /> : null}
            {Platform.OS === 'ios' ? null : <Text style={Styles.iconText}>logout</Text>}
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
