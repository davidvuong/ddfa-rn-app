// @flow
import moment from 'moment';
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
    if (!this.props.checkIn) { return null; }
    const {
      id,
      name,
      address,
      comment,
      latitude,
      longitude,
      tz,
      createdAt,
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
                <Text note numberOfLines={1} style={Styles.checkedInAtText}>
                  Checked in @ {moment(createdAt).format('h:mmA, Do MMM YYYY')}
                </Text>
              </Body>
            </CardItem>
          </Card>
          {
            comment ? (
              <Card>
                <CardItem>
                  <Body>
                    <Text>{comment}</Text>
                  </Body>
                </CardItem>
              </Card>
            )
            :
            null
          }
          <Card style={{ marginBottom: 20 }}>
            <CardItem header>
              <Body>
                <Text>{id}</Text>
                <Text note>{tz}: (lat:{latitude}, lng:{longitude})</Text>
                <Text note>dt:{createdAt}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
