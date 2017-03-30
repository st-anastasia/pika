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
  }

  showPrev(){
    this.photosService.prev();
  }

  showNext(){
    this.photosService.next();
  }
}

export default PhotoDetailController;
