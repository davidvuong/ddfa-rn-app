import React, { Component } from 'react';

import {
  View,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

import AuthenticationService from '../../services/AuthenticationService';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);

    this.state = {};
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { username, password } = this.state;
    if (!username || !password) { return; }

    AuthenticationService.login(username, password).then((token) => {
      console.log(token);
      this.props.navigation.navigate('Home');
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            onChangeText={(username) => this.setState({ username })}
            placeholder="Username"
            style={styles.input}
          />
          <TextInput
            onChangeText={(password) => this.setState({ password })}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
          <Button title="Log in" onPress={this.onLogin} />
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
