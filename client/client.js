import qs from 'qs';

const DEFAULT_OPTIONS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

class Client {
  constructor() {
    this.user = {};
  }

  authorize(user) {
    this.user = user;
    // window.localStorage.setItem('')
  }

  fetch(url, options = {}, default_options = DEFAULT_OPTIONS) {
    const _this = this;
    const mergedOptions = Object.assign({}, default_options, options);

    if (mergedOptions.body && mergedOptions.headers['Content-Type'] === 'application/json') {
      mergedOptions.body = JSON.stringify(options.body);
    }

    if (mergedOptions.body && !mergedOptions.method) {
      mergedOptions.method = 'POST';
    }

    const urlWithQuery = this._joinUrlQuery(url, mergedOptions.query);
    this._addAuthHeader(mergedOptions);

    let fetch = window.fetch(urlWithQuery, mergedOptions);
    fetch = fetch.then(_this._checkStatus);

    if (mergedOptions.headers.Accept === 'application/json') {
      fetch = fetch.then(_this._parseJSON);
    }

    return fetch;
  }

  _joinUrlQuery(url, query = {}) {
    return [url, qs.stringify(query)].filter(s => !!s).join('?');
  }

  _addAuthHeader(options) {
    if (this.user.token) options.headers.Authorization = `Bearer ${this.user.token}`;
    return options;
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  _parseJSON(response) {
    return response.json();
  }
}

export default Client;
