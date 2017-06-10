import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  View,
  Text,
  Button
} from '@shoutem/ui'
import { Alert } from 'react-native';
import ActionButton from 'react-native-action-button';

import AuthenticationService from '../../services/AuthenticationService';

export default class FeedScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    function logoutUser() {
      AuthenticationService.logout().then(() => {
        navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Login' }),
          ],
        }));
      }, console.warn);
    }

    function onPromptLogoutAlert() {
      Alert.alert(
        null,
        'Are you sure you want to log out?',
        [
          { text: 'Yes', onPress: logoutUser },
          { text: 'Cancel' },
        ],
      );
    }

    return {
      headerRight: (
        <Button styleName="secondary" onPress={onPromptLogoutAlert} style={{ marginRight: 8 }}>
          <Text>LOGOUT</Text>
        </Button>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.onActionButtonPress = this.onActionButtonPress.bind(this);
  }

  onActionButtonPress() {
    this.props.navigation.navigate('CheckIn');
  }

  render() {
    return (
      <View styleName="fill-parent">
        <Text>Welcome to the feed screen!</Text>
        <ActionButton onPress={this.onActionButtonPress} />
      </View>
    );
  }
}
