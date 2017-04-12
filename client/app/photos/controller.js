class PhotosController {
  /** @ngInject */
  constructor($scope, $routeParams, $location, photosService){
    this.$scope = $scope;
    this.$routeParams = $routeParams;
    this.$location = $location;

    this.photosService = photosService;
    this.photosService.$scope = $scope;

    this.loadPhotos();
  }

  showPhoto(id){
    this.$location.path(`photo-detail/${id}`);
  }

  showPage(page){
    this.$location.path(`photos/${page}`).replace();
  }

  pageButtonClass(page){
    if (page === this.photosService.currentPage) {
      return 'md-raised md-primary';
    }
    return 'md-raised custom';
  }

  loadPhotos({page=this._currentPage()}={}){
    this.photosService.loadPhotos({page});
  }

  _currentPage(){
    return parseInt(this.$routeParams.page) || this.photosService.currentPage;
  }
}

export default PhotosController;
