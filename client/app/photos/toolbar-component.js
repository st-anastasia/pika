import template from './toolbar.jade';

class ToolbarController {
  /** @ngInject */
  constructor($mdSidenav, $location) {
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;
    this.search = '';
  }

  toggleSideMenu() {
    this.$mdSidenav('left').toggle();
  }

  search(){
    this.$location.path(`photos?search=${this.search}`);
  }
}

export default {
  template: template(),
  controller: ToolbarController,
};
