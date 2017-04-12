class PhotoDetailController {
  /** @ngInject */
  constructor($scope, $routeParams, $location, photosService){
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$location = $location;

    this.isFotoFormOpen = false;

    this.photosService = photosService;

    this._initWatchers();
    this._loadPhoto();
  }

  showPrev(){
    this.photosService.prev();
  }

  showNext(){
    this.photosService.next();
  }

  _initWatchers(){
    this.$scope.$watch(() => this.photosService.currentPhoto, photo => {
      this.$location.path(`photo-detail/${photo._id}`, false).replace();
    });
  }

  _loadPhoto(){
    this.photosService.loadPhoto(this.$routeParams.id);
  }
}

export default PhotoDetailController;
