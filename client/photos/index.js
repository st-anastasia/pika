import angular from 'angular';

import client from './client';
import gallery from './gallery';
import controller from './controller';
import toolbarComponent from './toolbar-component.js';

export default angular.module('pika.photos', [
  client.name,
  gallery.name,
  controller.name,
  toolbarComponent.name
]);
