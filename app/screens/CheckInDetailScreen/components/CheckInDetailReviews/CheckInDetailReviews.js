import * as React from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Left,
  Body,
  Thumbnail,
  Text,
  Card,
  CardItem,
} from 'native-base';

import { getRandomAvatar } from '../../../../Images';
import ReviewRatings from '../../../../components/ReviewRatings/ReviewRatings';
import Styles from './Styles';

const CheckInDetailContent = ({ getCurrencySymbol, reviews }) => {
  const shouldRenderRatings = (review) => {
    const { foodRating, serviceRating, environmentRating } = review;
    return !_.isNil(foodRating) || !_.isNil(serviceRating) || !_.isNil(environmentRating);
  };

  const renderSubText = (review) => {
    const { currency, amountPaid } = review;
    const currencySymbol = getCurrencySymbol(currency);
    if (amountPaid === 0) {
      return <Text note>FREE {currencySymbol}</Text>;
    }
    return <Text note>{`PRICE ${currencySymbol}${amountPaid} (${currency})`}</Text>;
  };

  const renderUserDetails = (review) => {
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
            {renderSubText(review)}
          </Body>
          <Text style={Styles.reviewedAtText} note>
            {moment(review.createdAt).format('DD/MM/YY, h:mmA')}
          </Text>
        </Left>
      </CardItem>
    );
  };

  const orderedReviews = _.orderBy(reviews, ['createdAt'], ['asc']);
  return _.map(orderedReviews, (review) => {
    const { id, comment, foodRating, serviceRating, environmentRating } = review;
    return (
      <Card style={Styles.card} key={id}>
        {renderUserDetails(review)}
        {
          !comment ? null : (
            <CardItem>
              <Body>
                <Text>{comment}</Text>
              </Body>
            </CardItem>
          )
        }
        {
          !shouldRenderRatings(review) ? null : (
            <CardItem>
              <ReviewRatings
                foodRating={foodRating}
                serviceRating={serviceRating}
                environmentRating={environmentRating}
              />
            </CardItem>
          )
        }
      </Card>
    );
  });
};

export default CheckInDetailContent;
