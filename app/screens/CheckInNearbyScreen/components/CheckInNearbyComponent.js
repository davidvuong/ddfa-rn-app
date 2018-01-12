// @flow
import * as React from 'react';
import {
  Container,
  Content,
} from 'native-base';

import GlobalFooter from '../../../components/GlobalFooter/GlobalFooter';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  navigation: *,
};

type State = {};

export default class CheckInNearbyComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  render() {
    return (
      <Container>
        <Content />
        <GlobalFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
