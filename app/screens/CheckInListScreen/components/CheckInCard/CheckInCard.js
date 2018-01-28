// @flow
import moment from 'moment';
import * as React from 'react';
import {
  Body,
  Text,
  Card,
  CardItem,
} from 'native-base';
import {
  Image,
  TouchableOpacity,
} from 'react-native';

import Styles from './Styles';

type Props = {
  checkIn: *,
  isLast: boolean,
  onPress: (*) => *,
  image: *,
  counter: number,
};

type State = {};

export default class CheckInCard extends React.Component<Props, State> {
  render() {
    const { checkIn, isLast, onPress, image, counter } = this.props;
    return (
      <Card key={checkIn.id} style={{ marginTop: 0, marginBottom: isLast ? 20 : 10 }}>
        <CardItem activeOpacity={1} button onPress={() => { onPress(checkIn); }}>
          <Body>
            <Text style={Styles.counter}>{counter}</Text>
            <Text numberOfLines={1}>{checkIn.name}</Text>
            <Text note numberOfLines={1}>{checkIn.address}</Text>
            <Text note numberOfLines={1} style={Styles.checkedInAtText}>
              Checked in @ {moment(checkIn.createdAt).format('h:mmA, Do MMM YYYY')}
            </Text>
          </Body>
        </CardItem>
        {/* see: https://github.com/GeekyAnts/NativeBase/issues/1453 */}
        <TouchableOpacity activeOpacity={1} onPress={() => { onPress(checkIn); }}>
          <Image source={image} style={Styles.checkInImage} />
        </TouchableOpacity>
      </Card>
    );
  }
}
