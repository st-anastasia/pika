class SessionController {
  /** @ngInject */
  constructor($location, $http, session) {
    this.$location = $location;
    this.$http = $http;
    this.session = session;

    this.create();
  }

  create() {
    const _this = this;
    this.$http.post('/api/session-token', {username: 'pika', password: '123456'})
    .then( response => {
      console.log(response.data);
      _this.session.auth(response.data);
      _this.$location.path('photos');
    });
  }
}

export default SessionController;
