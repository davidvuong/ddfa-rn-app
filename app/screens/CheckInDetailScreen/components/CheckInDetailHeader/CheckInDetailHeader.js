// @flow
import _ from 'lodash';
import * as React from 'react';
import {
  Header,
  Body,
  Left,
  Right,
  Text,
  Icon,
  Button,
} from 'native-base';
import {
  Alert,
  ActivityIndicator,
} from 'react-native';

import Styles from './Styles';

type Props = {
  navigation: *,
  checkIn: *,
  deleteCheckIn: (string) => Promise<void>,
};

type State = {
  isDeletingCheckIn: 'IDLE' | 'DELETING' | 'DELETED',
};

export default class CheckInDetailHeader extends React.Component<Props, State> {
  state = {
    isDeletingCheckIn: 'IDLE',
  };

  onPressDeleteButton = () => {
    const onPressYes = () => {
      this.setState({ isDeletingCheckIn: 'DELETING' });
      this.props.deleteCheckIn(this.props.checkIn.id)
        .then(() => {
          this.setState({ isDeletingCheckIn: 'DELETED' });
          return this.props.navigation.state.params.goBackCallback();
        })
        .then(() => {
          _.delay(() => { this.props.navigation.goBack(); }, 1000);
        })
        .catch(() => { this.setState({ isDeletingCheckIn: 'IDLE' }); });
    };
    const buttons = [
      { text: 'Yes', onPress: onPressYes },
      { text: 'Cancel', style: 'cancel' },
    ];
    Alert.alert('Delete Check-in', 'Are you sure you want to delete?', buttons);
  }

  renderRightIcon = () => {
    const { isDeletingCheckIn } = this.state;
    if (isDeletingCheckIn === 'IDLE') {
      return (
        <Right>
          <Button transparent onPress={this.onPressDeleteButton}>
            <Icon name="md-trash" style={Styles.headerIcon} />
          </Button>
        </Right>
      );
    }
    if (isDeletingCheckIn === 'DELETING') {
      return <Right><ActivityIndicator color="black" /></Right>;
    }
    if (isDeletingCheckIn === 'DELETED') {
      return <Right><Text>💀!</Text></Right>; // bleh... dead!
    }
    return null;
  }

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => { this.props.navigation.goBack(); }}>
            <Icon name="arrow-back" style={Styles.headerIcon} />
          </Button>
        </Left>
        <Body>
          <Text style={Styles.headerTitle}>DDFA CheckIn</Text>
        </Body>
        {this.renderRightIcon()}
      </Header>
    );
  }
}
