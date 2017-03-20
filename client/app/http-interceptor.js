class HttpInterceptor {
  constructor(sessionService){
    this.sessionService = sessionService;
  }

  request(config){
    if(this.sessionService.isAuthenticated){
      config.headers['Authorization'] = `Bearer ${this.sessionService.user.token}`;
    }

    if(config.json){
      console.log(config.json);
    }

    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
  }
}
