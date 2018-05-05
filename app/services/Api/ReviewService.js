import Promise from 'bluebird';

class ReviewService {
  initialize = (host, authenticationService, httpService) => {
    this.host = host;
    this.authenticationService = authenticationService;
    this.http = httpService;
  }

  create = (
    checkInId,
    amountPaid,
    currency,
    comment,
    foodRating,
    environmentRating,
    serviceRating,
  ) => {
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
      .then((res) => { return Promise.resolve(res.id); });
  }

  getCurrencySymbol = (currency) => {
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
