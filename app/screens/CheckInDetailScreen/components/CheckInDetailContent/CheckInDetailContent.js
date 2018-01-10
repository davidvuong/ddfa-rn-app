// @flow
import * as React from 'react';
import {
  Container,
  Body,
  Content,
  Text,
  Card,
  CardItem,
} from 'native-base';

import Styles from './Styles';

type Props = {
  checkIn: *,
};

type State = {};

export default class CheckInDetailContent extends React.Component<Props, State> {
  render() {
    return <Text>DetailedCheckInContent</Text>;
  }
}
