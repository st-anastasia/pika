'use strict';

import { getPhotos } from "../data/database";

class PhotosController{
  constructor(){
    this.photos = getPhotos();
  }
}

export default PhotosController;
