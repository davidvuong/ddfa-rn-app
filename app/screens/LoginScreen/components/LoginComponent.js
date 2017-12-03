// @flow
import * as React from 'react';

import {
  Container,
  Text,
} from 'native-base';

import navigationOptions from '../NavigationOptions';

type Props = {

};

type State = {
  username: ?string,
  password: ?string,
};

export default class LoginComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  constructor(props: Props) {
    super(props);
    this.state = { username: null, password: null };
  }

  render() {
    return (
      <Container>
        <Text>Welcome to the log in screen.</Text>
      </Container>
    );
  }
}
