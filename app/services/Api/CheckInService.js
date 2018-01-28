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

  initialize = (host: string, authenticationService: AuthenticationServiceT, httpService: HttpService) => {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  list = (
    startTime: string,
    limit: ?number = CheckInService.PAGINATION_SIZE,
    draftOnly: ?boolean = false,
  ): Promise<Array<*>> => {
    let endpoint = `${this.host}/checkins/?startTime=${startTime}`;
    if (limit && limit >= 1) {
      endpoint += `&limit=${limit}`;
    }
    if (_.isBoolean(draftOnly)) {
      endpoint += `&draftOnly=${draftOnly ? 'true' : 'false'}`;
    }
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.get(endpoint, headers).then(Promise.resolve);
  }

  getNearby = (latitude: number, longitude: number): Promise<Array<*>> => {
    const endpoint = `${this.host}/checkins/nearby?latitude=${latitude}&longitude=${longitude}`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.get(endpoint, headers)
      .then((res: *) => {
        return Promise.resolve(res.checkIns);
      });
  }

  get = (id: string): Promise<*> => {
    const endpoint = `${this.host}/checkins/${id}`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.get(endpoint, headers).then(Promise.resolve);
  }

  create = (
    latitude: number,
    longitude: number,
    address: string,
    name: string,
    googlePlaceId: ?string,
  ): Promise<string> => {
    const endpoint = `${this.host}/checkins`;
    const headers = this.authenticationService.getAuthenticationHeader();
    const payload = { latitude, longitude, address, name, googlePlaceId };
    return this.http.post(endpoint, payload, headers)
      .then((res: *) => {
        return Promise.resolve(res.id);
      });
  }

  publish = (id: string): Promise<string> => {
    const endpoint = `${this.host}/checkins/${id}/publish`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.post(endpoint, {}, headers)
      .then((res: *) => {
        return Promise.resolve(res.id);
      });
  }
}

export default new CheckInService();
