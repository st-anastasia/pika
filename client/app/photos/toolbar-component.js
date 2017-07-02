import template from './toolbar.jade';

class ToolbarController {
  /** @ngInject */
  constructor($state, $mdSidenav, $location, photosService) {
    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;
    this.photosService = photosService;

    this.searchTerm = '';
    this.uploadProgress = 0;
    this.errorMsg = null;
  }

  toggleSideMenu() {
    this.$mdSidenav('left').toggle();
  }

  search() {
    this.photosService.loadPhotos({ search: this.searchTerm });
    this.$state.go('photos', { search: this.searchTerm }, { location: 'replace', notify: false });
  }

  uploadPhotos(files) {
    this.photosService.uploadPhotos(files.map(file => ({ photo: file })));
  }
}

export default {
  template: template(),
  controller: ToolbarController,
};
