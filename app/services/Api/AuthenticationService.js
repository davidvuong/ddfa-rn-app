import Promise from 'bluebird';
import { AsyncStorage } from 'react-native';

export class AuthenticationService {
  initialize = (host, httpService) => {
    this.host = host;
    this.token = null;
    this.http = httpService;
  }

  getAuthenticationHeader = () => {
    return { Authorization: this.token };
  }

  getTokenFromStorage = () => {
    return AsyncStorage.getItem('@user.token')
      .then((token) => {
        this.token = token;
        return Promise.resolve(this.token);
      });
  }

  isTokenValid = (token) => {
    const endpoint = `${this.host}/users/authenticate-token`;
    const headers = { Authorization: token };
    return this.http.post(endpoint, {}, headers)
      .then(() => { return true; })
      .catch(() => { return false; });
  }

  logout = () => {
    return AsyncStorage.clear()
      .then(() => {
        this.token = null;
        return Promise.resolve();
      });
  }

  login = (username, password) => {
    const endpoint = `${this.host}/users/authenticate`;
    const payload = { username, password };

    return this.http.post(endpoint, payload)
      .then((res) => {
        return Promise.join(AsyncStorage.setItem('@user.token', res.token), res.token);
      })
      .spread((__, token) => {
        this.token = token;
        return Promise.resolve();
      });
  }
}

export default new AuthenticationService();
