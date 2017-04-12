class Session {

  /** @ngInject */
  constructor(){
    this.user = {};
  }

  auth(user){
    this.user = user;
  }

  isAuthenticated(){
    return !!this.user.token;
  }
}

export default Session;
