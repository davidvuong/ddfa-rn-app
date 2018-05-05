import _ from 'lodash';
import Promise from 'bluebird';

class PhotoService {
  initialize = (host, authenticationService, httpService) => {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  getUrl = (id) => {
    return `${this.host}/photos/${id}`;
  }

  create = (checkInId, photos) => {
    const endpoint = `${this.host}/checkins/${checkInId}/photos`;
    const headers = {
      ...this.authenticationService.getAuthenticationHeader(),
      'Content-Type': 'multipart/form-data',
    };
    const payload = new FormData(); // eslint-disable-line no-undef
    _.each(photos, (i, photo) => {
      payload.append('photos', photo, `photo_${i}.jpg`);
    });
    return this.http.post(endpoint, payload, headers)
      .then((res) => { return Promise.resolve(res.photos); });
  }
}

export default new PhotoService();
