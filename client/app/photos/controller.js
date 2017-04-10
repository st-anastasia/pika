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

  openPhoto(id){
    this.photosService.loadPhoto(id);
    this.$location.path('photo-detail');
  }

  pageButtonClass(page){
    if (page === this.photosService.currentPage) {
      return 'md-primary';
    }
    return '';
  }

  loadPhotos({page=this.photosService.currentPage}={}){
    this.photosService.loadPhotos({page});
  }
}

export default PhotosController;
