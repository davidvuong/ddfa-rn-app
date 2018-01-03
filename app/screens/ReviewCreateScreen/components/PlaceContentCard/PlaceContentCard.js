// @flow
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

type Props = {
  rating: ?number,
  pricingLevel: ?number,
  name: string,
  address: string,
};

type State = {};

export default class PlaceContentCard extends React.Component<Props, State> {
  renderBody() {
    const { rating, pricingLevel, name, address } = this.props;
    if (!rating || pricingLevel < 0) {
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
            _.map(_.range(Math.floor(rating)), (i: number) => {
              return <Icon key={`star-${i}`} name="md-star" style={Styles.placeRatingStarIcon} />;
            })
          }
          {pricingLevel > 0 ? ` (${_.repeat('$', pricingLevel)})` : ' (?)'}
        </Text>
        <Text note>{address}</Text>
      </Body>
    );
  }

  render() {
    return (
      <Card>
        <CardItem header>{this.renderBody()}</CardItem>
      </Card>
    );
  }
}
