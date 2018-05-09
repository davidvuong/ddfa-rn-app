import _ from 'lodash';
import * as React from 'react';
import {
  Body,
  Text,
  Icon,
  Card,
  CardItem,
} from 'native-base';

import Styles from './Styles';

const PlaceContentCard = ({ rating, pricingLevel, name, address }) => {
  const renderBody = () => {
    if (!rating || !pricingLevel || pricingLevel < 0) {
      return (
        <Body>
          <Text>{name}</Text>
          <Text note>{address}</Text>
        </Body>
      );
    }
    const ratingValue = Math.round(rating * 10) / 10;
    return (
      <Body>
        <Text>{name}</Text>
        <Text style={Styles.placeRatingAndPrice}>
          {`${ratingValue} stars `}
          {
            _.map(_.range(Math.floor(rating)), (i) => {
              return <Icon key={`star-${i}`} name="md-star" style={Styles.placeRatingStarIcon} />;
            })
          }
          {pricingLevel > 0 ? ` (${_.repeat('$', pricingLevel)})` : ' (?)'}
        </Text>
        <Text note>{address}</Text>
      </Body>
    );
  };
  return (
    <Card>
      <CardItem header>{renderBody()}</CardItem>
    </Card>
  );
};

export default PlaceContentCard;
