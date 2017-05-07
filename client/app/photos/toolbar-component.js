import template from './toolbar.jade';

class ToolbarController {
  /** @ngInject */
  constructor($state, $mdSidenav, $location, photosService) {
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;
    this.$state = $state;

    this.photosService = photosService;
    this.searchTerm = '';
  }

  toggleSideMenu() {
    this.$mdSidenav('left').toggle();
  }

  search() {
    this.photosService.loadPhotos({ search: this.searchTerm });
    this.$state.go('photos', { search: this.searchTerm }, { location: 'replace', notify: false });
  }
}

export default {
  template: template(),
  controller: ToolbarController,
};
