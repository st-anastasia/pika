const template = require('./form.jade');

class PhotoDetailFormController {
  /** @ngInject */
  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
  }

  close() {
    this.$mdSidenav('right').close();
  }
}

export default {
  template: template(),
  controller: PhotoDetailFormController,
  bindings: {
    photo: '=',
  },
};
