const template = require('./toolbar.jade');

class PhotoDetailToolbarController {
  /** @ngInject */
  constructor($mdSidenav, $mdDialog) {
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
  }

  toggleSideMenu() {
    this.$mdSidenav('left').toggle();
  }

  toggleFotoForm() {
    this.$mdSidenav('right').toggle();
  }

  openMenu($mdOpenMenu, event) {
    this.originatorEvent = event;
    $mdOpenMenu(event);
  }

  menuItemClick(index) {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .title('You clicked!')
        .textContent(`Menu Item clicked, index: ${index}`)
        .ok('OK')
        .targetEvent(this.originatorEvent)
    );

    this.originatorEvent = null;
  }
}

export default {
  template: template(),
  controller: PhotoDetailToolbarController,
};

