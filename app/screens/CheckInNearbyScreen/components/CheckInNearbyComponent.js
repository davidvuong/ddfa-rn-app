// @flow
import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import * as React from 'react';
import {
  Left,
  Right,
  Body,
  Header,
  Container,
  Content,
  Text,
  List,
  ListItem,
  Thumbnail,
  Button,
  Icon,
} from 'native-base';
import {
  ActivityIndicator,
} from 'react-native';

import GlobalFooter from '../../../components/GlobalFooter/GlobalFooter';
import CheckInNearbyMap from './CheckInNearbyMap/CheckInNearbyMap';
import navigationOptions from '../NavigationOptions';
import { initFoodImageGenerator } from '../../../Images';

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
  imageGenerator = initFoodImageGenerator();

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
        console.error(error);
        this.setState({ isLoadingNearbyCheckIns: false });
      });
  }

  navigateToCheckInDetail = (checkIn: *) => {
    this.props.setSelectedCheckIn(checkIn);
    this.props.navigation.navigate('CheckInDetail');
  }

  renderNearbyCheckIns = () => {
    const { nearbyCheckIns } = this.props;
    if (!nearbyCheckIns || !nearbyCheckIns.length) { return null; }
    return (
      <List style={{ marginLeft: -14 }}>
        {
          _.map(this.props.nearbyCheckIns, (checkIn: *) => {
            return (
              <ListItem avatar key={checkIn.id} style={{ paddingLeft: 6 }}>
                <Left>
                  <Thumbnail
                    square
                    style={{ width: 46, height: 46 }}
                    source={this.imageGenerator.get(checkIn.id)}
                  />
                </Left>
                <Body style={{ marginLeft: 5 }}>
                  <Text numberOfLines={1}>{checkIn.name}</Text>
                  <Text numberOfLines={1} note>{checkIn.address}</Text>
                  <Text numberOfLines={1} note style={{ paddingTop: 3, color: 'orange', fontSize: 11, fontWeight: '600' }}>
                    Checked in @ {moment(checkIn.createdAt).format('Do MMM YYYY')} ({Math.round(checkIn.distance) / 1000}km away)
                  </Text>
                </Body>
                <Right>
                  <Body>
                    <Button
                      transparent
                      style={{ width: 25 }}
                      onPress={() => { this.navigateToCheckInDetail(checkIn); }}
                    >
                      <Icon name="arrow-forward" style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.75)' }} />
                    </Button>
                  </Body>
                </Right>
              </ListItem>
            );
          })
        }
      </List>
    );
  }

  renderContent = () => {
    const { currentPosition } = this.state;
    if (!currentPosition) {
      return (
        <Content padder>
          <ActivityIndicator color="black" />
        </Content>
      );
    }

    const { latitude, longitude } = currentPosition.coords;
    return (
      <Content>
        <CheckInNearbyMap latitude={latitude} longitude={longitude} />
        {this.renderNearbyCheckIns()}
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
