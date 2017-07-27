import angular from 'angular';

import photosClient from '../photos/client';
import photosGallery from '../photos/gallery';
import controller from './controller';
import toolbarComponent from './toolbar-component';
import formComponent from './form-component';

export default angular.module('pika.photo-detail', [
  photosClient.name,
  photosGallery.name,
  controller.name,
  toolbarComponent.name,
  formComponent.name
]);
