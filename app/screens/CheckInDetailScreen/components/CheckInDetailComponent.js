// @flow
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  Left,
  Right,
  Button,
  Spinner,
  Icon,
} from 'native-base';

import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';
import Images from '../../../Images';

type Props = {
  checkIn: *,
};

type State = {};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={Styles.headerTitle}>DDFA CheckIn</Text>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Text>Welcome to the CheckInDetailScreen {this.props.checkIn.name}</Text>
        </Content>
      </Container>
    );
  }
}
