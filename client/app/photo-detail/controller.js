import { getPhoto, getPhotos } from '../data/database';

class PhotoDetailController {
  /** @ngInject */
  constructor($routeParams, $mdDialog, $mdSidenav, $location, photosService){
    this.$routeParams = $routeParams;
    this.$mdDialog = $mdDialog;
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;

    this.isFotoFormOpen = false;

    this.photosService = photosService;
    this._loadPhoto();
  }

  showPrev(){
    this.photosService.next();
  }

  showNext(){
    this.photosService.prev();
  }

  _loadPhoto(){
    this.photosService.loadPhoto(this.$routeParams.photoId);
  }
}

export default PhotoDetailController;
