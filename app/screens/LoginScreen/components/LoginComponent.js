// @flow
import * as React from 'react';
import { NavigationActions } from 'react-navigation';

import {
  Container,
  Header,
  Content,
  Body,
  Text,
  Button,
  Item,
  Input,
  Toast,
} from 'native-base';
import {
  Image,
} from 'react-native';

import Images from '../../../Images';
import navigationOptions from '../NavigationOptions';
import Styles from '../Styles';

type Props = {
  isLoggingIn: ?boolean,
  loginErrorStatus: ?Error,
  navigation: *,
  loginUser: (string, string) => *,
};

type State = {
  username: ?string,
  password: ?string,
};

export default class LoginComponent extends React.Component<Props, State> {
  static navigationOptions = navigationOptions;

  constructor(props: Props) {
    super(props);
    this.state = { username: null, password: null };

    (this: any).isLoginButtonDisabled = this.isLoginButtonDisabled.bind(this);
    (this: any).onPressLogin = this.onPressLogin.bind(this);
    (this: any).navigateToMainPage = this.navigateToMainPage.bind(this);
  }

  navigateToMainPage() {
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Feed' }),
      ],
    }));
  }

  isLoginButtonDisabled() {
    return !this.state.username || !this.state.password;
  }

  onPressLogin() {
    const { username, password } = this.state;
    this.props.loginUser(username, password)
      .then(() => { this.navigateToMainPage(); })
      .catch(() => {
        Toast.show({
          text: 'Login failed - please try again...',
          position: 'bottom',
          buttonText: 'OK',
          type: 'warning',
          duration: 3000,
        });
        this.setState({ ...this.state, password: null });
      });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Text>DDFA Login</Text>
          </Body>
        </Header>
        <Content>
          <Container style={{ flex: 1 }}>
            <Image source={Images.backgroundImage1} style={Styles.backgroundImage} />
          </Container>
          <Container style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0, 
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Item rounded style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 5,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
              <Input
                placeholder='Username'
                value={this.state.username}
                autoCapitalize={'none'}
                onChangeText={(username: string) => { this.setState({ username }); }}
              />
            </Item>
            <Item rounded style={{
              backgroundColor: 'rgba(255, 255, 255, 0.92)',
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 5,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
              <Input
                placeholder='Password'
                secureTextEntry
                value={this.state.password}
                onChangeText={(password: string) => { this.setState({ password }); }}
              />
            </Item>
            <Button
              rounded
              full
              info
              disabled={this.isLoginButtonDisabled()}
              onPress={this.onPressLogin}
              style={{
              marginLeft: 10,
              marginRight: 10,
            }}>
              <Text>Sign In</Text>
            </Button>
          </Container>
        </Content>
      </Container>
    );
  }
}
