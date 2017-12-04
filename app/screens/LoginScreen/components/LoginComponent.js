// @flow
import * as React from 'react';
import { NavigationActions } from 'react-navigation';

import {
  Container,
  Content,
  Header,
  Body,
  Text,
  Footer,
  Button,
  FooterTab,
  Form,
  Item,
  Label,
  Input,
  Toast,
} from 'native-base';

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
          position: 'top',
          buttonText: 'OK',
          type: 'danger',
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
            <Text>DD Food Adventures</Text>
          </Body>
        </Header>
        <Content padder>
          <Form>
            <Item inlineLabel>
              <Label style={Styles.inputLabel}>username</Label>
              <Input
                value={this.state.username}
                autoCapitalize={'none'}
                onChangeText={(username: string) => { this.setState({ username }); }}
              />
            </Item>
            <Item inlineLabel>
              <Text>{this.isLoginButtonDisabled()}</Text>
              <Label style={Styles.inputLabel}>password</Label>
              <Input
                secureTextEntry
                value={this.state.password}
                onChangeText={(password: string) => { this.setState({ password }); }}
              />
            </Item>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button
              full
              primary
              disabled={this.isLoginButtonDisabled()}
              onPress={this.onPressLogin}
            >
              <Text style={Styles.loginButtonText}>LOG INTO DDFA</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
