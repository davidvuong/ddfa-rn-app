import _ from 'lodash';
import * as React from 'react';
import {
  View,
} from 'react-native';
import {
  Text,
  Icon,
} from 'native-base';

import Styles from './Styles';

const PlaceContent = ({ rating, pricingLevel, name, address }) => {
  if (!rating || !pricingLevel || pricingLevel < 0) {
    return (
      <View>
        <Text>{name}</Text>
        <Text note>{address}</Text>
      </View>
    );
  }
  const ratingValue = Math.round(rating * 10) / 10;
  return (
    <View>
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
    </View>
  );
};

export default PlaceContent;
