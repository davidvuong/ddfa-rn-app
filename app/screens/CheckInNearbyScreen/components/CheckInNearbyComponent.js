// @flow
import Promise from 'bluebird';
import * as React from 'react';
import {
  Body,
  Header,
  Container,
  Content,
  Text,
} from 'native-base';
import {
  ActivityIndicator,
} from 'react-native';

import GlobalFooter from '../../../components/GlobalFooter/GlobalFooter';
import CheckInNearbyMap from './CheckInNearbyMap/CheckInNearbyMap';
import CheckInNearbyList from './CheckInNearbyList/CheckInNearbyList';
import navigationOptions from '../NavigationOptions';

import type { Position } from '../../../services/GeoLocationService';

type Props = {
  navigation: *,
  nearbyCheckIns: Array<*>,
  setSelectedCheckIn: (*) => *,
  getNearbyCheckIns: (number, number) => Promise<*>,
  getCurrentPosition: () => Promise<Position>,
};

type State = {
  isLoadingNearbyCheckIns: boolean,
  currentPosition: ?Position,
};

// TODO: All direct service calls in components (unless in Global) should be passed in (i.e. Screens).
export default class CheckInNearbyComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = {
    isLoadingNearbyCheckIns: false,
    currentPosition: null,
  };

  componentDidMount() {
    this.props.getCurrentPosition()
      .then((position: Position) => {
        this.setState({ currentPosition: position, isLoadingNearbyCheckIns: true });
        return this.props.getNearbyCheckIns(position.coords.latitude, position.coords.longitude);
      })
      .then(() => {
        this.setState({ isLoadingNearbyCheckIns: false });
      })
      .catch((error: Error) => {
        this.setState({ isLoadingNearbyCheckIns: false });
        console.error(error);
      });
  }

  renderContent = () => {
    const { currentPosition, isLoadingNearbyCheckIns } = this.state;
    if (!currentPosition) {
      return <Content padder><ActivityIndicator color="black" /></Content>;
    }

    const { latitude, longitude } = currentPosition.coords;
    const { navigation, setSelectedCheckIn, nearbyCheckIns } = this.props;
    return (
      <Content>
        <CheckInNearbyMap
          nearbyCheckIns={nearbyCheckIns}
          latitude={latitude}
          longitude={longitude}
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
        <Header>
          <Body><Text>DDFA Check-ins Nearby</Text></Body>
        </Header>
        {this.renderContent()}
        <GlobalFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
