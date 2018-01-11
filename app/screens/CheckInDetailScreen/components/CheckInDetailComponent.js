// @flow
import moment from 'moment';
import * as React from 'react';
import {
  Container,
  Body,
  Content,
  Text,
  Card,
  CardItem,
} from 'native-base';
import {
  ActivityIndicator,
} from 'react-native';

import CheckInDetailHeader from './CheckInDetailHeader/CheckInDetailHeader';
import CheckInDetailContent from './CheckInDetailContent/CheckInDetailContent';
import CheckInDetailMap from './CheckInDetailMap/CheckInDetailMap';

import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  checkIn: *,
  navigation: *,
  resetSelectedCheckIn: () => *,
  getCheckIn: (string) => *,
  getPhotoUrl: (string) => string,
};

type State = {
  detailedCheckIn: ?*,
};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = { detailedCheckIn: null };

  componentDidMount() {
    this.props.getCheckIn(this.props.checkIn.id)
      .then((detailedCheckIn: *) => {
        this.setState({ detailedCheckIn });
      })
      .catch((error: Error) => {
        console.error(error); // TODO: Handle failure.
      });
  }

  componentWillUnmount() {
    this.props.resetSelectedCheckIn();
  }

  renderTitleCard() {
    const { name, address, createdAt } = this.props.checkIn;
    return (
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
    );
  }

  render() {
    if (!this.props.checkIn) { return null; }
    return (
      <Container>
        <CheckInDetailHeader navigation={this.props.navigation} />
        <Content>
          <CheckInDetailMap
            latitude={this.props.checkIn.latitude}
            longitude={this.props.checkIn.longitude}
          />
          {this.renderTitleCard()}
          {
            this.state.detailedCheckIn ?
              <CheckInDetailContent checkIn={this.state.detailedCheckIn} getPhotoUrl={this.props.getPhotoUrl} />
              :
              <ActivityIndicator color="black" style={Styles.detailedCheckInSpinner} />
          }
        </Content>
      </Container>
    );
  }
}
