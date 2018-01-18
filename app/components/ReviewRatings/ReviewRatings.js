// @flow
import * as React from 'react';
import {
  View,
  Text,
} from 'native-base';

import Styles from './Styles';

type Props = {
  serviceRating?: number,
  foodRating?: number,
  environmentRating?: number,
};

type State = {};

export default class ReviewRatings extends React.Component<Props, State> {
  renderRating = (value: ?number, label: string) => {
    if (!value) {
      return (
        <View style={Styles.ratingContainer}>
          <Text style={Styles.ratingValue}>n/a</Text>
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
  }

  render() {
    return (
      <View style={Styles.container}>
        {this.renderRating(this.props.foodRating, 'food')}
        {this.renderRating(this.props.serviceRating, 'service')}
        {this.renderRating(this.props.environmentRating, 'environ')}
      </View>
    );
  }
}
