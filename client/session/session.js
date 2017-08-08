import angular from 'angular';

class Session {

  /** @ngInject */
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user')) || {};
  }

  auth(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated() {
    return !!this.user.token;
  }
}

export default angular.module('session.session', [])
  .service('session', Session)
