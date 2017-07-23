class PhotosClient {
  constructor($http, session, Upload) {
    this.$http = $http;
    this.session = session;
    this.Upload = Upload;
  }

  find(params = {}) {
    return this.$http.get('/api/photos', { params });
  }

  findById(id) {
    return this.$http.get(`/api/photos/${id}`);
  }

  create(params) {
    return this.Upload.upload({
      headers: { Authorization: `Bearer ${this.session.user.token}` },
      url: '/api/photos',
      data: params,
    });
  }

  delete(id) {
    return this.$http.delete(`/api/photos/${id}`)
  }
}

export default PhotosClient;
