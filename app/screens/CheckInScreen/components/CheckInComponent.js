import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  View,
  Spinner
} from '@shoutem/ui';
import {
  ScrollView,
} from 'react-native';

import navigationOptions from '../NavigationOptions';

import ActionButtons from './ActionButtons';
import ActionText from './ActionText';
import CheckInHeader from './CheckInHeader';

const propTypes = {
  selectedLocation: PropTypes.object,
  isCheckingIn: PropTypes.bool,
  checkInErrorStatus: PropTypes.string,
  checkIn: PropTypes.func.isRequied,
};

const initialState = {
  comment: null,
  isPaying: false,
  amountPaid: null,
  rating: null,
};

export default class CheckIn extends Component {
  static navigationOptions = navigationOptions;

  constructor(props) {
    super(props);

    this.state = initialState;

    /* Render */
    this.onCheckIn = this.onCheckIn.bind(this);
  }

  onCheckIn() {
    const { comment, isPaying, amountPaid, rating } = this.state;
    const { latitude, longitude, name, address } = this.props.selectedLocation;
    this.props.checkIn(
      latitude,
      longitude,
      address,
      name,
      comment,
      rating,
      isPaying,
      amountPaid
    ).then(() => {
      this.setState(initialState);
      this.props.navigation.goBack();
    }, (error) => { console.error(error); });
  }

  render() {
    const { selectedLocation } = this.props;
    if (!selectedLocation) {
      return (
        <View styleName="fill-parent horizontal h-center vertical v-center">
          <Spinner />
        </View>
      );
    }
    return (
      <ScrollView style={{ flex: 1 }} scrollEnabled={false}>
        <CheckInHeader
          name={selectedLocation.name}
          address={selectedLocation.address}
          price={selectedLocation.price}
          rating={selectedLocation.rating}
          navigation={this.props.navigation}
        />
        <ActionText />

        <ScrollView scrollEnabled={false}>
          <TextInput
            placeholder="Is there something else you would like to add?"
            onChangeText={(comment) => this.setState({ comment })}
            style={{ height: 400 }}
            multiline={true}
            value={this.state.comment}
          />
        </ScrollView>
        <ActionButtons
          isCheckingIn={this.props.isCheckingIn}
          onCancel={() => { this.props.navigation.goBack(); }}
          onCheckIn={this.onCheckIn}
        />
      </ScrollView>
    );
  }
}

CheckIn.PropTypes = propTypes;
