import { getPhotos } from '../data/database';

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

export default PhotosController;
