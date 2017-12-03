// @flow
import * as React from 'react';
import {
  Container,
  Content,
  Text,
} from 'native-base';

import navigationOptions from '../NavigationOptions';

type Props = {

};

type State = {

};

export default class FeedScreen extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Content>
          <Text>Welcome to the feed page!</Text>
        </Content>
      </Container>
    );
  }
}
