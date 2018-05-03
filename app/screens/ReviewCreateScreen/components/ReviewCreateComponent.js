// @flow
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

type Props = {
  // TODO: Pull this into a shared type.
  selectedLocation: {
    checkInId: string,
    latitude: number,
    longitude: number,
    rating: ?number,
    pricingLevel: ?number,
    name: string,
    address: string,
  },
  navigation: *,
  createReview: (
    string,
    number,
    string,
    ?string,
    ?number,
    ?number,
    ?number,
  ) => *,
  getCachedReview: (string) => Promise<?Object>,
  setCachedReview: (string, Object) => Promise<void>,
};

type State = {
  createReviewState: 'IDLE' | 'CREATING' | 'CREATED' | 'ERROR',
  isWritingComment: boolean,
  comment: ?string,
};

export default class ReviewCreateComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = {
    createReviewState: 'IDLE',
    isWritingComment: false,
    comment: null,
  };

  componentWillMount() {
    this.props.getCachedReview(this.props.selectedLocation.checkInId)
      .then((cachedReview: ?Object) => {
        if (!cachedReview || _.isEmpty(cachedReview)) { return; }
        this.setState({ comment: cachedReview.comment });
      });
  }

  onPressSubmit = () => {
    if (this.state.isCreatingReview) { return null; }

    this.setState({ createReviewState: 'CREATING' });
    return this.props.createReview(
      this.props.selectedLocation.checkInId,
      0, // amountPaid
      'AUD', // currency
      this.state.comment,
      null, // foodRating
      null, // environmentRating
      null, // serviceRating
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
      .catch((error: Error) => {
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

  onChangeTextComment = (comment: string) => {
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
              value={this.state.comment}
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
