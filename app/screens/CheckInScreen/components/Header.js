import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Heading,
  Subtitle,
  Divider,
  Caption,
  Button,
  Text,
} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';

const propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  navigation: PropTypes.object.isRequired,
};

export default class Header extends Component {
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
        <Divider styleName="line small center" />

        <View styleName="horizontal">
          <Caption>Last checked in 3 days ago</Caption>
          <Button onPress={() => { this.props.navigation.navigate('LocationPicker'); }}>
            <Text>Change location</Text>
          </Button>
        </View>
      </View>
    );
  }
}

Header.propTypes = propTypes;
