import React from 'react';
import { NavigationActions } from 'react-navigation';
import { Alert, Button } from 'react-native';

import AuthenticationService from '../../services/AuthenticationService';

export default ({ navigation }) => {
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
      'Are you sure you want to exit?',
      [
        { text: 'Yes', onPress: logoutUser },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  }

  return {
    headerRight: (
      <Button onPress={onPromptLogoutAlert} title="Exit" />
    ),
    title: 'DDFA Feed',
  };
};
