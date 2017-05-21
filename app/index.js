import React, { Component } from 'react';
import { Container, Left, Right, Button, Body, Title, Icon, Header } from 'native-base';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
          <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}
