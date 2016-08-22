'use strict';

import { getPhoto, getPhotos } from "../data/database";

class PhotoDetailController{
  constructor($routeParams, $mdDialog, $mdSidenav, $location){
    this.$mdDialog = $mdDialog;
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;

    this.photo = getPhoto($routeParams.photoId);
    this.photos = getPhotos();
    this.currentPhotoId = parseInt($routeParams.photoId);

    this.originatorEvent = null;
    this.isFotoFormOpen = false;

    this.displayButtons();
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

  showPrev(){
    if(this.currentPhotoId > 0){
      this.currentPhotoId--;
    }
    this.showPhoto();
  }
  showNext(){
    if(this.currentPhotoId < this.photos.length - 1){
      this.currentPhotoId++;
    }
    this.showPhoto();
  }

  showPhoto(){
    this.$location.path('photos/' + this.currentPhotoId);
  }

  displayButtons(){
    this.arrowButtons = {
      leftArrowVisible: this.currentPhotoId > 0,
      rightArrowVisible: this.currentPhotoId < this.photos.length - 1
    };
  }
}

export default PhotoDetailController;
