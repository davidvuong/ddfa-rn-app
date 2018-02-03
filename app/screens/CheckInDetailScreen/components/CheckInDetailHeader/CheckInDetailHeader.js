// @flow
import * as React from 'react';
import {
  Header,
  Body,
  Left,
  Right,
  Text,
  Icon,
  Button,
} from 'native-base';
import {
  Platform,
} from 'react-native';

import Styles from './Styles';

type Props = {
  navigation: *,
};

type State = {};

export default class CheckInDetailHeader extends React.Component<Props, State> {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => { this.props.navigation.goBack(); }}>
            <Icon name="arrow-back" style={Styles.headerBackIcon} />
          </Button>
        </Left>
        <Body>
          <Text style={Styles.headerTitle}>DDFA CheckIn</Text>
        </Body>
        <Right />
      </Header>
    );
  }
}
