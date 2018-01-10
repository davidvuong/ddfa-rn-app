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

    return (
      <Container>
        <CheckInDetailHeader navigation={this.props.navigation} />
        <Content>
          <CheckInDetailMap latitude={latitude} longitude={longitude} />
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
