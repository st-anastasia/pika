const template = require('./toolbar.jade');

class PhotoDetailToolbarController {
  /** @ngInject */
  constructor($mdSidenav, $mdDialog, $state) {
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
    this.$state = $state;
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
    this.$state.go('photos');
  }
}

export default {
  template: template(),
  controller: PhotoDetailToolbarController,
};

