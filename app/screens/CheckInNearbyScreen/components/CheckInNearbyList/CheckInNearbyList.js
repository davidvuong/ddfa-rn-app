// @flow
import _ from 'lodash';
import moment from 'moment';
import * as React from 'react';
import {
  Left,
  Body,
  Text,
  List,
  ListItem,
  Thumbnail,
  View,
} from 'native-base';
import {
  ActivityIndicator,
} from 'react-native';

import { initFoodImageGenerator } from '../../../../Images';
import Styles from './Styles';

type Props = {
  navigation: *,
  nearbyCheckIns: Array<*>,
  setSelectedCheckIn: (*) => *,
  isLoading: boolean,
};

type State = {
  isLoadingNearbyCheckIns: boolean,
  currentPosition: ?Position,
};

export default class CheckInNearbyComponent extends React.Component<Props, State> {
  state = {
    isLoadingNearbyCheckIns: false,
    currentPosition: null,
  };
  imageGenerator = initFoodImageGenerator();

  navigateToCheckIn = (checkIn: *) => {
    this.props.setSelectedCheckIn(checkIn);
    this.props.navigation.navigate('CheckInDetail');
  }

  renderItem = (checkIn: *) => {
    const checkedInAt = moment(checkIn.createdAt).format('Do MMM YYYY');
    return (
      <ListItem
        avatar
        key={checkIn.id}
        style={Styles.listItemContainer}
        onPress={() => { this.navigateToCheckIn(checkIn); }}
      >
        <Left>
          <Thumbnail square style={Styles.thumbnail} source={this.imageGenerator.get(checkIn.id)} />
        </Left>
        <Body style={Styles.listItemBody}>
          <Text numberOfLines={1}>{checkIn.name}</Text>
          <Text numberOfLines={1} note>{checkIn.address}</Text>
          <Text numberOfLines={1} note style={Styles.listItemDetailedText}>
            Checked in @ {checkedInAt} ({Math.round(checkIn.distance) / 1000}km away)
          </Text>
        </Body>
      </ListItem>
    );
  }

  render() {
    const { nearbyCheckIns, isLoading } = this.props;
    if (isLoading) {
      return <View padder><ActivityIndicator color="black" /></View>;
    }
    if (!nearbyCheckIns || !nearbyCheckIns.length) {
      return (
        <View padder style={Styles.emptyCheckInsContainer}>
          <Text style={Styles.emptyCheckInsText} note>There are no check-ins around your location...</Text>
        </View>
      );
    }
    return (
      <List style={Styles.listContainer}>
        {_.map(this.props.nearbyCheckIns, (checkIn: *) => { return this.renderItem(checkIn); })}
      </List>
    );
  }
}
