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
    const { name, address, comment } = this.props.checkIn;
    return (
      <Container>
        <Header>
          <Body>
            <Text style={Styles.headerTitle}>DDFA CheckIn</Text>
          </Body>
        </Header>
        <Content padder>
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
              <Text>Comments</Text>
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
