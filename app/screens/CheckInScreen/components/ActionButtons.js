import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Button,
} from '@shoutem/ui';

const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onCheckIn: PropTypes.func.isRequired,
};

export default class ActionButtons extends Component {
  render() {
    return (
      <View styleName="horizontal flexible">
        <Button
          styleName="confirmation"
          onPress={this.props.onCancel}
        >
          <Text>CANCEL</Text>
        </Button>
        <Button
          styleName="confirmation secondary"
          onPress={this.props.onCheckIn}
        >
          <Text>CHECK IN</Text>
        </Button>
      </View>
    );
  }
}

ActionButtons.propTypes = propTypes;
