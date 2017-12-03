import Promise from 'bluebird';
import { AsyncStorage } from 'react-native';

export default class AuthenticationService {
  initialize(host, httpService) {
    this.host = host;
    this.token = null;
    this.http = httpService;
  }

  getAuthenticationHeader() {
    return { 'Authorization': this.token };
  }

  getTokenFromStorage() {
    return AsyncStorage.getItem('@user.token').then((token) => {
      this.token = token;
      return Promise.resolve();
    });
  }

  logout() {
    return AsyncStorage.clear().then(() => {
      this.token = null;
      return Promise.resolve();
    })
  }

  login(username, password) {
    const endpoint = `${this.host}/users/authenticate`;
    const payload = { username, password };

    return this.http.post(endpoint, payload).then((res) => {
      return Promise.all([
        AsyncStorage.setItem('@user.token', res.body.token),
        res.body.token,
      ]);
    }).spread((__, token) => {
      this.token = token;
      return Promise.resolve();
    });
  });
}
