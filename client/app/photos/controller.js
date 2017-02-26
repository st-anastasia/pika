import { getPhotos } from '../data/database';

class PhotosController {
  /** @ngInject */
  constructor($location) {
    this.photos = getPhotos();
    this.$location = $location;
  }

  openPhoto(index) {
    this.$location.path(`photos/${index}`);
  }
}

export default PhotosController;
