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
import Styles from '../Styles';

type Props = {
  navigation: *,
  nearbyCheckIns: Array<*>,
  setSelectedCheckIn: (*) => *,
  getNearbyCheckIns: (number, number) => Promise<*>,
  getCurrentPosition: () => Promise<Position>,
  position: { latitude: number, longitude: number },
};

type State = {
  isLoadingNearbyCheckIns: boolean,
};

// TODO: All direct service calls in components (unless in Global) should be passed in (i.e. Screens).
export default class CheckInNearbyComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = {
    isLoadingNearbyCheckIns: false,
    currentPosition: null,
  };

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
        <Header>
          <Body><Text style={Styles.headerTitle}>DDFA Check-ins Nearby</Text></Body>
        </Header>
        {this.renderContent()}
        <GlobalFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
