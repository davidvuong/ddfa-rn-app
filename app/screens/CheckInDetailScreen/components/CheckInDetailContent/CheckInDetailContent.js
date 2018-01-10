// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Left,
  Right,
  Body,
  Thumbnail,
  Text,
  Card,
  CardItem,
} from 'native-base';
import {
  Image,
  ScrollView,
} from 'react-native';

import { initAvatarImageGenerator } from '../../../../Images';
import Styles from './Styles';

type Props = {
  checkIn: *,
};

type State = {};

export default class CheckInDetailContent extends React.Component<Props, State> {
  imageGenerator: Object;

  constructor(props: Props) {
    super(props);

    this.imageGenerator = initAvatarImageGenerator();
  }

  renderPhotos() {
    if (!this.props.checkIn.photos) { return null; }
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
        style={Styles.photosContainer}
      >
        {
          _.map(this.props.checkIn.photos, (photo: *, i: number) => {
            const source = { uri: `http://localhost:5000/photos/${photo.id}` };
            return <Image key={i} source={source} style={Styles.photo} />;
          })
        }
      </ScrollView>
    );
  }

  renderReviews() {
    return _.map(this.props.checkIn.reviews, (review: *, i: number) => {
      return (
        <Card key={i} style={{ flex: 0, marginTop: 0 }}>
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
        {/* {this.renderPhotos()} */}
      </Container>
    );
  }
}
