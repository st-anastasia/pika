class PhotoDetailController {
  /** @ngInject */
  constructor($scope, $stateParams, $state, photosService) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.isFotoFormOpen = false;

    this.photosService = photosService;

    this.initWatchers();
    this.loadPhoto();
  }

  showPrev() {
    this.photosService.prev();
  }

  showNext() {
    this.photosService.next();
  }

  initWatchers() {
    this.$scope.$watch(() => this.photosService.currentPhoto, (photo) => {
      this.$state.go('photo-detail', { id: photo._id }, { location: 'replace', notify: false });
    });
  }

  loadPhoto() {
    this.photosService.loadPhoto(this.$stateParams.id);
  }
}

export default PhotoDetailController;
