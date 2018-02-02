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
  View,
} from 'native-base';

import { getRandomAvatar } from '../../../../Images';
import ReviewRatings from '../../../../components/ReviewRatings/ReviewRatings';
import Styles from './Styles';

type Props = {
  reviews: Array<*>,
  getCurrencySymbol: (string) => string,
};

type State = {};

export default class CheckInDetailContent extends React.Component<Props, State> {
  renderSubText = (review: *) => {
    const { currency, amountPaid } = review;
    if (amountPaid === 0) {
      return <Text note>FREE</Text>;
    }
    return (
      <Text note>
        {`PRICE ${this.props.getCurrencySymbol(currency)}${amountPaid} (${currency})`}
      </Text>
    );
  }

  render() {
    if (!this.props.reviews.length) {
      return (
        <View padder style={Styles.emptyReviewsContainer}>
          <Text style={Styles.emptyReviewsText} note>There are no reivews for this check-in...</Text>
        </View>
      );
    }

    const reviews = _.orderBy(this.props.reviews, ['createdAt'], ['asc']);
    return _.map(reviews, (review: *) => {
      const { id, comment, foodRating, serviceRating, environmentRating, user } = review;
      return (
        <Card style={Styles.card} key={id}>
          <CardItem>
            <Left>
              {
                user.avatar ?
                  <Thumbnail source={{ uri: user.avatar }} />
                :
                  <Thumbnail source={getRandomAvatar()} />
              }
              <Body>
                <Text>{user.name || user.username}</Text>
                {this.renderSubText(review)}
              </Body>
            </Left>
          </CardItem>
          {
            !comment ? null : (
              <CardItem>
                <Body>
                  <Text>{comment}</Text>
                </Body>
              </CardItem>
            )
          }
          <CardItem>
            <ReviewRatings
              foodRating={foodRating}
              serviceRating={serviceRating}
              environmentRating={environmentRating}
            />
          </CardItem>
        </Card>
      );
    });
  }
}
