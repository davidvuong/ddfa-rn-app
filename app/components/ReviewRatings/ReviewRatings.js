import * as React from 'react';
import {
  View,
  Text,
} from 'native-base';

import Styles from './Styles';

const ReviewRatings = ({ foodRating, serviceRating, environmentRating }) => {
  const renderRating = (value, label) => {
    if (!value) {
      return (
        <View style={Styles.ratingContainer}>
          <Text style={Styles.ratingValueNA}>n/a</Text>
          <Text uppercase style={Styles.ratingLabel}>{label}</Text>
        </View>
      );
    }
    return (
      <View style={Styles.ratingContainer}>
        <Text style={Styles.ratingValue}>
          {value}
          <Text style={Styles.ratingValueDenominator}>/10</Text>
        </Text>
        <Text uppercase style={Styles.ratingLabel}>{label}</Text>
      </View>
    );
  };
  return (
    <View style={Styles.container}>
      {renderRating(foodRating, 'food')}
      {renderRating(serviceRating, 'service')}
      {renderRating(environmentRating, 'environ')}
    </View>
  );
};

export default ReviewRatings;
