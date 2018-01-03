// @flow
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
  Icon,
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
  navigation: *,
  resetSelectedLocation: () => *,
  resetCheckIns: () => *,
  listCheckIns: (string) => *,
};

type State = {
  isWritingComment: boolean,
  comment: ?string,
};

export default class ReviewCreateComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  constructor(props: Props) {
    super(props);

    this.state = {
      isWritingComment: false,
      comment: null,
    };

    (this: any).onPressCancel = this.onPressCancel.bind(this);
    (this: any).onPressSubmit = this.onPressSubmit.bind(this);
    (this: any).onPressDone = this.onPressDone.bind(this);
    (this: any).onFocusComment = this.onFocusComment.bind(this);
    (this: any).onChangeTextComment = this.onChangeTextComment.bind(this);
  }

  componentWillUnmount() {
    this.props.resetSelectedLocation();
  }

  onPressCancel() {
    const buttons = [
      { text: 'Yes', onPress: this.props.navigation.goBack },
      { text: 'No', style: 'cancel' },
    ];
    Alert.alert('Cancel Review', 'Are you sure you want to cancel?', buttons);
  }

  onPressSubmit() {
    // if (this.props.isCheckingIn) { return null; }

    // const { latitude, longitude, place } = this.props.selectedLocation;
    // return this.props.createCheckIn(
    //   latitude,
    //   longitude,
    //   place.address,
    //   place.name,
    //   this.state.comment,
    //   null, // rating
    //   false, // isPaying
    //   null, // amountPaid
    // )
    //   .then(() => {
    //     this.props.resetCheckIns();
    //     return this.props.listCheckIns((new Date()).toISOString());
    //   })
    //   .then(() => {
    //     this.props.navigation.goBack();
    //   })
    //   .catch((error: Error) => {
    //     console.error(error);
    //   });
  }

  onPressDone() {
    this.setState({ isWritingComment: false });
    Keyboard.dismiss();
  }

  onFocusComment() {
    this.setState({ isWritingComment: true });
  }

  onChangeTextComment(comment: string) {
    this.setState({ comment });
  }

  renderPlaceContent() {
    const { rating, pricingLevel, name, address } = this.props.selectedLocation.place;
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
    const { latitude, longitude, rating, pricingLevel, name, address } = this.props.selectedLocation.place;
    const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);
    return (
      <Container>
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
                  this.props.isCheckingIn ? 'Submitting...' : 'Submit'
                }
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
