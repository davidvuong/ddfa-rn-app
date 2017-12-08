// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  Card,
  CardItem,
} from 'native-base';
import MapView from 'react-native-maps';

import GeoLocationService from '../../../services/GeoLocationService';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  selectedLocation: *,
  resetSelectedLocation: () => *,
};

type State = {};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  componentWillUnmount() {
    this.props.resetSelectedLocation();
  }

  render() {
    const { latitude, longitude, place } = this.props.selectedLocation;
    console.log(place);

    const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);
    return (
      <Container>
        <Header>
          <Body>
            <Text style={Styles.headerTitle}>DDFA Create CheckIn</Text>
          </Body>
        </Header>
        <Content padder>
          <MapView
            zoomEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            moveOnMarkerPress={false}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: delta.latitudeDelta,
              longitudeDelta: delta.longitudeDelta,
            }}
            style={{
              height: 180,
            }}
          >
            <MapView.Marker coordinate={{ latitude, longitude }} />
          </MapView>
          <Text>Welcome to the check-in page</Text>
        </Content>
      </Container>
    );
  }
}
