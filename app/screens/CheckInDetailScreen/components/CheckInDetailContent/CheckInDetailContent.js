// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Left,
  Body,
  Thumbnail,
  Text,
  Card,
  CardItem,
} from 'native-base';
import {
  Image,
} from 'react-native';
import Swiper from 'react-native-swiper';

import { initAvatarImageGenerator } from '../../../../Images';
import Styles from './Styles';

type Props = {
  checkIn: *,
  getPhotoUrl: (string) => string,
};

type State = {};

export default class CheckInDetailContent extends React.Component<Props, State> {
  imageGenerator: Object;

  constructor(props: Props) {
    super(props);

    this.imageGenerator = initAvatarImageGenerator();
  }

  renderPhotos() {
    return (
      <Swiper loop height={420} activeDotColor="rgba(255, 255, 255, 0.65)">
        {
          _.map(this.props.checkIn.photos, (photo: *) => {
            const source = { uri: this.props.getPhotoUrl(photo.id) };
            return <Image key={photo.id} source={source} style={Styles.photo} />;
          })
        }
      </Swiper>
    );
  }

  renderReviews() {
    return _.map(this.props.checkIn.reviews, (review: *) => {
      return (
        <Card key={review.id} style={{ flex: 0, marginTop: 0 }}>
          <CardItem>
            <Left>
              <Thumbnail source={this.imageGenerator.get(review.id)} />
              <Body>
                <Text>{review.user.username}</Text>
                <Text note>
                  <Text style={{ fontWeight: '300', color: 'orange' }}>F</Text> {review.foodRating}{', '}
                  <Text style={{ fontWeight: '300', color: 'orange' }}>S</Text> {review.serviceRating}{', '}
                  <Text style={{ fontWeight: '300', color: 'orange' }}>E</Text> {review.environmentRating}{', '}
                  <Text style={{ fontWeight: '300', color: 'orange' }}>P</Text> {review.amountPaid} ({review.currency})
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{review.comment}</Text>
            </Body>
          </CardItem>
        </Card>
      );
    });
  }

  render() {
    return (
      <Container>
        {this.renderReviews()}
        {this.renderPhotos()}
      </Container>
    );
  }
}
