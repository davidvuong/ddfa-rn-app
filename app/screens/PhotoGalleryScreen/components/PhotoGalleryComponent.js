import * as React from 'react';
import {
  Container,
  Header,
  Content,
  Body,
  Text,
} from 'native-base';

import GlobalFooter from '../../../components/GlobalFooter/GlobalFooter';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

export default class LoginComponent extends React.Component {
  static navigationOptions = navigationOptions;

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text style={Styles.headerTitle}>DDFA Photo Gallery</Text>
          </Body>
        </Header>
        <Content padder scrollEnabled={false} bounces={false}>
          <Text>Comming soon...</Text>
        </Content>
        <GlobalFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
