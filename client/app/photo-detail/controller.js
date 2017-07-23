class PhotoDetailController {
  /** @ngInject */
  constructor($scope, $stateParams, $state, photosGallery) {
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.isFotoFormOpen = false;

    this.photosGallery = photosGallery;

    this.initWatchers();
    this.showPhoto();
  }

  initWatchers() {
    this.$scope.$watch(() => this.photosGallery.currentPhoto, (photo) => {
      this.$state.go('photo-detail', { id: photo._id }, { location: 'replace', notify: false });
    });
  }

  showPrev() {
    this.photosGallery.prev();
  }

  showNext() {
    this.photosGallery.next();
  }

  showPhoto() {
    this.photosGallery.showPhoto(this.$stateParams.id);
  }
}

export default PhotoDetailController;
