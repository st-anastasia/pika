import angular from "angular";
import _ from "lodash";

const PHOTOS_PER_PAGE = 50;

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
    const _this = this;
    if (this.currentPhoto.id === id) return;

    const foundIndex = this.photos.findIndex((photo) => photo._id === id);
    if (foundIndex >= 0) {
      this.setIndex(foundIndex);
      return;
    }

    this.client.findById(id).then(({ data: { photo } }) => {
      _this.currentPhoto = photo;
      _this.disableSliding();

      return photo;
    });
  }

  showPhotos({ search, page = 1 } = {}) {
    const _this = this;
    return this.client.find({ page, search }).then((res) => {
      _this.currentPage = page;
      _this.search = search;

      _this.totalSize = res.data.totalSize;
      _this.photos = res.data.photos;

      console.log("PhotosGallery.showPhotos: \n");
      console.log(_this.photos);
      console.log("Total Size: ", _this.totalSize);
      _this.paginate();
      return _this.photos;
    });
  }

  next() {
    return this.slide(1);
  }

  prev() {
    return this.slide(-1);
  }

  slide(step = 1) {
    const _this = this;
    let nextIndex = this.currentIndex + step;
    let nextPage = this.currentPage + Math.sign(step);

    if (this.isIndexValid(nextIndex)) {
      this.setIndex(nextIndex);
      return Promise.resolve(this.currentPhoto);
    }

    if (nextPage <= 0) {
      return Promise.resolve(this.currentPhoto);
    }

    const slideToNextPage = (photos) => {
      nextIndex = step > 0 ? 0 : photos.length - 1;
      _this.setIndex(nextIndex);
    };

    return this.showPhotos({ page: nextPage }).then(slideToNextPage);
  }

  setIndex(index) {
    this.currentPhoto = this.photos[index];
    this.currentIndex = index;
    this.setSlidingControls();
  }

  isIndexValid(index) {
    return index >= 0 && index < this.photos.length;
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
    return (this.currentPage - 1) * PHOTOS_PER_PAGE + this.currentIndex;
  }

  paginate() {
    const numberOfLinks = 5;
    const totalPages = Math.ceil(this.totalSize / PHOTOS_PER_PAGE);
    let start = this.currentPage - 2;
    if (start < 1) start = 1;

    let end = start + numberOfLinks;
    if (end > totalPages + 1) {
      end = totalPages + 1;
      start = end - numberOfLinks;
      if (start < 1) start = 1;
    }

    this.pages = _.range(start, end);
  }
}

export default angular
  .module("photos.gallery", [])
  .service("photosGallery", PhotosGallery);
