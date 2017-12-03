// @flow
import Promise from 'bluebird';
import { AsyncStorage } from 'react-native';

import HttpService from './HttpService';

export class AuthenticationService {
  host: string;
  token: ?string;
  http: HttpService;

  initialize(host: string, httpService: HttpService) {
    this.host = host;
    this.token = null;
    this.http = httpService;
  }

  getAuthenticationHeader(): { Authorization: ?string } {
    return { Authorization: this.token };
  }

  getTokenFromStorage(): Promise<*> {
    return AsyncStorage.getItem('@user.token')
      .then((token: string): Promise<*> => {
        this.token = token;
        return Promise.resolve();
      });
  }

  logout(): Promise<*> {
    return AsyncStorage.clear()
      .then((): Promise<*> => {
        this.token = null;
        return Promise.resolve();
      });
  }

  login(username: string, password: string): Promise<*> {
    const endpoint: string = `${this.host}/users/authenticate`;
    const payload: { username: string, password: string } = { username, password };

    return this.http.post(endpoint, payload)
      .then((res: Object): Promise<[void, string]> => {
        return Promise.all([
          AsyncStorage.setItem('@user.token', res.body.token),
          res.body.token,
        ]);
      })
      .spread((__: void, token: string): Promise<*> => {
        this.token = token;
        return Promise.resolve();
      });
  }
}

export default new AuthenticationService();
