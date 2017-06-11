import Promise from 'bluebird';

class CheckInService {
  initialize(host, authenticationService, httpService) {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  checkIn(latitude, longitude, address, name) {
    const endpoint = `${this.host}/check-ins`;
    const headers = this.authenticationService.getAuthenticationHeader();
    const payload = { latitude, longitude, address, name };

    return Promise((resolve, reject) => {
      this.http.post(endpoint, payload, headers).then((res) => {
        resolve(res.body);
      }, reject);
    });
  }
}

export default new CheckInService();
