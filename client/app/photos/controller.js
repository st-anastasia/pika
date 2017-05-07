class PhotosController {
  /** @ngInject */
  constructor($scope, $stateParams, $state, photosService) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.photosService = photosService;
    this.photosService.$scope = $scope;

    this.loadPhotos();
  }

  showPhoto(id) {
    this.$state.go('photo-detail', { id });
  }

  showPage(page) {
    this.$state.go('photos', { page, search: this.photosService.search },
                   { location: 'replace' });
  }

  pageButtonClass(page) {
    if (page === this.photosService.currentPage) {
      return 'md-raised md-primary';
    }
    return 'md-raised custom';
  }

  loadPhotos() {
    const page = this.currentPage();
    const search = this.$stateParams.search;

    this.photosService.loadPhotos({ page, search });
  }

  currentPage() {
    return parseInt(this.$stateParams.page, 10) || this.photosService.currentPage;
  }
}

export default PhotosController;
