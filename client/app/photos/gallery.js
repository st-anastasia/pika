import _ from 'lodash';

const LIMIT = 50;

class PhotosGallery {
  /** @ngInject */
  constructor(photosClient) {
    this.client = photosClient;

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

  showPhoto(id) {
    const self = this;
    if (this.currentPhoto.id === id) return;

    // eslint-disable-next-line no-underscore-dangle
    const foundIndex = this.photos.findIndex(photo => photo._id === id);
    if (foundIndex >= 0) {
      this.slideTo(foundIndex);
      return;
    }

    this.client.findById(id).then(({ photo }) => {
      self.currentPhoto = photo;
      self.disableSliding();

      return photo;
    });
  }

  showPhotos(params) {
    const findParams = _.assign({ search: this.search }, params);
    const self = this;

    return this.client.find()
      .then((res) => {
        _.assign(self, _.pick(res.data, ['photos', 'totalSize']));
        _.assign(self, _.pick(findParams, ['search', 'page']));

        self.paginate();
        return self.photos;
      });
  }

  uploadPhotos(photos) {
    const self = this;
    let uploadedCount = 0;

    const onSuccces = () => {
      uploadedCount += 1;
      if (uploadedCount === photos.length) self.showPhotos();
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

    photos.forEach((photo) => {
      this.client.create(photo).then(onSuccces, onFailure, onProgress);
    });
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

    return this.showPhotos({ page: prevPage }).then(photos => self.slideTo(photos.length - 1));
  }

  next(step = 1) {
    const self = this;

    const nextIndex = this.currentIndex + step;
    if (this.isIndexValid(nextIndex)) {
      this.slideTo(nextIndex);
      return Promise.resolve(this.currentPhoto);
    }

    const nextPage = this.currentPage + 1;
    return this.showPhotos({ page: nextPage }).then(() => self.slideTo(0));
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

export default PhotosGallery;
