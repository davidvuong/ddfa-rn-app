// @flow
import _ from 'lodash';
import Promise from 'bluebird';

import {
  AuthenticationService as AuthenticationServiceT,
} from './AuthenticationService';
import HttpService from '../HttpService';

class PhotoService {
  host: string;
  authenticationService: AuthenticationServiceT;
  http: HttpService

  initialize = (host: string, authenticationService: AuthenticationServiceT, httpService: HttpService) => {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  getUrl = (id: string): string => {
    return `${this.host}/photos/${id}`;
  }

  create = (checkInId: string, photos: Array<Blob>): Promise<string> => {
    const endpoint = `${this.host}/checkins/${checkInId}/photos`;
    const headers = {
      ...this.authenticationService.getAuthenticationHeader(),
      'Content-Type': 'multipart/form-data',
    };
    const payload = new FormData(); // eslint-disable-line no-undef
    _.each(photos, (i: number, photo: Blob) => {
      payload.append('photos', photo, `photo_${i}.jpg`);
    });

    return this.http.post(endpoint, payload, headers)
      .then((res: *) => {
        return Promise.resolve(res.photos);
      });
  }
}

export default new PhotoService();
