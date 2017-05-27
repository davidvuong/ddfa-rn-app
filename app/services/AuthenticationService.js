import request from 'superagent';
import Promise from 'bluebird';

class AuthenticationService {
  initialize(host) {
    this.host = host;
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      request
        .post(`${this.host}/users/authenticate`)
        .send({ username, password })
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          err ? reject(err) : resolve(res.body.token);
        });
    });
  }
}

export default new AuthenticationService();
