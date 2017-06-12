import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Heading,
  Subtitle,
  Divider,
  Caption,
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';

const propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
};

export class Header extends Component {
  render() {
    return (
      <View>
        <Heading>
          {this.props.name} ({this.props.price}, {this.props.rating}/5)
        </Heading>
        <Subtitle>
          <Icon name="ios-pin-outline"/>
          {this.props.address}
        </Subtitle>
        <Divider styleName="line small center"/>
        <Caption>Last checked in 3 days ago</Caption>
      </View>
    );
  }
}
Header.PropTypes = propTypes;

export default Header;
