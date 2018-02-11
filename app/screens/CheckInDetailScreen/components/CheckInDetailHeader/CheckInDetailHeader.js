// @flow
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
  isDeletingCheckIn: boolean,
};

export default class CheckInDetailHeader extends React.Component<Props, State> {
  state = {
    isDeletingCheckIn: false,
  };

  onPressDeleteButton = () => {
    const onPressYes = () => {
      this.setState({ isDeletingCheckIn: true });
      this.props.deleteCheckIn(this.props.checkIn.id)
        .then(() => {
          // It's expected that a `goBackCallback` exists...
          return this.props.navigation.state.params.goBackCallback();
        })
        .then(() => {
          this.props.navigation.goBack();
        })
        .catch(() => { this.setState({ isDeletingCheckIn: false }); });
    };
    const buttons = [
      { text: 'Yes', onPress: onPressYes },
      { text: 'Cancel', style: 'cancel' },
    ];
    Alert.alert('Delete Check-in', 'Are you sure you want to delete?', buttons);
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
        <Right>
          {
            this.state.isDeletingCheckIn ? (
              <ActivityIndicator color="black" />
            ) : (
              <Button transparent onPress={this.onPressDeleteButton}>
                <Icon name="md-trash" style={Styles.headerIcon} />
              </Button>
            )
          }
        </Right>
      </Header>
    );
  }
}
