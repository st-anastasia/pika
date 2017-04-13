class PhotosController {
  /** @ngInject */
  constructor($scope, $stateParams, $state, photosService){
    this.$scope = $scope;
    this.$stateParams = $stateParams;
    this.$state = $state;

    this.photosService = photosService;
    this.photosService.$scope = $scope;

    this._loadPhotos();
  }

  showPhoto(id){
    this.$state.go('photo-detail', {id: id});
  }

  showPage(page){
    this.$state.go('photos', {page, search: this.photosService.search},
                   {location: 'replace'});
  }

  pageButtonClass(page){
    if (page === this.photosService.currentPage) {
      return 'md-raised md-primary';
    }
    return 'md-raised custom';
  }

  _loadPhotos(){
    const page = this._currentPage();
    const search = this.$stateParams.search;

    console.log(`Search: ${search}`);
    this.photosService.loadPhotos({page, search});
  }

  _currentPage(){
    return parseInt(this.$stateParams.page) || this.photosService.currentPage;
  }
}

export default PhotosController;
