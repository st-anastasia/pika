import angular from 'angular';

class PhotosClient {
  constructor($http, session, Upload) {
    this.$http = $http;
    this.session = session;
    this.Upload = Upload;
  }

  find({search, page = 1} = {}) {
    console.log("PhotosClient.find", { search, page });
    return this.$http.get("/api/photos", { params: { search, page } });
  }

  findById(id) {
    return this.$http.get(`/api/photos/${id}`);
  }

  create(photo) {
    console.log("PhotosClient.create", photo)
    return this.Upload.upload({
      headers: { Authorization: `Bearer ${this.session.user.token}` },
      url: '/api/photos',
      data: { photo },
    });
  }

  update(photo) {
    return this.$http.patch(`/api/photos/${photo._id}`, { photo: photo.metadata })
  }

  delete(id) {
    return this.$http.delete(`/api/photos/${id}`)
  }
}

export default angular.module('photos.client', [])
  .factory('photosClient', PhotosClient);
