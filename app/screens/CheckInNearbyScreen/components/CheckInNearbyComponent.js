// @flow
import Promise from 'bluebird';
import * as React from 'react';
import {
  Body,
  Left,
  Right,
  Header,
  Container,
  Content,
  Text,
  Button,
  Icon,
} from 'native-base';
import {
  Platform,
  ActivityIndicator,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import GlobalFooter from '../../../components/GlobalFooter/GlobalFooter';
import CheckInNearbyMap from './CheckInNearbyMap/CheckInNearbyMap';
import CheckInNearbyList from './CheckInNearbyList/CheckInNearbyList';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  navigation: *,
  nearbyCheckIns: Array<*>,
  setSelectedCheckIn: (*) => *,
  setSelectedLocation: (*) => *,
  getNearbyCheckIns: (number, number) => Promise<*>,
  position: { latitude: number, longitude: number },
};

type State = {
  isLoadingNearbyCheckIns: boolean,
  isSelectingNewPosition: boolean,
};

// TODO: All direct service calls in components (unless in Global) should be passed in (i.e. Screens).
export default class CheckInNearbyComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = {
    isLoadingNearbyCheckIns: false,
    isSelectingNewPosition: false,
  };
  RNGooglePlacesOptions = { radius: 0.5 }; // TODO: Merge logic from GlobalFooter.

  componentDidMount() {
    const { position } = this.props;
    this.setState({ isLoadingNearbyCheckIns: true });
    this.props.getNearbyCheckIns(position.latitude, position.longitude)
      .then(() => {
        this.setState({ isLoadingNearbyCheckIns: false });
      })
      .catch((error: Error) => {
        this.setState({ isLoadingNearbyCheckIns: false });
        console.error(error);
      });
  }

  selectNewPosition = () => {
    if (this.state.isSelectingNewPosition) { return; }

    this.setState({ isSelectingNewPosition: true });
    RNGooglePlaces.openPlacePickerModal(this.RNGooglePlacesOptions)
      .then((place: *) => {
        const { latitude, longitude } = place;
        this.props.setSelectedLocation({ latitude, longitude });
        return this.props.getNearbyCheckIns(latitude, longitude);
      })
      .catch(() => {
        // pass
      })
      .finally(() => {
        this.setState({ isSelectingNewPosition: false });
      });
  }

  renderHeader = () => {
    const iconColor = Platform.OS === 'ios' ? 'black' : 'white';
    return (
      <Header>
        {Platform.OS === 'ios' ? <Left /> : null}
        <Body><Text style={Styles.headerTitle}>DDFA Check-ins Nearby</Text></Body>
        <Right>
          {this.state.isSelectingNewPosition ? <ActivityIndicator color={iconColor} /> : (
            <Button small transparent onPress={this.selectNewPosition}>
              <Icon name="search" style={{ color: iconColor }} />
            </Button>
          )}
        </Right>
      </Header>
    );
  }

  renderContent = () => {
    const { isLoadingNearbyCheckIns } = this.state;
    const { navigation, setSelectedCheckIn, nearbyCheckIns, position } = this.props;
    return (
      <Content>
        <CheckInNearbyMap
          nearbyCheckIns={nearbyCheckIns}
          latitude={position.latitude}
          longitude={position.longitude}
        />
        <CheckInNearbyList
          navigation={navigation}
          setSelectedCheckIn={setSelectedCheckIn}
          nearbyCheckIns={nearbyCheckIns}
          isLoading={isLoadingNearbyCheckIns}
        />
      </Content>
    );
  }

  render() {
    return (
      <Container>
        {this.renderHeader()}
        {this.renderContent()}
        <GlobalFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
