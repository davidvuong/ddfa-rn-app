import * as React from 'react';
import _ from 'lodash';
import {
  Container,
  Header,
  Content,
  Body,
  Text,
} from 'native-base';

import { getRandomFood } from '../../../Images';
import GlobalFooter from '../../../components/GlobalFooter/GlobalFooter';
import ImageCarousel from '../../../components/ImageCarousel/ImageCarousel';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

export default class LoginComponent extends React.Component {
  static navigationOptions = navigationOptions;

  IMAGES = _.range(10, () => { return getRandomFood(); });

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
          <ImageCarousel images={this.IMAGES} />
        </Content>
        <GlobalFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
