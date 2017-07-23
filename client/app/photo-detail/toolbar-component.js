const template = require('./toolbar.jade');

class PhotoDetailToolbarController {
  /** @ngInject */
  constructor($mdSidenav, $mdDialog, $state, photosClient, photosGallery) {
    this.$mdSidenav = $mdSidenav;
    this.$mdDialog = $mdDialog;
    this.$state = $state;

    this.photosClient = photosClient;
    this.photosGallery = photosGallery;
  }

  toggleSideMenu() {
    this.$mdSidenav('left').toggle();
  }

  togglePhotoForm() {
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

  deletePhoto() {
    this.photosClient.delete(this.photosGallery.currentPhoto._id)
      .then(this.back.bind(this));
  }
}

export default {
  template: template(),
  controller: PhotoDetailToolbarController,
};
