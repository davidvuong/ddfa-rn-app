import _ from 'lodash';
import * as React from 'react';
import moment from 'moment';
import {
  Left,
  Right,
  Body,
  Thumbnail,
  Text,
  Card,
  CardItem,
} from 'native-base';

import { getRandomAvatar } from '../../../../Images';
import ReviewRatings from '../../../../components/ReviewRatings/ReviewRatings';
import Styles from './Styles';

export default class CheckInDetailContent extends React.Component<> {
  renderSubText = (review) => {
    const { currency, amountPaid } = review;
    const currencySymbol = this.props.getCurrencySymbol(currency);
    if (amountPaid === 0) {
      return <Text note>FREE ${currencySymbol}</Text>;
    }
    return (
      <Text note>
        {`PRICE ${currencySymbol}${amountPaid} (${currency})`}
      </Text>
    );
  }

  renderUserDetails = (review) => {
    return (
      <CardItem>
        <Left>
          {
            review.user.avatar ?
              <Thumbnail source={{ uri: review.user.avatar }} />
            :
              <Thumbnail source={getRandomAvatar()} />
          }
          <Body>
            <Text>{review.user.name || review.user.username}</Text>
            {this.renderSubText(review)}
          </Body>
          <Text style={Styles.reviewedAtText} note>
            {moment(review.createdAt).format('DD/MM/YY, h:mmA')}
          </Text>
        </Left>
      </CardItem>
    );
  }

  render() {
    const reviews = _.orderBy(this.props.reviews, ['createdAt'], ['asc']);
    return _.map(reviews, (review) => {
      const { id, comment, foodRating, serviceRating, environmentRating } = review;
      return (
        <Card style={Styles.card} key={id}>
          {this.renderUserDetails(review)}
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
