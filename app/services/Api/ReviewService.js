// @flow
import Promise from 'bluebird';

import {
  AuthenticationService as AuthenticationServiceT,
} from './AuthenticationService';
import HttpService from '../HttpService';

class ReviewService {
  host: string;
  authenticationService: AuthenticationServiceT;
  http: HttpService

  initialize = (host: string, authenticationService: AuthenticationServiceT, httpService: HttpService) => {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  create = (
    checkInId: string,
    amountPaid: number,
    currency: string,
    comment: ?string,
    foodRating: ?number,
    environmentRating: ?number,
    serviceRating: ?number,
  ): Promise<string> => {
    const endpoint = `${this.host}/checkins/${checkInId}/reviews`;
    const headers = this.authenticationService.getAuthenticationHeader();
    const payload = {
      checkInId,
      amountPaid,
      currency,
      comment,
      foodRating,
      environmentRating,
      serviceRating,
    };
    return this.http.post(endpoint, payload, headers)
      .then((res: *) => {
        return Promise.resolve(res.id);
      });
  }

  getCurrencySymbol = (currency: string): string => {
    return {
      USD: '$',
      AUD: '$',
      CNY: '&',
      JPY: '¥',
      GBP: '£',
      PKW: '₩',
    }[currency] || '';
  }
}

export default new ReviewService();
