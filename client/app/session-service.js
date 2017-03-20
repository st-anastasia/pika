class SessionService {

  constructor($http){
    this.$http = $http;
    this.user = {};
  }

  create(){
    const _this = this;
    return this.client.fetch('/api/session-token', {body: {username: 'pika', password: '123456'}})
      .then( user => {
        console.log(user.token);
        _this.user = user;
      });
  }
}
