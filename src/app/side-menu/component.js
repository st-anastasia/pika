import template from './index.jade';

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
  /*toggle(){
    this.$mdSidenav('right').toggle();
  }

  close(){
    this.$mdSidenav('right').close();
  }*/
}

export default {
  template: template(),
  controller: SideMenuController,
  controllerAs: 'sideMenuController',
};

