import _ from 'lodash';

const LIMIT = 50;

class PhotosService {
  /** @ngInject */
  constructor($http, session, Upload) {
    this.$http = $http;
    this.session = session;
    this.Upload = Upload;

    this.photos = [];
    this.pages = [];
    this.totalSize = 0;

    this.currentPhoto = {};
    this.currentIndex = 0;
    this.currentPage = 1;
    this.search = null;

    this.slidingControls = {
      prev: false,
      next: true,
    };
  }

  loadPhoto(id) {
    const self = this;
    if (this.currentPhoto.id === id) return;

    // eslint-disable-next-line no-underscore-dangle
    const foundIndex = this.photos.findIndex(photo => photo._id === id);
    if (foundIndex >= 0) {
      this.slideTo(foundIndex);
      return;
    }

    this.$http.get(`/api/photos/${id}`).then(({ photo }) => {
      self.currentPhoto = photo;
      self.disableSliding();

      return photo;
    });
  }

  loadPhotos(params = {}) {
    const { page = 1, limit = LIMIT, search = this.search } = params;
    const self = this;

    return this.$http.get('/api/photos', { params: { page, limit, search } })
      .then((res) => {
        const { data: { photos, totalSize } } = res;
        self.search = search;
        self.currentPage = page;
        self.photos = photos;
        self.totalSize = totalSize;
        self.paginate();
        return photos;
      });
  }

  uploadPhotos(photos) {
    const self = this;
    let uploadedCount = 0;

    const onSuccces = () => {
      uploadedCount += 1;
      if (uploadedCount === photos.length) self.loadPhotos();
    };

    const onFailure = (response) => {
      if (response.status > 0) {
        self.errorMsg = `${response.status}: ${response.data}`;
      }
    };

    const onProgress = (event) => {
      const percentage = (100.0 * (event.loaded / photos.size));
      self.uploadProgress = Math.min(100, parseInt(percentage, 10));
    };

    const upload = (photo) => {
      this.Upload.upload({
        headers: { Authorization: `Bearer ${this.session.user.token}` },
        url: '/api/photos',
        data: photo,
      }).then(onSuccces, onFailure, onProgress);
    };

    photos.forEach(photo => upload(photo));
  }

  prev(step = 1) {
    const self = this;

    const nextIndex = this.currentIndex - step;
    if (this.isIndexValid(nextIndex)) {
      this.slideTo(nextIndex);
      return Promise.resolve(this.currentPhoto);
    }

    const prevPage = this.currentPage - 1;
    if (prevPage < 0) {
      return Promise.resolve(this.currentPhoto);
    }

    return this.loadPhotos({ page: prevPage }).then(photos => self.slideTo(photos.length - 1));
  }

  next(step = 1) {
    const self = this;

    const nextIndex = this.currentIndex + step;
    if (this.isIndexValid(nextIndex)) {
      this.slideTo(nextIndex);
      return Promise.resolve(this.currentPhoto);
    }

    const nextPage = this.currentPage + 1;
    return this.loadPhotos({ page: nextPage }).then(() => self.slideTo(0));
  }

  paginate() {
    let start = this.currentPage - 2;
    if (start < 1) start = 1;

    let end = start + 5;
    if (this.totalSize / LIMIT < 5) {
      start = 1;
      end = Math.ceil(this.totalSize / LIMIT) + 1;
    }

    this.pages = _.range(start, end);
  }

  slideTo(index) {
    this.currentPhoto = this.photos[index];
    this.currentIndex = index;
    this.setSlidingControls();
  }

  isIndexValid(index) {
    return (index > 0 && index < this.photos.length);
  }

  setSlidingControls() {
    this.slidingControls = {
      prev: this.offset() !== 0,
      next: this.offset() + 1 !== this.totalSize,
    };
  }

  disableSliding() {
    this.slidingControls = { next: false, prev: false };
  }

  offset() {
    return (this.currentPage - 1) * LIMIT + this.currentIndex;
  }
}

export default PhotosService;
