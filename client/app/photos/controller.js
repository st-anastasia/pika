import { getPhotos } from '../data/database';

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
    const _this = this;
    console.log(id);
    this.$location.path(`photos/${id}`);
  }

  _loadPhotos(){
    const _this = this;
    this.photosService.loadPhotos({offset: this.$routeParams.offset})
  }
}

export default PhotosController;
