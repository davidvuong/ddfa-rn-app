// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Header,
  Body,
  Content,
  Text,
  Left,
  Right,
  Button,
  Icon,
} from 'native-base';
import {
  ActivityIndicator,
  Platform,
} from 'react-native';

import CheckInCard from './CheckInCard/CheckInCard';
import GlobalFooter from '../../../components/GlobalFooter/GlobalFooter';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';
import { initFoodImageGenerator } from '../../../Images';

type Props = {
  checkIns: Array<*>,
  setSelectedCheckIn: (*) => *,
  isListingCheckIns: boolean,
  checkInListErrorStatus: ?Error,
  navigation: *,
  listCheckIns: (string) => *,
  resetCheckIns: () => *,
};

type State = {
  isInitialLoad: boolean,
  noMoreCheckIns: boolean,
};

export default class CheckInListComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  imageGenerator: Object;
  bottomScrollPadding: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      isInitialLoad: false,
      noMoreCheckIns: false,
    };
    this.imageGenerator = initFoodImageGenerator();
    this.bottomScrollPadding = 20;

    (this: any).performInitialLoad = this.performInitialLoad.bind(this);
    (this: any).navigateToCheckInDetail = this.navigateToCheckInDetail.bind(this);
    (this: any).onPressRefresh = this.onPressRefresh.bind(this);
    (this: any).onScroll = this.onScroll.bind(this);
    (this: any).renderCheckIns = this.renderCheckIns.bind(this);
  }

  componentDidMount() {
    if (!this.props.checkIns.length) {
      this.performInitialLoad();
    }
  }

  navigateToCheckInDetail(checkIn: *) {
    this.props.setSelectedCheckIn(checkIn);
    this.props.navigation.navigate('CheckInDetail');
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
    // Check if we've loaded the last set of checkins.
    if (this.state.noMoreCheckIns) {
      return;
    }

    const previousCheckInsCount = this.props.checkIns.length;
    const lastCheckIn = _.last(this.props.checkIns);
    const lastCheckInAt = (new Date(lastCheckIn.createdAt)).toISOString();

    this.props.listCheckIns(lastCheckInAt)
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
            return <CheckInCard
              key={index}
              onPress={this.navigateToCheckInDetail}
              onGetImage={this.imageGenerator.get}
              isLast={isLast}
              checkIn={checkIn}
            />;
          })
        }
      </Content>
    );
  }

  render() {
    const { isListingCheckIns } = this.props;
    const loadingIconColor = Platform.OS === 'ios' ? 'black' : 'white';
    return (
      <Container>
        <Header>
          {Platform.OS === 'ios' ? <Left /> : null}
          <Body>
            <Text style={Styles.headerTitle}>DDFA Feed</Text>
          </Body>
          <Right>
            {isListingCheckIns ? <ActivityIndicator color={loadingIconColor} /> : (
              <Button small transparent onPress={this.onPressRefresh}>
                <Icon name="refresh" />
              </Button>
            )}
          </Right>
        </Header>
        {this.renderCheckIns()}
        <GlobalFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
