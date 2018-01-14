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

  onPressCheckIn = () => {
    let googlePlace: *;

    RNGooglePlaces.openPlacePickerModal(this.RNGooglePlacesOptions)
      .then((place: *) => {
        googlePlace = place;

        const { name, address, latitude, longitude, placeID } = place;
        return this.props.createCheckIn(
          latitude, longitude, address, name || address || `${latitude} ${longitude}`, placeID,
        );
      })
      .then((checkInId: string) => {
        // NOTE:
        //
        // Replace setSelectedLocation to checkIn (but also include the GooglePlace)
        // Perhaps... `setGooglePlace`, `setCheckIn`.
        this.props.setSelectedLocation({ id: checkInId, place: googlePlace });
        this.props.navigation.navigate('ReviewCreate');
      })
      .catch(() => {
        // pass
      });
  }

  render() {
    const { routeName } = this.props.navigation.state;
    return (
      <Footer>
        <FooterTab>
          <Button vertical onPress={this.onPressHome} active={routeName === 'CheckInList'}>
            {Platform.OS === 'ios' ? <Icon name="ios-apps" style={Styles.icon} /> : null}
            {Platform.OS === 'ios' ? null : <Text>home</Text>}
          </Button>
          <Button vertical onPress={this.onPressSearch} active={routeName === 'CheckInNearby'}>
            {Platform.OS === 'ios' ? <Icon name="ios-search" style={Styles.icon} /> : null}
            {Platform.OS === 'ios' ? null : <Text>nearby</Text>}
          </Button>
          <Button vertical onPress={this.onPressCheckIn}>
            {Platform.OS === 'ios' ? <Icon name="ios-navigate" style={Styles.icon} /> : null}
            {Platform.OS === 'ios' ? null : <Text>check-in</Text>}
          </Button>
          <Button vertical onPress={this.onPressLogout}>
            {Platform.OS === 'ios' ? <Icon name="ios-log-out" style={Styles.icon} /> : null}
            {Platform.OS === 'ios' ? null : <Text>logout</Text>}
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
