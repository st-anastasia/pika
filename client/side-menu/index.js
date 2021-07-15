import angular from 'angular';
import template from './index.pug';

class SideMenuController {

  /** @ngInject */
  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
    this.initMenu();
    this.initAdminMenu();
  }

  initMenu() {
    this.menu = [
      {
        link: '',
        title: 'Photos',
        icon: 'image',
      },
      {
        link: '',
        title: 'Albums',
        icon: 'collections',
      },
    ];
  }

  initAdminMenu() {
    this.adminMenu = [
      {
        link: '',
        title: 'Profile',
        icon: 'account_box',
      },
      {
        Link: '',
        title: 'Trash',
        icon: 'delete',
      },
      {
        link: '',
        title: 'Settings',
        icon: 'settings',
      },
    ];
  }

  toggle() {
    this.$mdSidenav('left').toggle();
  }

  close() {
    this.$mdSidenav('left').close();
  }
}

export default angular.module('pika.side-menu', [])
  .component('sideMenu', {
    template: template(),
    controller: SideMenuController,
    controllerAs: 'sideMenuController',
  });
