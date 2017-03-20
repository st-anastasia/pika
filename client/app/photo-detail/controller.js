class PhotoDetailController {
  /** @ngInject */
  constructor($scope, $routeParams, $mdDialog, $mdSidenav, $location, photosService){
    this.$routeParams = $routeParams;
    this.$mdDialog = $mdDialog;
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;

    this.isFotoFormOpen = false;

    this.photosService = photosService;
    this.photosService.$scope = $scope;
    this._loadPhoto();
  }

  showPrev(){
    this.photosService.prev();
  }

  showNext(){
    this.photosService.next();
  }

  _loadPhoto(){
    this.photosService.loadPhoto(this.$routeParams.photoId);
  }
}

export default PhotoDetailController;
