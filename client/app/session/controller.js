class SessionController {
  /** @ngInject */
  constructor($scope, $location, client) {
    this.$scope = $scope;
    this.$location = $location;
    this.client = client;

    this.create();
  }

  create() {
    const _this = this;
    this.client.fetch('/api/session-token', {body: {username: 'pika', password: '123456'}})
    .then( user => {
      console.log(user.token)
      _this.$location.path('photos');
      _this.$scope.$apply()
    })
  }
}

export default SessionController;
