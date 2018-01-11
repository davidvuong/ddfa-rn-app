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
import MapView from 'react-native-maps';

import PlaceContentCard from './PlaceContentCard/PlaceContentCard';
import GeoLocationService from '../../../services/GeoLocationService';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  selectedLocation: *,
  isCreatingReview: boolean,
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
  isWritingComment: boolean,
  comment: ?string,
};

export default class ReviewCreateComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = {
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
    if (this.props.isCreatingReview) { return null; }

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
        this.props.navigation.goBack();
      })
      .catch((error: Error) => {
        console.error(error);
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
    return (
      <Header>
        {Platform.OS === 'ios' ? <Left /> : null}
        <Body>
          <Text style={Styles.headerTitle}>DDFA Review</Text>
        </Body>
        <Right>
          {
            this.state.isWritingComment ? (
              <Button transparent onPress={this.onPressDone}>
                <Text>Done</Text>
              </Button>
            ) : null
          }
        </Right>
      </Header>
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
            <Text>{this.props.isCreatingReview ? 'Submitting...' : 'Submit'}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }

  render() {
    const { latitude, longitude, rating, pricingLevel, name, address } = this.props.selectedLocation.place;
    const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);
    return (
      <Container>
        {this.renderHeader()}
        <Content>
          <MapView
            zoomEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            toolbarEnabled={false}
            moveOnMarkerPress={false}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: delta.latitudeDelta,
              longitudeDelta: delta.longitudeDelta,
            }}
            style={Styles.mapView}
          >
            <MapView.Marker coordinate={{ latitude, longitude }} />
          </MapView>
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
        </Content>
        {this.renderFooter()}
      </Container>
    );
  }
}
