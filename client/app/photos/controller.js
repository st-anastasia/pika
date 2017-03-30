class PhotosController {
  /** @ngInject */
  constructor($scope, $routeParams, $location, photosService){
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$location = $location;

    this.photosService = photosService;
    this.photosService.$scope = $scope;

    this._loadPhotos();
  }

  openPhoto(id){
    this.photosService.loadPhoto(id);
    this.$location.path(`photo-detail`);
  }

  _loadPhotos(){
    this.photosService.loadPhotos({page: this.photosService.currentPage});
  }
}

export default PhotosController;
