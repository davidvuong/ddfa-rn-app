import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Spinner,
} from '@shoutem/ui';
import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import {
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scrollview';

import navigationOptions from '../NavigationOptions';
import styles from '../Style';

import ActionButtons from './ActionButtons';
//import ActionText from './ActionText';
import CheckInHeader from './CheckInHeader';

const propTypes = {
  selectedLocation: PropTypes.object.isRequired,
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

    /* Helpers */
    this.getDescriptionTextInputHeight = this.getDescriptionTextInputHeight.bind(this);

    /* Render */
    this.onCheckIn = this.onCheckIn.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  getDescriptionTextInputHeight() {
    const { height } = Dimensions.get('window');
    return height
      - 8 // Make enough room for actionButtons margin (top/bottom).
      - styles.checkInHeaderContainer.height
      - styles.actionButtonsContainer.height;
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

  onCancel() {
    const buttons = [
      { text: 'Yes', onPress: this.props.navigation.goBack },
      { text: 'No', style: 'cancel' },
    ];
    Alert.alert('Cancel', 'Are you sure you want to cancel your check-in?', buttons);
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
      <KeyboardAwareScrollView>
      <ScrollView style={styles.container} scrollEnabled={false}>
        <StatusBar hidden />
        <CheckInHeader
          location={selectedLocation}
          navigation={this.props.navigation}
        />
        {/*<ActionText />*/}
        <TextInput
          placeholder="Is there something else you would like to add?"
          onChangeText={(comment) => this.setState({ comment })}
          multiline={true}
          style={{ height: this.getDescriptionTextInputHeight(), fontSize: 18 }}
          value={this.state.comment}
          maxLength={2048}
        />
        <ActionButtons
          isCheckingIn={this.props.isCheckingIn}
          onCancel={this.onCancel}
          onCheckIn={this.onCheckIn}
        />
      </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

CheckIn.PropTypes = propTypes;
