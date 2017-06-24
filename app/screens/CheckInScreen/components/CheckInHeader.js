import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import {
  View,
  Heading,
  Subtitle,
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';

const propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  navigation: PropTypes.object.isRequired,
};

export default class CheckInHeader extends Component {
  render() {
    const { name, price, rating, address } = this.props;
    return (
      <View onPress={() => { Keyboard.dismiss(); }}>
        <Heading>
          {name} ({price}, {rating || '???'}/5)
        </Heading>
        <Subtitle>
          <Icon name="ios-pin-outline"/>
          {address}
        </Subtitle>
      </View>
    );
  }
}

CheckInHeader.propTypes = propTypes;
