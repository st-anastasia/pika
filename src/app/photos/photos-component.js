import { getPhotos } from '../data/database';

const photosTemplate = require('./photos.jade');

class PhotosController {
  /** @ngInject */
  constructor($location, $mdSidenav) {
    this.photos = getPhotos();
    this.$location = $location;
    this.$mdSidenav = $mdSidenav;
  }

  openPhoto(index) {
    this.$location.path(`photos/${index}`);
  }

  toggleSideMenu() {
    this.$mdSidenav('left').toggle();
  }
}

export default {
  template: photosTemplate(),
  controller: PhotosController,
};
