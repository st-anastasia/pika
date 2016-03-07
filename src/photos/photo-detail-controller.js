'use strict';

import { getPhoto } from "../data/database";

class PhotoDetailController{
  constructor($routeParams){
    this.photo = getPhoto($routeParams.photoId);
  }
}

export default PhotoDetailController;
