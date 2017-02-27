const DEFAULT_OPTIONS = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

class Client {
  constructor(){
    this.user = {};
  }

  authorize(user, options={headers: {}}){
    this.user = user;
    if(this.user.token) options.headers['Authorization:'] = `Bearer ${user.token}`;
    return options;
  }

  fetch(url, options = {}, default_options = DEFAULT_OPTIONS) {
    const _this = this;
    const mergedOptions = Object.assign({}, default_options, options);
    
    if(mergedOptions.body && mergedOptions.headers['Content-Type'] === 'application/json'){
      mergedOptions.body = JSON.stringify(options.body);
    }

    if(mergedOptions.body && !mergedOptions.method){
      mergedOptions.method = 'POST';
    }

    this.authorize(this.user, mergedOptions);
    let fetch = window.fetch(url, mergedOptions);
    fetch = fetch.then(_this._checkStatus);

    if (mergedOptions.headers['Accept'] === 'application/json'){
      fetch = fetch.then(_this._parseJSON);
    }

    return fetch;
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  _parseJSON(response) {
    return response.json();
  }
}

export default Client;
