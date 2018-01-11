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
  getCurrencySymbol: (string) => string,
};

type State = {};

export default class CheckInDetailContent extends React.Component<Props, State> {
  imageGenerator = initAvatarImageGenerator();

  renderSubText(review: *) {
    const { foodRating, serviceRating, environmentRating, currency, amountPaid } = review;
    const price = amountPaid === 0 ? 'FREE' : `${this.props.getCurrencySymbol(currency)}${amountPaid} (${currency})`;
    return (
      <Text note>
        <Text note style={Styles.ratingsText}>F</Text>: {foodRating}{' '}
        <Text note style={Styles.ratingsText}>S</Text>: {serviceRating}{' '}
        <Text note style={Styles.ratingsText}>E</Text>: {environmentRating}{' '}
        <Text note style={Styles.ratingsText}>P</Text>: {price}
      </Text>
    );
  }

  render() {
    if (!this.props.reviews.length) { return null; }
    return _.map(this.props.reviews, (review: *) => {
      return (
        <Card style={Styles.card} key={review.id}>
          <CardItem>
            <Left>
              <Thumbnail source={this.imageGenerator.get(review.id)} />
              <Body>
                <Text>{review.user.name || review.user.username}</Text>
                {this.renderSubText(review)}
              </Body>
            </Left>
          </CardItem>
          {
            !review.comment ? null : (
              <CardItem>
                <Body>
                  <Text>{review.comment}</Text>
                </Body>
              </CardItem>
            )
          }
        </Card>
      );
    });
  }
}
