import Promise from 'bluebird';

class CheckInService {
  initialize(host, authenticationService, httpService) {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  list(startTime, limit) {
    const endpoint = `${this.host}/check-ins/?startTime=${startTime}&limit=${limit}`;
    const headers = this.authenticationService.getAuthenticationHeader();
    return new Promise((resolve, reject) => {
      this.http.get(endpoint, headers).then((res) => {
        resolve(res.body.checkIns);
      }, reject);
    });
  }

  /* TODO: Rename this to `.create(...)` */
  checkIn(
    latitude,
    longitude,
    address,
    name,
    comment,
    rating,
    isPaying,
    amountPaid
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

    return new Promise((resolve, reject) => {
      this.http.post(endpoint, payload, headers).then((res) => {
        resolve(res.body);
      }, reject);
    });
  }
}

export default new CheckInService();
