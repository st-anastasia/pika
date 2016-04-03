'use strict';

class SideMenuController{

  constructor($mdSidenav){
   this.$mdSidenav = $mdSidenav;
   this.initMenu();
   this.initAdminMenu();
  }

  initMenu(){
    this.menu = [
      {
        link : '',
        title: 'Photos',
        icon: 'image'
      },
      {
        link : '',
        title: 'Albums',
        icon: 'collections'
      }
    ];
  }

  initAdminMenu(){
    this.adminMenu = [
      {
        link : '',
        title: 'Profile',
        icon: 'account_box'
      },
      {
        link : '',
        title: 'Trash',
        icon: 'delete'
      },
      {
        link : '',
        title: 'Settings',
        icon: 'settings'
      }
    ];
  }

  toggle(){
    this.$mdSidenav('left').toggle();
  }


  close(){
    this.$mdSidenav('left').close();
  }


}

export default SideMenuController;
