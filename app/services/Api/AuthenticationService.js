// @flow
import Promise from 'bluebird';
import { AsyncStorage } from 'react-native';

import HttpService from '../HttpService';

export class AuthenticationService {
  host: string;
  token: ?string;
  http: HttpService;

  initialize = (host: string, httpService: HttpService) => {
    this.host = host;
    this.token = null;
    this.http = httpService;
  }

  getAuthenticationHeader = (): { Authorization: ?string } => {
    return { Authorization: this.token };
  }

  getTokenFromStorage = (): Promise<string> => {
    return AsyncStorage.getItem('@user.token')
      .then((token: string): Promise<string> => {
        this.token = token;
        return Promise.resolve(this.token);
      });
  }

  isTokenValid = (token: string): Promise<boolean> => {
    const endpoint: string = `${this.host}/users/authenticate-token`;
    const headers = { Authorization: token };
    return this.http.post(endpoint, {}, headers)
      .then(() => { return true; })
      .catch(() => { return false; });
  }

  logout = (): Promise<void> => {
    return AsyncStorage.clear()
      .then((): Promise<void> => {
        this.token = null;
        return Promise.resolve();
      });
  }

  login = (username: string, password: string): Promise<void> => {
    const endpoint: string = `${this.host}/users/authenticate`;
    const payload: { username: string, password: string } = { username, password };

    return this.http.post(endpoint, payload)
      .then((res: Object): Promise<[void, string]> => {
        return Promise.join(AsyncStorage.setItem('@user.token', res.token), res.token);
      })
      .spread((__: void, token: string): Promise<*> => {
        this.token = token;
        return Promise.resolve();
      });
  }
}

export default new AuthenticationService();
