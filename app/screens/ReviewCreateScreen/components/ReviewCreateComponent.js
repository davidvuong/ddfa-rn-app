import * as React from 'react';
import Promise from 'bluebird';
import _ from 'lodash';
import {
  Container,
  Content,
} from 'native-base';
import {
  Keyboard,
} from 'react-native';

import ReviewCreateFooter from './ReviewCreateFooter/ReviewCreateFooter';
import ReviewCreateContent from './ReviewCreateContent/ReviewCreateContent';
import ReviewCreateHeader from './ReviewCreateHeader/ReviewCreateHeader';
import GenericStaticMap from '../../../components/GenericStaticMap/GenericStaticMap';

import navigationOptions from '../NavigationOptions';

export default class ReviewCreateComponent extends React.Component {
  static navigationOptions = navigationOptions;
  state = {
    createReviewState: 'IDLE',
    isWritingComment: false,
  };
  review = {
    comment: null,
    amountPaid: 0,
    currency: 'AUD',
    foodRating: null,
    environmentRating: null,
    serviceRating: null,
  };

  componentWillMount() {
    this.props.getCachedReview(this.props.selectedLocation.checkInId)
      .then((cachedReview) => {
        this.review = { ...this.review, ...cachedReview };
      });
  }

  onPressSubmit = () => {
    if (this.state.isCreatingReview) { return null; }

    console.log(this);
    this.setState({ createReviewState: 'CREATING' });
    const { comment, amountPaid, currency, foodRating, environmentRating, serviceRating } = this.review;
    const checkInId = this.props.selectedLocation.checkInId; // eslint-disable-line prefer-destructuring

    return this.props.createReview(
      checkInId, amountPaid, currency, comment, foodRating, environmentRating, serviceRating,
    )
      .then(() => {
        // @see: https://github.com/react-navigation/react-navigation/issues/1416
        const { state } = this.props.navigation;
        if (state.params && state.params.goBackCallback) {
          return state.params.goBackCallback();
        }
        return null;
      })
      .then(() => {
        return this.props.setCachedReview(this.props.selectedLocation.checkInId, {}); // rm upon complete.
      })
      .then(() => {
        this.setState({ createReviewState: 'CREATED' });
        return Promise.delay(1500);
      })
      .then(() => {
        return this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error(error);
        this.setState({ createReviewState: 'ERROR' });
        _.delay(() => { this.setState({ createReviewState: 'IDLE' }); }, 1000);
      });
  }

  onPressDone = () => {
    this.setState({ isWritingComment: false });
    Keyboard.dismiss();
  }

  onFocusComment = () => {
    this.setState({ isWritingComment: true });
  }

  onChangeTextComment = (comment) => {
    this.review.comment = comment;
    return this.props.setCachedReview(this.props.selectedLocation.checkInId, { comment });
  }

  render() {
    const { latitude, longitude } = this.props.selectedLocation;
    return (
      <Container>
        <ReviewCreateHeader
          isWritingComment={this.state.isWritingComment}
          onPressLeft={() => { this.props.navigation.goBack(); }}
          onPressRight={this.onPressDone}
        />
        <Content>
          <GenericStaticMap latitude={latitude} longitude={longitude} />
          <ReviewCreateContent
            selectedLocation={this.props.selectedLocation}
            defaultCommentValue={this.review.comment}
            onCommentFocus={this.onFocusComment}
            onCommentBlur={this.onPressDone}
            onCommentChange={this.onChangeTextComment}
          />
        </Content>
        {
          !this.state.isWritingComment &&
            <ReviewCreateFooter onPress={this.onPressSubmit} status={this.state.createReviewState} />
        }
      </Container>
    );
  }
}
