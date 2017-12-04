// @flow
import * as React from 'react';
import {
  Container,
  Header,
  Body,
  Content,
  Text,
} from 'native-base';

import navigationOptions from '../NavigationOptions';

type Props = {
  checkIns: Array<*>,
  isListingCheckIns: ?boolean,
  checkInListErrorStatus: ?Error,
  listCheckIns: (string, number) => *,
};

type State = {
  isInitialLoad: boolean,
  paginationSize: number,
};

export default class FeedScreen extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  constructor(props: Props) {
    super(props);

    this.state = {
      isInitialLoad: false,
      paginationSize: 20,
    };
    (this: any).performInitialLoad = this.performInitialLoad.bind(this);
  }

  componentDidMount() {
    // Initial load to fetch a couple of check-ins (only if nothing exists).
    if (!this.props.checkIns.length) {
      this.performInitialLoad();
    }
  }

  performInitialLoad() {
    this.setState({ isInitialLoad: true });
    this.props.listCheckIns((new Date()).toISOString(), this.state.paginationSize)
      .finally(() => {
        this.setState({ isInitialLoad: false });
      });
  }

  render() {
    console.log(this.props);
    return (
      <Container>
        <Header>
          <Body>
            <Text>DDFA Feed</Text>
          </Body>
        </Header>
        <Content padder>
          <Text>Welcome to the feed page!</Text>
        </Content>
      </Container>
    );
  }
}
