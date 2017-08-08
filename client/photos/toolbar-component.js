import angular from 'angular';
import template from './toolbar.jade';

class PhotosToolbarController {
  /** @ngInject */
  constructor($state, $mdSidenav, $location, photosClient, photosGallery) {
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;

    this.photosGallery = photosGallery;
    this.photosClient = photosClient;

    this.searchTerm = photosGallery.search;
    this.uploadProgress = 0;
    this.errorMsg = null;
  }

  toggleSideMenu() {
    this.$mdSidenav('left').toggle();
  }

  search() {
    this.photosGallery.showPhotos({ search: this.searchTerm });
    this.$state.go('photos', { search: this.searchTerm }, { location: 'replace', notify: false });
  }

  uploadPhotos(files) {
    const self = this;
    let uploadedCount = 0;

    const onSuccces = () => {
      uploadedCount += 1;
      if (uploadedCount === files.length) self.photosGallery.showPhotos();
    };

    const onFailure = (response) => {
      if (response.status > 0) {
        self.errorMsg = `${response.status}: ${response.data}`;
      }
    };

    const onProgress = (event) => {
      const percentage = (100.0 * (event.loaded / files.size));
      self.uploadProgress = Math.min(100, parseInt(percentage, 10));
    };

    files.forEach((file) => {
      this.photosClient.create({ photo: file }).then(onSuccces, onFailure, onProgress);
    });
  }
}

export default angular.module('photos.toolbar', [])
  .component('photosToolbar', {
    template: template(),
    controller: PhotosToolbarController,
  });
