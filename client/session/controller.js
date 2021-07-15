import angular from 'angular';

class SessionController {
  /** @ngInject */
  constructor($state, $http, session) {
    this.$state = $state;
    this.$http = $http;
    this.session = session;

    this.index();
  }

  index() {
    if (this.session.isAuthenticated()) {
      return this.$state.go('photos')
    }

    this.create();
  }

  create() {
    const _this = this;
    this.$http.post('/api/session-token', { username: 'pika', password: '123456' })
    .then((response) => {
      _this.session.authenticate(response.data);
      _this.$state.go('photos');
    });
  }
}

export default angular.module('session.controller', [])
  .controller('sessionController', SessionController)
