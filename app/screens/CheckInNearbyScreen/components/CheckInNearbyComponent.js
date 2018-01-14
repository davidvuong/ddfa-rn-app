// @flow
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
import navigationOptions from '../NavigationOptions';

type Props = {
  navigation: *,
};

type State = {
  currentLocation: ?*,
};

export default class CheckInNearbyComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = {
    currentLocation: null,
  };

  renderContent() {
    if (!this.state.currentLocation) {
      return (
        <Content>
          <ActivityIndicator color="black" />
        </Content>
      );
    }

    const { latitude, longitude } = this.state.currentLocation.coords;
    return (
      <Content>
        <CheckInNearbyMap latitude={latitude} longitude={longitude} />
      </Content>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text>DDFA Check-ins Nearby</Text>
          </Body>
        </Header>
        {this.renderContent()}
        <GlobalFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
