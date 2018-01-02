// @flow
import _ from 'lodash';
import Promise from 'bluebird';

import {
  AuthenticationService as AuthenticationServiceT,
} from './AuthenticationService';
import HttpService from '../HttpService';

class CheckInService {
  static PAGINATION_SIZE = 20;

  host: string;
  authenticationService: AuthenticationServiceT;
  http: HttpService

  initialize(host: string, authenticationService: AuthenticationServiceT, httpService: HttpService) {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  list(
    startTime: string,
    limit: ?number = CheckInService.PAGINATION_SIZE,
    draftOnly: ?boolean = false,
  ): Promise<Array<*>> {
    let endpoint = `${this.host}/checkins/?startTime=${startTime}`;
    if (limit && limit >= 1) {
      endpoint += `&limit=${limit}`;
    }
    if (_.isBoolean(draftOnly)) {
      endpoint += `&draftOnly=${draftOnly}`;
    }
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.get(endpoint, headers)
      .then((res: *) => {
        return Promise.resolve(res.checkIns);
      });
  }

  get(id: string): Promise<*> {
    const endpoint = `${this.host}/checkins/${id}`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.get(endpoint, headers)
      .then((res: *) => {
        return Promise.resolve(res);
      });
  }

  create(latitude: number, longitude: number, address: string, name: string): Promise<string> {
    const endpoint = `${this.host}/checkins`;
    const headers = this.authenticationService.getAuthenticationHeader();
    const payload = { latitude, longitude, address, name };
    return this.http.post(endpoint, payload, headers)
      .then((res: *) => {
        return Promise.resolve(res.id);
      });
  }

  publish(id: string): Promise<string> {
    const endpoint = `${this.host}/checkins/${id}/publish`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.post(endpoint, {}, headers)
      .then((res: *) => {
        return Promise.resolve(res.id);
      });
  }
}

export default new CheckInService();
