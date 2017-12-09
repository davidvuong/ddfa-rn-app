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
} from 'react-native';
import MapView from 'react-native-maps';

import GeoLocationService from '../../../services/GeoLocationService';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  selectedLocation: *,
  navigation: *,
  resetSelectedLocation: () => *,
};

type State = {
  isWritingComment: boolean,
  comment: ?string,
};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  constructor(props: Props) {
    super(props);

    this.state = {
      isWritingComment: false,
      comment: null,
    };

    (this: any).onPressCancel = this.onPressCancel.bind(this);
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
    Alert.alert('Cancel Check-in', 'Are you sure you want to cancel?', buttons);
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
    const { place } = this.props.selectedLocation;
    const { rating, pricingLevel } = place;

    if (!rating || pricingLevel < 0) {
      return (
        <Body>
          <Text>{place.name}</Text>
          <Text note>{place.address}</Text>
        </Body>
      );
    }

    const ratingValue = Math.round(rating * 10) / 10;
    return (
      <Body>
        <Text>{place.name}</Text>
        <Text style={Styles.placeRatingAndPrice}>
          {`${ratingValue} stars `}
          {
            _.map(_.range(Math.floor(rating)), (i: number) => {
              return <Icon key={`star-${i}`} name="md-star" style={Styles.placeRatingStarIcon} />;
            })
          }
          {pricingLevel > 0 ? ` (${_.repeat('$', pricingLevel)})` : ' (?)'}
        </Text>
        <Text note>{place.address}</Text>
      </Body>
    );
  }

  render() {
    const { latitude, longitude } = this.props.selectedLocation;
    const delta = GeoLocationService.calculateRegionDelta(latitude, longitude);
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Text style={Styles.headerTitle}>DDFA CheckIn</Text>
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
            <Card>
              <CardItem header style={Styles.placeContentItem}>
                {this.renderPlaceContent()}
              </CardItem>
              <CardItem style={Styles.placeCommentItem}>
                <Input
                  placeholder="Add any additional comments and/or share your experience at this restaurant..."
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
            <Button onPress={() => { this.onPressCancel(); }}>
              <Text>Cancel</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button>
              <Text>Check In</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
