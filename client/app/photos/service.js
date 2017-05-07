import _ from 'lodash';

const LIMIT = 50;

class PhotosService {
  /** @ngInject */
  constructor($http) {
    this.$http = $http;

    this.photos = [];
    this.pages = [];
    this.totalSize = 0;

    this.currentPhoto = {};
    this.currentIndex = 0;
    this.currentPage = 1;
    this.search = null;

    this.sliding = {
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
      self.setSliding({ state: 'off' });

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

  prev(step = 1) {
    const self = this;
    if (this.slideTo(this.currentIndex - step) !== null) {
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
    if (this.slideTo(this.currentIndex + step) !== null) {
      return Promise.resolve(this.currentPhoto);
    }

    const nextPage = this.currentPage + 1;
    return this.loadPhotos({ page: nextPage }).then(photos => self.slideTo(0));
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
    if (this.setCurrentIndex(index) === null) return null;

    this.setSliding();
    return this.currentPhoto;
  }

  setCurrentIndex(index) {
    if (index < 0 || index > this.photos.length - 1) return null;

    this.currentPhoto = this.photos[index];
    this.currentIndex = index;
    return this.currentIndex;
  }

  setSliding({ state } = {}) {
    if (state === 'off') {
      return this.sliding = { next: false, prev: false };
    }

    this.sliding = {
      prev: this._offset() !== 0,
      next: this._offset() + 1 !== this.totalSize,
    };
    return this.sliding;
  }

  _offset() {
    return (this.currentPage - 1) * LIMIT + this.currentIndex;
  }
}

export default PhotosService;
