const template = require('./toolbar.jade');

class PhotoDetailToolbarController {
  /** @ngInject */
  constructor($mdSidenav, $mdDialog, $location) {
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
    this.$location = $location;
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

  back() {
    this.$location.path('photos');
  }
}

export default {
  template: template(),
  controller: PhotoDetailToolbarController,
};

