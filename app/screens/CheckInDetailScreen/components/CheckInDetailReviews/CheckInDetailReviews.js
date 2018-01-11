// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Left,
  Body,
  Thumbnail,
  Text,
  Card,
  CardItem,
} from 'native-base';

import { initAvatarImageGenerator } from '../../../../Images';
import Styles from './Styles';

type Props = {
  reviews: Array<*>,
};

type State = {};

export default class CheckInDetailContent extends React.Component<Props, State> {
  imageGenerator = initAvatarImageGenerator();
  render() {
    return _.map(this.props.reviews, (review: *) => {
      return (
        <Card style={Styles.card} key={review.id}>
          <CardItem>
            <Left>
              <Thumbnail source={this.imageGenerator.get(review.id)} />
              <Body>
                <Text>{review.user.name || review.user.username}</Text>
                <Text note>
                  <Text style={Styles.ratingsText}>F</Text> {review.foodRating}{', '}
                  <Text style={Styles.ratingsText}>S</Text> {review.serviceRating}{', '}
                  <Text style={Styles.ratingsText}>E</Text> {review.environmentRating}{', '}
                  <Text style={Styles.ratingsText}>P</Text> {review.amountPaid} ({review.currency})
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
}
