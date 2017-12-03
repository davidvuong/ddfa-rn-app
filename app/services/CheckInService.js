// @flow
import Promise from 'bluebird';

import {
  AuthenticationService as AuthenticationServiceT,
} from './AuthenticationService';
import HttpService from './HttpService';

class CheckInService {
  host: string;
  authenticationService: AuthenticationServiceT;
  http: HttpService

  initialize(host: string, authenticationService: AuthenticationServiceT, httpService: HttpService) {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  list(startTime: number, limit: number) {
    const endpoint = `${this.host}/check-ins/?startTime=${startTime}&limit=${limit}`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.get(endpoint, headers).then((res: *) => {
      return Promise.resolve(res.body.checkIns);
    });
  }

  create(
    latitude: number,
    longitude: number,
    address: string,
    name: string,
    comment: string,
    rating: number,
    isPaying: boolean,
    amountPaid: number,
  ) {
    const endpoint = `${this.host}/check-ins`;
    const headers = this.authenticationService.getAuthenticationHeader();
    const payload = {
      latitude,
      longitude,
      address,
      name,
      rating,
      isPaying,
      amountPaid,
      comment: comment ? comment.trim() : comment, // save lives. get rid if trailing/leading whitespaces.
    };
    return this.http.post(endpoint, payload, headers).then((res: *) => {
      return Promise.resolve(res.body);
    });
  }
}

export default new CheckInService();
