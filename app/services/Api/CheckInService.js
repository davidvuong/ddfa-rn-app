import _ from 'lodash';
import Promise from 'bluebird';

class CheckInService {
  static PAGINATION_SIZE = 20;

  initialize = (host, authenticationService, httpService) => {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  list = (startTime, limit = CheckInService.PAGINATION_SIZE, draftOnly = false) => {
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

  getNearby = (latitude, longitude) => {
    const endpoint = `${this.host}/checkins/nearby?latitude=${latitude}&longitude=${longitude}`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.get(endpoint, headers)
      .then((res) => { return Promise.resolve(res.checkIns); });
  }

  get = (id) => {
    const endpoint = `${this.host}/checkins/${id}`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.get(endpoint, headers).then(Promise.resolve);
  }

  delete = (id) => {
    const endpoint = `${this.host}/checkins/${id}`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.delete(endpoint, headers).then(Promise.resolve);
  }

  create = (latitude, longitude, address, name, googlePlaceId) => {
    const endpoint = `${this.host}/checkins`;
    const headers = this.authenticationService.getAuthenticationHeader();
    const payload = { latitude, longitude, address, name, googlePlaceId };
    return this.http.post(endpoint, payload, headers)
      .then((res) => { return Promise.resolve(res.id); });
  }

  publish = (id) => {
    const endpoint = `${this.host}/checkins/${id}/publish`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return this.http.post(endpoint, {}, headers)
      .then((res) => { return Promise.resolve(res.id); });
  }
}

export default new CheckInService();
