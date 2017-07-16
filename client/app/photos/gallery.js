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
      this.setIndex(foundIndex);
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

    return this.client.find(findParams)
      .then((res) => {
        _.assign(self, _.pick(res.data, ['photos', 'totalSize']));
        self.currentPage = findParams.page;
        self.search = findParams.search;

        self.paginate();
        return self.photos;
      });
  }


  next(step = 1) {
    return this.slide(step);
  }

  prev(step = 1) {
    return this.slide(step * -1);
  }

  slide(step = 1) {
    const self = this;
    const nextIndex = this.currentIndex + step;

    let nextPage = this.currentPage + 1;
    let slideToNextPage = () => this.setIndex(0);

    if (step < 0) {
      nextPage = this.currentPage - 1;
      slideToNextPage = photos => self.setIndex(photos.length - 1);
    }

    if (this.isIndexValid(nextIndex)) {
      this.setIndex(nextIndex);
      return Promise.resolve(this.currentPhoto);
    }

    if (nextPage <= 0) {
      return Promise.resolve(this.currentPhoto);
    }

    return this.showPhotos({ page: nextPage }).then(slideToNextPage);
  }

  setIndex(index) {
    this.currentPhoto = this.photos[index];
    this.currentIndex = index;
    this.setSlidingControls();
  }

  isIndexValid(index) {
    return (index >= 0 && index < this.photos.length);
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

}

export default PhotosGallery;
