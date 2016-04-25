'use strict';

import { getPhoto } from "../data/database";

class PhotoDetailController{
  constructor($routeParams, $mdDialog){
    this.photo = getPhoto($routeParams.photoId);

    this.originatorEvent = null;
    this.$mdDialog = $mdDialog;
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
}

export default PhotoDetailController;
