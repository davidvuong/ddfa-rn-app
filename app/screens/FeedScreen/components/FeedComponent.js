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
} from 'native-base';
import {
  Image,
  Alert,
} from 'react-native';

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
};

type State = {
  isInitialLoad: boolean,
  paginationSize: number,
};

export default class FeedScreen extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  sampleImages: Array<*>;
  sampleImagePool: Array<*>;
  backgroundImageCache: Object;

  constructor(props: Props) {
    super(props);

    this.state = {
      isInitialLoad: false,
      paginationSize: 20,
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

    (this: any).performInitialLoad = this.performInitialLoad.bind(this);
    (this: any).getBackgroundImage = this.getBackgroundImage.bind(this);
    (this: any).navigateToLogin = this.navigateToLogin.bind(this);
    (this: any).onPressLogout = this.onPressLogout.bind(this);
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
      .finally(() => {
        this.setState({ isInitialLoad: false });
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button dark small onPress={this.onPressLogout}>
              <Text>Exit</Text>
            </Button>
          </Left>
          <Body>
            <Text>DDFA Feed</Text>
          </Body>
          <Right>
            <Button info small>
              <Text>Check In</Text>
            </Button>
          </Right>
        </Header>
          <Content padder removeClippedSubviews={true}>
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
          </Content>
      </Container>
    );
  }
}
