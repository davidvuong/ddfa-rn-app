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
  Button,
} from 'native-base';
import {
  ActivityIndicator,
} from 'react-native';

import CheckInDetailHeader from './CheckInDetailHeader/CheckInDetailHeader';
import CheckInDetailPhotoGallery from './CheckInDetailPhotoGallery/CheckInDetailPhotoGallery';
import CheckInDetailReviews from './CheckInDetailReviews/CheckInDetailReviews';
import GenericStaticMap from '../../../components/GenericStaticMap/GenericStaticMap';

import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  checkIn: *,
  navigation: *,
  resetSelectedCheckIn: () => *,
  setSelectedLocation: (*) => *,
  getCheckIn: (string) => *,
  getPhotoUrl: (string) => string,
  getCurrencySymbol: (string) => string,
  deleteCheckIn: (string) => Promise<void>,
};

type State = {
  isLoadingDetailedCheckIn: boolean,
  detailedCheckIn: ?*,
};

export default class CheckInDetailComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;
  state = {
    isLoadingDetailedCheckIn: false,
    detailedCheckIn: null,
  };

  componentDidMount() {
    this.fetchDetailedCheckIn();
  }

  fetchDetailedCheckIn = () => {
    this.setState({ detailedCheckIn: null, isLoadingDetailedCheckIn: true });
    return this.props.getCheckIn(this.props.checkIn.id)
      .then((detailedCheckIn: *) => {
        this.setState({ detailedCheckIn, isLoadingDetailedCheckIn: false });
      })
      .catch((error: Error) => {
        console.error(error); // TODO: Handle failure.
        this.setState({ isLoadingDetailedCheckIn: false });
      });
  }

  onPressWriteReviewButton = () => {
    if (!this.state.detailedCheckIn) { return; }
    const { id, name, address, latitude, longitude } = this.state.detailedCheckIn;
    this.props.setSelectedLocation({
      checkInId: id,
      name,
      address,
      latitude,
      longitude,
    });
    this.props.navigation.navigate('ReviewCreate', {
      goBackCallback: this.fetchDetailedCheckIn,
    });
  }

  renderTitleCard = () => {
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

  renderEmptyReviews = () => {
    return (
      <View padder style={Styles.emptyReviewsContainer}>
        <Text style={Styles.emptyReviewsText} note>There are no reivews for this check-in...</Text>
        <Button
          primary
          small
          rounded
          onPress={this.onPressWriteReviewButton}
          style={Styles.writeReviewButton}
        >
          <Text uppercase={false}>Write a review</Text>
        </Button>
      </View>
    );
  }

  renderContent = () => {
    const { isLoadingDetailedCheckIn, detailedCheckIn } = this.state;
    if (!detailedCheckIn && isLoadingDetailedCheckIn) {
      return <ActivityIndicator color="black" style={Styles.detailedCheckInSpinner} />;
    }
    if (!detailedCheckIn && !isLoadingDetailedCheckIn) {
      return null; // oops server error.
    }

    // We have reviews and possible photos!
    if (detailedCheckIn && detailedCheckIn.reviews.length) {
      const { getPhotoUrl, getCurrencySymbol } = this.props;
      return (
        <View>
          <CheckInDetailReviews reviews={detailedCheckIn.reviews} getCurrencySymbol={getCurrencySymbol} />
          <CheckInDetailPhotoGallery photos={detailedCheckIn.photos} getPhotoUrl={getPhotoUrl} />
        </View>
      );
    }
    return this.renderEmptyReviews(); // We have nothing!
  }

  render() {
    const { checkIn, navigation, deleteCheckIn } = this.props;
    if (!checkIn) { return null; }
    return (
      <Container>
        <CheckInDetailHeader
          navigation={navigation}
          checkIn={checkIn}
          deleteCheckIn={deleteCheckIn}
        />
        <Content>
          <GenericStaticMap latitude={checkIn.latitude} longitude={checkIn.longitude} />
          {this.renderTitleCard()}
          {this.renderContent()}
        </Content>
      </Container>
    );
  }
}
