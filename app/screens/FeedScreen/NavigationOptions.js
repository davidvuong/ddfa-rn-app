import React from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Text,
  Button
} from '@shoutem/ui'
import { Alert } from 'react-native';

import AuthenticationService from '../../services/AuthenticationService';
import styles from './Style';

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
      'Are you sure you want to log out?',
      [
        { text: 'Yes', onPress: logoutUser },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  }

  return {
    headerRight: (
      <Button styleName="secondary" onPress={onPromptLogoutAlert} style={styles.logoutButton}>
        <Text>LOGOUT</Text>
      </Button>
    ),
  };
};
