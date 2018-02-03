// @flow
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
} from 'native-base';
import {
  Alert,
  Keyboard,
  Platform,
} from 'react-native';

import PlaceContentCard from './PlaceContentCard/PlaceContentCard';
import GenericStaticMap from '../../../components/GenericStaticMap/GenericStaticMap';

import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  selectedLocation: *,
  createReviewErrorStatus: ?Error,
  navigation: *,
  resetSelectedLocation: () => *,
  resetCheckIns: () => *,
  listCheckIns: (string) => *,
  createReview: (
    string,
    number,
    string,
    ?string,
    ?number,
    ?number,
    ?number,
  ) => *,
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

  componentWillUnmount() {
    this.props.resetSelectedLocation();
  }

  onPressCancel = () => {
    const buttons = [
      { text: 'Yes', onPress: this.props.navigation.goBack },
      { text: 'No', style: 'cancel' },
    ];
    Alert.alert('Cancel Review', 'Are you sure you want to cancel?', buttons);
  }

  onPressSubmit = () => {
    if (this.state.isCreatingReview) { return null; }

    this.setState({ createReviewState: 'CREATING' });
    return this.props.createReview(
      this.props.selectedLocation.id, // checkInId
      0, // amountPaid
      'AUD', // currency
      this.state.comment,
      null, // foodRating
      null, // environmentRating
      null, // serviceRating
    )
      .then(() => {
        this.props.resetCheckIns();
        return this.props.listCheckIns((new Date()).toISOString());
      })
      .then(() => {
        this.setState({ createReviewState: 'CREATED' });
        setTimeout(() => {
          this.props.navigation.goBack();
        }, 1500);
      })
      .catch((error: Error) => {
        console.error(error);
        this.setState({ createReviewState: 'ERROR' });
        setTimeout(() => {
          this.setState({ createReviewState: 'IDLE' });
        }, 1000);
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
    this.setState({ comment });
  }

  renderHeader = () => {
    const { isWritingComment } = this.state;
    return (
      <Header>
        {Platform.OS === 'ios' && !isWritingComment ? <Left /> : null}
        {
          isWritingComment ? null : (
            <Body>
              <Text style={Styles.headerTitle}>DDFA Review</Text>
            </Body>
          )
        }
        <Right>
          {
            !isWritingComment ? null : (
              <Button transparent onPress={this.onPressDone}>
                <Text>Done</Text>
              </Button>
            )
          }
        </Right>
      </Header>
    );
  }

  renderContent = () => {
    const { rating, pricingLevel, name, address } = this.props.selectedLocation.place;
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
              multiline={true}
              style={Styles.commentInput}
              onChangeText={this.onChangeTextComment}
              maxLength={2048}
              autoGrow={true}
              onBlur={() => { this.setState({ isWritingComment: false }); }}
            />
          </CardItem>
        </Card>
      </Content>
    );
  }

  renderFooter = () => {
    return (
      <Footer>
        <FooterTab>
          <Button onPress={this.onPressCancel}>
            <Text>Cancel</Text>
          </Button>
        </FooterTab>
        <FooterTab>
          <Button onPress={this.onPressSubmit}>
            <Text>
              {
                (() => {
                  switch (this.state.createReviewState) {
                    case 'IDLE':
                      return 'Submit';
                    case 'CREATING':
                      return 'Submitting';
                    case 'CREATED':
                      return 'Success :)';
                    case 'ERROR':
                      return 'Failed...';
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
    const { latitude, longitude } = this.props.selectedLocation.place;
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
