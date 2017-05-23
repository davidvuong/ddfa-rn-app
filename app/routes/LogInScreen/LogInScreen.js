import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

export default class LogInScreen extends Component {
  constructor(authenticationService) {
    super();

    this.authenticationService = authenticationService;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            placeholder="Username"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
          <Button title="Log in"><Text>Log in</Text></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  input: {
    height: 40
  }
});
