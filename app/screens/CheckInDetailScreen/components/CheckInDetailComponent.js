// @flow
import moment from 'moment';
import * as React from 'react';
import {
  Container,
  Content,
  Body,
  Text,
  Card,
  CardItem,
  View,
} from 'native-base';
import {
  ActivityIndicator,
} from 'react-native';

import CheckInDetailHeader from './CheckInDetailHeader/CheckInDetailHeader';
import CheckInDetailPhotoGallery from './CheckInDetailPhotoGallery/CheckInDetailPhotoGallery';
import CheckInDetailReviews from './CheckInDetailReviews/CheckInDetailReviews';
import CheckInDetailMap from './CheckInDetailMap/CheckInDetailMap';

import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  checkIn: *,
  navigation: *,
  resetSelectedCheckIn: () => *,
  getCheckIn: (string) => *,
  getPhotoUrl: (string) => string,
  getCurrencySymbol: (string) => string,
};

type State = {
  detailedCheckIn: ?*,
};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = { detailedCheckIn: null };

  componentDidMount() {
    this.props.getCheckIn(this.props.checkIn.id)
      .then((detailedCheckIn: *) => {
        this.setState({ detailedCheckIn });
      })
      .catch((error: Error) => {
        console.error(error); // TODO: Handle failure.
      });
  }

  componentWillUnmount() {
    this.props.resetSelectedCheckIn();
  }

  renderTitleCard() {
    const { name, address, createdAt } = this.props.checkIn;
    return (
      <Card>
        <CardItem header>
          <Body>
            <Text>{name}</Text>
            <Text note>{address}</Text>
            <Text note numberOfLines={1} style={Styles.checkedInAtText}>
              Checked in @ {moment(createdAt).format('h:mmA, Do MMM YYYY')}
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }

  render() {
    const { getPhotoUrl, getCurrencySymbol, checkIn, navigation } = this.props;
    const { detailedCheckIn } = this.state;
    if (!checkIn) { return null; }

    return (
      <Container>
        <CheckInDetailHeader navigation={navigation} />
        <Content>
          <CheckInDetailMap latitude={checkIn.latitude} longitude={checkIn.longitude} />
          {this.renderTitleCard()}
          {
            detailedCheckIn ? (
              <View>
                <CheckInDetailReviews reviews={detailedCheckIn.reviews} getCurrencySymbol={getCurrencySymbol} />
                <CheckInDetailPhotoGallery photos={detailedCheckIn.photos} getPhotoUrl={getPhotoUrl} />
              </View>
            ) : (
              <ActivityIndicator color="black" style={Styles.detailedCheckInSpinner} />
            )
          }
        </Content>
      </Container>
    );
  }
}
