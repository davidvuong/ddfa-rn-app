// @flow
import { connect } from 'react-redux';
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

import {
  setSelectedLocation,
} from '../../actions/CheckInActions';
import {
  logoutUser,
} from '../../actions/AuthenticationActions';

type Props = {
  navigation: *,
  logoutUser: () => *,
};

type State = {
};

export class GlobalFooterComponent extends React.Component<Props, State> {
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
    const options = { radius: 0.3 };
    RNGooglePlaces.openPlacePickerModal(options)
      .then((place: *) => {
        this.props.setSelectedLocation({
          address: place.address || place.name,
          latitude: place.latitude,
          longitude: place.longitude,
          place,
        });
        this.props.navigation.navigate('CheckInCreate');
      })
      .catch((error: Error) => { console.log(error.message); });
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

const mapStateToProps = (state: *) => {
  return {};
};

const mapDispatchToProps = (dispatch: *) => {
  return {
    logoutUser: () => {
      return dispatch(logoutUser());
    },
    setSelectedLocation: (selectedLocation: Object) => {
      return dispatch(setSelectedLocation(selectedLocation));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GlobalFooterComponent);
