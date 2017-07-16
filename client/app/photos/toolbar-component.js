import template from './toolbar.jade';

class ToolbarController {
  /** @ngInject */
  constructor($state, $mdSidenav, $location, photosGallery) {
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;
    this.photosGallery = photosGallery;

    this.searchTerm = '';
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
    this.photosGallery.uploadPhotos(files.map(file => ({ photo: file })));
  }
}

export default {
  template: template(),
  controller: ToolbarController,
};
