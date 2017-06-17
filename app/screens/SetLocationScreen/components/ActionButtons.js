import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Button,
} from '@shoutem/ui';

const propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,

  selectedLocationTmp: PropTypes.object,
};

export default class ActionButtons extends Component {
  render() {
    return (
      <View styleName="horizontal">
        <Button
          styleName="confirmation border"
          onPress={this.props.onCancel}
        >
          <Text>CANCEL</Text>
        </Button>
        <Button
          styleName="confirmation border secondary"
          onPress={this.props.onConfirm}
        >
          <Text>CONFIRM</Text>
        </Button>
      </View>
    );
  }
}

ActionButtons.propTypes = propTypes;

