import angular from 'angular';

class PhotosController {
  /** @ngInject */
  constructor($scope, $stateParams, $state, photosGallery) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.photosGallery = photosGallery;
    this.photosByMonth = {};

    this.initWatchers();
    this.showPhotos();
  }

  initWatchers() {
    this.$scope.$watch(() => this.photosGallery.photos, this.groupPhotosByMonth.bind(this));
  }

  showPhoto(id) {
    this.$state.go('photo-detail', { id });
  }

  showPage(page) {
    this.$state.go(
      'photos',
      { page, search: this.photosGallery.search },
      { location: 'replace' }
    );
  }

  showPhotos() {
    const page = parseInt(this.$stateParams.page, 10) || undefined
    const search = this.$stateParams.search

    this.photosGallery.showPhotos({ page, search });
  }

  pageButtonClass(page) {
    if (page === this.photosGallery.currentPage) {
      return 'md-raised md-primary';
    }
    return 'md-raised custom';
  }

  groupPhotosByMonth(photos) {
    const res = {};
    photos.forEach((photo) => {
      const month = this.monthLabel(photo);
      if (!res[month]) {
        res[month] = [];
      }

      res[month].push(photo);
    });
    this.photosByMonth = res;
    console.log("PhotosController.groupPhotosByMonth: \n", this.photosByMonth);
  }

  monthLabel(photo) {
    const date = new Date(photo.metadata.createDate);
    const month = date.toLocaleString('en', { month: 'short' });
    return `${month} ${date.getFullYear()} `;
  }
}

export default angular.module('photos.controller', [])
  .controller('photosController', PhotosController);
