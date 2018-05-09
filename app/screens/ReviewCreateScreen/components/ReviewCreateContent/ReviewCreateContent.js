import * as React from 'react';
import _ from 'lodash';

import {
  Content,
  Card,
  CardItem,
  Input,
} from 'native-base';

import PlaceContent from '../PlaceContent/PlaceContent';
import ImageBanner from '../ImageBanner/ImageBanner';
import Styles from './Styles';

const ReviewCreateContent = ({
  selectedLocation,
  defaultCommentValue,
  onCommentFocus,
  onCommentBlur,
  onCommentChange,
}) => {
  const { rating, pricingLevel, name, address } = selectedLocation;
  return (
    <Content padder>
      <Card>
        <CardItem>
          <PlaceContent
            rating={rating}
            pricingLevel={pricingLevel}
            name={name}
            address={address}
          />
        </CardItem>
      </Card>
      <ImageBanner />
      <Card>
        <CardItem style={Styles.commentItem}>
          <Input
            placeholder="Add any additional comments and share your experience at this restaurant..."
            onFocus={onCommentFocus}
            style={Styles.commentInput}
            onChangeText={onCommentChange}
            maxLength={2048}
            autoGrow
            multiline
            defaultValue={defaultCommentValue}
            onBlur={onCommentBlur}
          />
        </CardItem>
      </Card>
    </Content>
  );
};

export default ReviewCreateContent;
