class SessionController {
  /** @ngInject */
  constructor($state, $http, session) {
    this.$state = $state;
    this.$http = $http;
    this.session = session;

    this.create();
  }

  create() {
    console.log('asfa');
    const _this = this;
    this.$http.post('/api/session-token', { username: 'pika', password: '123456' })
    .then((response) => {
      console.log(response.data);
      _this.session.auth(response.data);
      _this.$state.go('photos');
    });
  }
}

export default SessionController;
