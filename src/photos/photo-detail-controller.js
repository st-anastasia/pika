'use strict';

import { getPhoto, getPhotos } from "../data/database";

class PhotoDetailController{
  constructor($routeParams, $mdDialog, $mdSidenav){
    this.$mdDialog = $mdDialog;
    this.$mdSidenav = $mdSidenav;

    this.photo = getPhoto($routeParams.photoId);
    this.photos = getPhotos();

    this.originatorEvent = null;
    this.isFotoFormOpen = false;
  }

  openMenu($mdOpenMenu, event){
    this.originatorEvent = event;
    $mdOpenMenu(event);
  }

  menuItemClick(index){
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .title('You clicked!')
        .textContent('Menu Item clicked, index: ' + index)
        .ok('OK')
        .targetEvent(this.originatorEvent)
    );

    this.originatorEvent = null;
  }

  toggleFotoForm(){
    console.log('mach die Sidenav auf');
    this.$mdSidenav('right').toggle();
  }

  close(){
    this.$mdSidenav('right').close();
  }
}

export default PhotoDetailController;
