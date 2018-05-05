// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Container,
  Header,
  Body,
  Content,
  View,
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

export default class CheckInListComponent extends React.Component {
  static navigationOptions = navigationOptions;
  state = {
    isListingCheckIns: false,
    isInitialLoad: false,
    noMoreCheckIns: false,
  };
  imageGenerator = initFoodImageGenerator();
  bottomScrollPadding = 20;

  componentDidMount() {
    if (!this.props.checkIns.length) {
      this.performInitialLoad();
    }
  }

  navigateToCheckIn = (checkIn) => {
    this.props.setSelectedCheckIn(checkIn);

    // Give CheckInDetail the option to invoke this callback when navigating back.
    this.props.navigation.navigate('CheckInDetail', {
      goBackCallback: this.onPressRefresh,
    });
  }

  performInitialLoad = () => {
    this.setState({ isInitialLoad: true });
    return this.props.listCheckIns((new Date()).toISOString())
      .then(() => { this.setState({ isInitialLoad: false }); });
  }

  onPressRefresh = () => {
    this.props.resetCheckIns();
    return this.performInitialLoad();
  }

  onScroll = (event) => {
    // Check if we're at the bottom of the page.
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (!(layoutMeasurement.height + contentOffset.y > contentSize.height - this.bottomScrollPadding)) {
      return;
    }
    // Check if we're already listing checkins.
    if (this.state.isListingCheckIns) {
      return;
    }
    // Check if we've loaded the last set of checkins.
    if (this.state.noMoreCheckIns) {
      return;
    }

    // There are no previous checkIns, nothing to do.
    const previousCheckInsCount = this.props.checkIns.length;
    if (!previousCheckInsCount) {
      return;
    }

    const lastCheckIn = _.last(this.props.checkIns);
    const lastCheckInAt = (new Date(lastCheckIn.createdAt)).toISOString();

    this.setState({ isListingCheckIns: true });
    this.props.listCheckIns(lastCheckInAt)
      .finally(() => {
        const noMoreCheckIns = previousCheckInsCount === this.props.checkIns.length;
        this.setState({ noMoreCheckIns, isListingCheckIns: false });
      });
  }

  renderCheckIns = () => {
    const { checkIns, totalCheckIns } = this.props;
    return (
      <View>
        {_.map(checkIns, (checkIn, i) => {
            return (
              <CheckInCard
                counter={totalCheckIns - (i + 1)}
                key={checkIn.id}
                checkIn={checkIn}
                isLast={(i + 1) >= checkIns.length}
                onPress={this.navigateToCheckIn}
                image={this.imageGenerator.get(checkIn.id)}
              />
            );
          })}
      </View>
    );
  }

  render() {
    const { isListingCheckIns } = this.state;
    const iconColor = Platform.OS === 'ios' ? 'black' : 'white';
    return (
      <Container>
        <Header>
          {Platform.OS === 'ios' ? <Left /> : null}
          <Body>
            <Text style={Styles.headerTitle}>DDFA Feed</Text>
          </Body>
          <Right>
            {isListingCheckIns ? <ActivityIndicator color={iconColor} /> : (
              <Button transparent onPress={this.onPressRefresh}>
                <Icon name="refresh" style={{ color: iconColor }} />
              </Button>
            )}
          </Right>
        </Header>
        <Content padder onScroll={this.onScroll}>
          {this.renderCheckIns()}
        </Content>
        <GlobalFooter navigation={this.props.navigation} />
      </Container>
    );
  }
}
