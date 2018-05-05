import Promise from 'bluebird';
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
  Input,
  Icon,
} from 'native-base';
import {
  Keyboard,
} from 'react-native';

import PlaceContentCard from './PlaceContentCard/PlaceContentCard';
import GenericStaticMap from '../../../components/GenericStaticMap/GenericStaticMap';

import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

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

  renderHeader = () => {
    const { isWritingComment } = this.state;
    if (isWritingComment) {
      return (
        <Header>
          <Left />
          <Body />
          <Right>
            <Button transparent onPress={this.onPressDone}>
              <Text style={Styles.headerText}>Done</Text>
            </Button>
          </Right>
        </Header>
      );
    }
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => { this.props.navigation.goBack(); }}>
            <Icon name="arrow-back" style={Styles.headerBackIcon} />
          </Button>
        </Left>
        <Body>
          <Text style={Styles.headerText}>DDFA Review</Text>
        </Body>
        <Right />
      </Header>
    );
  }

  renderContent = () => {
    const { rating, pricingLevel, name, address } = this.props.selectedLocation;
    return (
      <Content padder>
        <PlaceContentCard
          rating={rating}
          pricingLevel={pricingLevel}
          name={name}
          address={address}
        />
        <Card>
          <CardItem style={Styles.placeCommentItem}>
            <Input
              placeholder="Add any additional comments and share your experience at this restaurant..."
              onFocus={this.onFocusComment}
              style={Styles.commentInput}
              onChangeText={this.onChangeTextComment}
              maxLength={2048}
              autoGrow
              multiline
              defaultValue={this.review.comment}
              onBlur={this.onPressDone}
            />
          </CardItem>
        </Card>
      </Content>
    );
  }

  renderFooter = () => {
    return (
      <Footer style={Styles.footerContainer}>
        <FooterTab style={Styles.footerTab}>
          <Button onPress={this.onPressSubmit}>
            <Text style={Styles.footerText}>
              {
                (() => {
                  switch (this.state.createReviewState) {
                    case 'IDLE':
                      return 'Submit';
                    case 'CREATING':
                      return 'Submitting...';
                    case 'CREATED':
                      return 'Success 🎉!';
                    case 'ERROR':
                      return 'Failed :(';
                    default:
                      return 'Submit';
                  }
                })()
              }
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }

  render() {
    const { latitude, longitude } = this.props.selectedLocation;
    return (
      <Container>
        {this.renderHeader()}
        <Content>
          <GenericStaticMap latitude={latitude} longitude={longitude} />
          {this.renderContent()}
        </Content>
        {this.state.isWritingComment ? null : this.renderFooter()}
      </Container>
    );
  }
}
