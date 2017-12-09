// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  Icon,
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

type State = {
  comment1: ?string,
  comment2: ?string,
};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  constructor(props: Props) {
    super(props);

    this.state = {
      comment1: null,
      comment2: null,
    };
  }

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
            style={{
              height: 180,
            }}
          >
            <MapView.Marker coordinate={{ latitude, longitude }} />
          </MapView>
          <Content padder>
          <Card>
            <CardItem header>
              <Body>
                <Text>{place.name}</Text>
                <Text style={{
                  fontSize: 12,
                  marginTop: 3,
                  marginBottom: 3,
                  fontWeight: '500',
                  color: 'orange',
                }}>4.1 stars <Icon name="md-star" style={{ fontSize: 12, color: 'orange' }}/><Icon name="md-star" style={{ fontSize: 12, color: 'orange' }}/><Icon name="md-star" style={{ fontSize: 12, color: 'orange' }}/><Icon name="md-star" style={{ fontSize: 12, color: 'orange' }}/> ($$$)</Text>
                <Text note>{place.address}</Text>
              </Body>
            </CardItem>
          </Card>
          </Content>

        </Content>
      </Container>
    );
  }
}
