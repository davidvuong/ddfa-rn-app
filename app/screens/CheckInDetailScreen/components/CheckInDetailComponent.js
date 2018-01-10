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

import CheckInDetailHeader from './CheckInDetailHeader/CheckInDetailHeader';
import CheckInDetailMap from './CheckInDetailMap/CheckInDetailMap';

import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  checkIn: *,
  navigation: *,
  resetSelectedCheckIn: () => *,
  getCheckIn: (string) => *,
};

type State = {
  detailedCheckIn: *,
};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  componentDidMount() {
    this.props.getCheckIn(this.props.checkIn.id)
      .then((detailedCheckIn: *) => {
        this.setState({ detailedCheckIn });
        console.log(detailedCheckIn);
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

  renderDebugCard() {
    const { id, latitude, longitude, tz, createdAt } = this.props.checkIn;
    return (
      <Card style={{ marginBottom: 20 }}>
        <CardItem header>
          <Body>
            <Text>{id}</Text>
            <Text note>{tz}: (lat:{latitude}, lng:{longitude})</Text>
            <Text note>dt:{createdAt}</Text>
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
          <CheckInDetailMap latitude={this.props.checkIn.latitude} longitude={this.props.checkIn.longitude} />
          {this.renderTitleCard()}
          {this.renderDebugCard()}
        </Content>
      </Container>
    );
  }
}
