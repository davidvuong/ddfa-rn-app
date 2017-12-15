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
  Icon,
} from 'native-base';
import {
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';
import Images from '../../../Images';

type Props = {
  checkIns: Array<*>,
  setSelectedCheckIn: (*) => *,
  isListingCheckIns: ?boolean,
  checkInListErrorStatus: ?Error,
  navigation: *,
  listCheckIns: (string) => *,
  logoutUser: () => *,
  setSelectedLocation: (Object) => *,
  resetCheckIns: () => *,
};

type State = {
  isInitialLoad: boolean,
  noMoreCheckIns: boolean,
};

export default class CheckInListComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  sampleImages: Array<*>;
  sampleImagePool: Array<*>;
  backgroundImageCache: Object;
  bottomScrollPadding: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      isInitialLoad: false,
      noMoreCheckIns: false,
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
    (this: any).navigateToCheckInDetail = this.navigateToCheckInDetail.bind(this);
    (this: any).onPressLogout = this.onPressLogout.bind(this);
    (this: any).onPressCheckIn = this.onPressCheckIn.bind(this);
    (this: any).onPressRefresh = this.onPressRefresh.bind(this);
    (this: any).onScroll = this.onScroll.bind(this);
    (this: any).renderCheckIns = this.renderCheckIns.bind(this);
  }

  componentDidMount() {
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

  navigateToCheckInDetail(checkIn: *) {
    this.props.setSelectedCheckIn(checkIn);
    this.props.navigation.navigate('CheckInDetail');
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
    this.props.listCheckIns((new Date()).toISOString())
      .then(() => {
        this.setState({ isInitialLoad: false });
      });
  }

  onPressRefresh() {
    this.props.resetCheckIns();
    this.performInitialLoad();
  }

  onPressCheckIn() {
    const options = { radius: 0.3 };
    RNGooglePlaces.openPlacePickerModal(options)
      .then((place: *) => {
        this.props.setSelectedLocation({
          address: place.address || place.name,
          latitude: place.latitude,
          longitude: place.longitude,
          place,
        });
        this.props.navigation.navigate('CheckInCreate');
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

    this.props.listCheckIns(lastCheckIn.createdAt)
      .finally(() => {
        this.setState({
          noMoreCheckIns: previousCheckInsCount === this.props.checkIns.length,
        });
      });
  }

  renderCheckIns() {
    const { checkIns } = this.props;
    return (
      <Content padder onScroll={this.onScroll}>
        {
          _.map(checkIns, (checkIn: *, index: number) => {
            const isLast = (index + 1) >= checkIns.length;
            return (
              <Card key={checkIn.id} style={{
                marginBottom: isLast ? 20 : 10,
              }}>
                <CardItem
                  activeOpacity={1}
                  button
                  onPress={() => { this.navigateToCheckInDetail(checkIn); }}
                >
                  <Body>
                    <Text numberOfLines={1}>{checkIn.name}</Text>
                    <Text note numberOfLines={1}>{checkIn.address}</Text>
                    <Text note numberOfLines={1} style={Styles.checkedInAtText}>
                      Checked in @ {moment(checkIn.createdAt).format('h:mmA, Do MMM YYYY')}
                    </Text>
                  </Body>
                </CardItem>

                {/* see: https://github.com/GeekyAnts/NativeBase/issues/1453 */}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => { this.navigateToCheckInDetail(checkIn); }}
                >
                  <Image source={this.getBackgroundImage(checkIn.id)} style={Styles.checkInImage} />
                </TouchableOpacity>
              </Card>
            );
          })
        }
      </Content>
    );
  }

  render() {
    const { isListingCheckIns } = this.props;
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
            {isListingCheckIns ? null : (
              <Button small transparent onPress={this.onPressRefresh} style={Styles.refreshButton}>
                <Icon name="refresh" />
              </Button>
            )}
            <Button info small onPress={this.onPressCheckIn}>
              <Text>{isListingCheckIns ? 'Loading...' : 'Check In'}</Text>
              {isListingCheckIns ? <ActivityIndicator color="white" /> : null}
            </Button>
          </Right>
        </Header>
        {this.renderCheckIns()}
      </Container>
    );
  }
}
