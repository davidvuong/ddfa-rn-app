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
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

type Props = {
  navigation: *,
  logoutUser: () => *,
  createCheckIn: (number, number, string, string) => Promise<string>,
  setSelectedLocation: (*) => *,
};

type State = {};

export default class GlobalFooterComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    (this: any).navigateToLogin = this.navigateToLogin.bind(this);
    (this: any).onPressLogout = this.onPressLogout.bind(this);
    (this: any).onPressCheckIn = this.onPressCheckIn.bind(this);
  }

  navigateToLogin() {
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

  onPressLogout() {
    const buttons = [
      { text: 'Yes', onPress: this.navigateToLogin },
      { text: 'Cancel', style: 'cancel' },
    ];
    Alert.alert('Exit DDFA', 'Are you sure you want to log out?', buttons);
  }

  onPressCheckIn() {
    let googlePlace: *;

    const options = { radius: 0.3 };
    RNGooglePlaces.openPlacePickerModal(options)
      .then((place: *) => {
        googlePlace = place;
        const { name, address, latitude, longitude } = place;
        return this.props.createCheckIn(
          latitude, longitude, address, name || address || `${latitude} ${longitude}`,
        );
      })
      .then((checkInId: string) => {
        // NOTE:
        //
        // Replace setSelectedLocation to checkIn (but also include the GooglePlace)
        // Perhaps... `setGooglePlace`, `setCheckIn`.
        this.props.setSelectedLocation({ id: checkInId, place: googlePlace });
        this.props.navigation.navigate('CheckInCreate');
      })
      .catch((error: Error) => { console.error(error.message); });
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical>
            <Icon name="apps" />
            <Text>home</Text>
          </Button>
          <Button vertical>
            <Icon name="search" />
            <Text>search</Text>
          </Button>
          <Button vertical onPress={this.onPressCheckIn}>
            <Icon name="pin" />
            <Text>check-in</Text>
          </Button>
          <Button vertical onPress={this.onPressLogout}>
            <Icon name="exit" />
            <Text>logout</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
