import angular from 'angular';
import template from './form.jade';

class PhotoDetailFormController {
  /** @ngInject */
  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
  }

  close() {
    this.$mdSidenav('right').close();
  }
}

export default angular.module('photo-detail.form', [])
  .component('photoDetailForm', {
    template: template(),
    controller: PhotoDetailFormController,
    bindings: {
      photo: '=',
    },
  });
