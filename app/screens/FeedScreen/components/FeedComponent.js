// @flow
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  Left,
  Right,
  Button,
  Spinner,
} from 'native-base';
import {
  Image,
  Alert,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import GeoLocationService from '../../../services/GeoLocationService';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';
import Images from '../../../Images';

type Props = {
  checkIns: Array<*>,
  isListingCheckIns: ?boolean,
  checkInListErrorStatus: ?Error,
  navigation: *,
  listCheckIns: (string, number) => *,
  logoutUser: () => *,
  setSelectedLocation: (*) => *,
};

type State = {
  isInitialLoad: boolean,
  paginationSize: number,
  noMoreCheckIns: boolean,
  isLoadingMore: boolean,
};

export default class FeedScreen extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  sampleImages: Array<*>;
  sampleImagePool: Array<*>;
  backgroundImageCache: Object;
  bottomScrollPadding: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      isInitialLoad: false,
      paginationSize: 20,
      noMoreCheckIns: false,
      isLoadingMore: false,
    };

    this.sampleImages = [
      Images.foodImage1,
      Images.foodImage2,
      Images.foodImage3,
      Images.foodImage4,
      Images.foodImage5,
      Images.foodImage6,
      Images.foodImage7,
      Images.foodImage8,
      Images.foodImage9,
    ];
    this.sampleImagePool = [];
    this.backgroundImageCache = {};
    this.bottomScrollPadding = 20;

    (this: any).performInitialLoad = this.performInitialLoad.bind(this);
    (this: any).getBackgroundImage = this.getBackgroundImage.bind(this);
    (this: any).navigateToLogin = this.navigateToLogin.bind(this);
    (this: any).onPressLogout = this.onPressLogout.bind(this);
    (this: any).onPressCheckIn = this.onPressCheckIn.bind(this);
    (this: any).onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    // Initial load to fetch a couple of check-ins (only if nothing exists).
    if (!this.props.checkIns.length) {
      this.performInitialLoad();
    }
  }

  navigateToLogin() {
    this.props.logoutUser()
      .then(() => {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login' }),
          ],
        }));
      })
      .catch((error: Error) => { console.error(error.message); });
  }

  onPressLogout() {
    const buttons = [
      { text: 'Yes', onPress: this.navigateToLogin },
      { text: 'Cancel', style: 'cancel' },
    ];
    Alert.alert('Exit DDFA', 'Are you sure you want to log out?', buttons);
  }

  /* Memorization and tries to reduce duplicated image series. */
  getBackgroundImage(checkInId: string) {
    const cachedBackgroundImage = this.backgroundImageCache[checkInId];
    if (cachedBackgroundImage) {
      return cachedBackgroundImage;
    }
    if (!this.sampleImagePool.length) {
      this.sampleImagePool = _.shuffle(_.cloneDeep(this.sampleImages));
    }
    const backgroundImage = this.sampleImagePool.shift();
    this.backgroundImageCache[checkInId] = backgroundImage;
    return backgroundImage;
  }

  performInitialLoad() {
    this.setState({ isInitialLoad: true });
    this.props.listCheckIns((new Date()).toISOString(), this.state.paginationSize)
      .then(() => {
        this.setState({ isInitialLoad: false });
      });
  }

  onPressCheckIn() {
    const options = { type: 'establishments', radius: 0.3 };
    RNGooglePlaces.openPlacePickerModal(options)
      .then((place: *) => {
        const delta = GeoLocationService.calculateRegionDelta(place.latitude, place.longitude);
        const selectedLocation = {
          address: place.address || place.name,
          latitudeDelta: delta.latitudeDelta,
          longitudeDelta: delta.longitudeDelta,
          place,
        };
        this.props.setSelectedLocation(selectedLocation);
        console.log(selectedLocation);
        // this.props.navigation.navigate('CheckIn');
      })
      .catch((error: Error) => { console.log(error.message); });
  }

  onScroll(event: *) {
    // Check if we're at the bottom of the page.
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (!(layoutMeasurement.height + contentOffset.y > contentSize.height - this.bottomScrollPadding)) {
      return;
    }
    // Check if we're already listing checkins.
    if (this.props.isListingCheckIns) {
      return;
    }
    // Check if we've loaded the last set upf checkins.
    if (this.state.noMoreCheckIns) {
      return;
    }

    const lastCheckIn = _.last(this.props.checkIns);
    const previousCheckInsCount = this.props.checkIns.length;

    this.setState({ isLoadingMore: true });
    this.props.listCheckIns(lastCheckIn.createdAt, this.state.paginationSize)
      .finally(() => {
        this.setState({
          isLoadingMore: false,
          noMoreCheckIns: previousCheckInsCount == this.props.checkIns.length,
        });
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onPressLogout}>
              <Text style={Styles.logoutButtonText}>
                ✕
              </Text>
            </Button>
          </Left>
          <Body>
            <Text style={Styles.headerTitle}>DDFA Feed</Text>
          </Body>
          <Right>
            <Button info small onPress={this.onPressCheckIn}>
              <Text>Check In</Text>
            </Button>
          </Right>
        </Header>
        <Content padder removeClippedSubviews={true} onScroll={this.onScroll}>
          {
            _.map(this.props.checkIns, (checkIn: *) => {
              return (
                <Card key={checkIn.id}>
                  <CardItem>
                    <Body>
                      <Text numberOfLines={1}>{checkIn.name}</Text>
                      <Text note numberOfLines={1}>{checkIn.address}</Text>
                    </Body>
                  </CardItem>
                  <CardItem cardBody>
                    <Image source={this.getBackgroundImage(checkIn.id)} style={Styles.checkInImage} />
                    <Text note numberOfLines={1} style={Styles.lastCheckedInText}>
                      Checked in {moment(checkIn.createdAt).fromNow()}
                    </Text>
                  </CardItem>
                </Card>
              );
            })
          }
          {this.props.isLoadingMore ? <Spinner color="black" /> : null}
        </Content>
      </Container>
    );
  }
}
