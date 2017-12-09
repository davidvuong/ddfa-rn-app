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
  checkIn: *,
  resetSelectedCheckIn: () => *,
};

type State = {};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  componentWillUnmount() {
    this.props.resetSelectedCheckIn();
  }

  render() {
    const {
      name,
      address,
      comment,
      latitude,
      longitude,
    } = this.props.checkIn;

    const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);
    return (
      <Container>
        <Header>
          <Body>
            <Text style={Styles.headerTitle}>DDFA CheckIn</Text>
          </Body>
        </Header>
        <Content>
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
            style={Styles.mapView}
          >
            <MapView.Marker coordinate={{ latitude, longitude }} />
          </MapView>
          <Card>
            <CardItem header>
              <Body>
                <Text>{name}</Text>
                <Text note>{address}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card style={{
            marginBottom: 20,
          }}>
            <CardItem header>
              <Text style={{ fontWeight: '500' }}>Comments</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{comment}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
