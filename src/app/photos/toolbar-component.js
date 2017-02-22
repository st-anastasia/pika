import template from './toolbar.jade';

class ToolbarController {
    /** @ngInject */
    constructor($mdSidenav) {
      this.$mdSidenav = $mdSidenav;
    }

    toggleSideMenu() {
      this.$mdSidenav('left').toggle();
    }
}

export default {
  template: template(),
  controller: ToolbarController,
}
