import angular from 'angular';

class PhotosController {
  /** @ngInject */
  constructor($scope, $stateParams, $state, photosGallery) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.photosGallery = photosGallery;
    this.uploadMonths = [];
    this.photos = {};

    this.initWatchers();
    this.showPhotos();
  }

  initWatchers() {
    this.$scope.$watch(() => this.photosGallery.photos, this.filterPhotosByUploadMonth.bind(this));
  }

  showPhoto(id) {
    this.$state.go('photo-detail', { id });
  }

  showPage(page) {
    this.$state.go('photos', { page, search: this.photosGallery.search },
                   { location: 'replace' });
  }

  showPhotos() {
    const page = parseInt(this.$stateParams.page, 10) || this.photosGallery.currentPage;
    const search = this.$stateParams.search || this.photosGallery.search;

    this.photosGallery.showPhotos({ page, search });
  }

  pageButtonClass(page) {
    if (page === this.photosGallery.currentPage) {
      return 'md-raised md-primary';
    }
    return 'md-raised custom';
  }

  filterPhotosByUploadMonth(photos) {
    this.photos = photos.reduce((photosByMonth, photo) => {
      const uploadMonth = this.uploadMonth(photo);
      if (!photosByMonth[uploadMonth]) photosByMonth[uploadMonth] = [];

      photosByMonth[uploadMonth].push(photo);
      return photosByMonth;
    }, {});
  }

  uploadMonth(photo) {
    const date = new Date(photo.uploadDate);
    const month = date.toLocaleString('en', { month: 'short' });
    return `${month} ${date.getFullYear()}`;
  }
}

export default angular.module('photos.controller', [])
  .controller('photosController', PhotosController);
