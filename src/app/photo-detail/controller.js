import { getPhoto, getPhotos } from '../data/database';

class PhotoDetailController {
  /** @ngInject */
  constructor($routeParams, $mdDialog, $mdSidenav, $location) {
    this.$mdDialog = $mdDialog;
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;

    this.photo = getPhoto($routeParams.photoId);
    this.photos = getPhotos();
    this.currentPhotoId = parseInt($routeParams.photoId, 10);

    this.isFotoFormOpen = false;
    this.displayButtons();
  }

  showPrev() {
    if (this.currentPhotoId > 0) {
      this.currentPhotoId -= 1;
    }
    this.showPhoto();
  }
  showNext() {
    if (this.currentPhotoId < this.photos.length - 1) {
      this.currentPhotoId += 1;
    }
    this.showPhoto();
  }

  showPhoto() {
    this.$location.path(`photos/${this.currentPhotoId}`);
  }

  displayButtons() {
    this.arrowButtons = {
      leftArrowVisible: this.currentPhotoId > 0,
      rightArrowVisible: this.currentPhotoId < this.photos.length - 1,
    };
  }
}

export default PhotoDetailController;
