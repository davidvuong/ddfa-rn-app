import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Button,
  Spinner,
} from '@shoutem/ui';

const propTypes = {
  isCheckingIn: PropTypes.bool,
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
          muted={this.props.isCheckingIn}
          disabled={this.props.isCheckingIn}
        >
          <Text>CANCEL</Text>
        </Button>
        <Button
          styleName="confirmation secondary"
          onPress={this.props.onCheckIn}
          disabled={this.props.isCheckingIn}
        >
          {this.props.isCheckingIn && <Spinner />}
          <Text styleName="bold bright h-center">
            {this.props.isCheckingIn ? 'CHECKING IN' : 'CHECK IN'}
          </Text>
        </Button>
      </View>
    );
  }
}

ActionButtons.propTypes = propTypes;
