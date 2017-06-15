import Promise from 'bluebird';
import { AsyncStorage } from 'react-native';

class AuthenticationService {
  initialize(host, httpService) {
    this.host = host;
    this.token = null;
    this.http = httpService;
  }

  getAuthenticationHeader() {
    return { 'Authorization': this.token };
  }

  getTokenFromStorage() {
    return new Promise((resolve, reject) => {
      return AsyncStorage.getItem('@user.token').then((token) => {
        this.token = token;
        resolve(token);
      }, reject);
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      return AsyncStorage.clear().then(() => {
        this.token = null;
        resolve();
      }, reject);
    });
  }

  login(username, password) {
    const endpoint = `${this.host}/users/authenticate`;
    const payload = { username, password };

    return new Promise((resolve, reject) => {
      return this.http.post(endpoint, payload).then((res) => {
        return Promise.all([
          AsyncStorage.setItem('@user.token', res.body.token),
          res.body.token,
        ]);
      }).spread((_, token) => {
        this.token = token;
        resolve();
      }).catch(reject);
    });
  }
}

export default new AuthenticationService();
