import angular from 'angular';

class Session {

  /** @ngInject */
  constructor() {
    this.user = {};
  }

  auth(user) {
    this.user = user;
  }

  isAuthenticated() {
    return !!this.user.token;
  }
}

export default angular.module('session.session', [])
  .service('session', Session)
