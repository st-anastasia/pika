import angular from 'angular';
import 'angular-material';
import 'angular-route';

import 'angular-material/angular-material.css';
import './index.scss';

import SideMenuComponent from './app/side-menu/component';
import PhotosToolbarComponent from './app/photos/toolbar-component';
import PhotosController from './app/photos/controller';
import PhotoDetailToolbarComponent from './app/photo-detail/toolbar-component';
import PhotoDetailController from './app/photo-detail/controller';

import routesConfig from './routes';
import themingConfig from './theming';

angular.module('pika', ['ngRoute', 'ngMaterial'])
  .component('sideMenu', SideMenuComponent)
  .component('photosToolbar', PhotosToolbarComponent)
  .controller('photosController', PhotosController)
  .component('photoDetailToolbar', PhotoDetailToolbarComponent)
  .controller('photoDetailController', PhotoDetailController)
  .config(routesConfig)
  .config(themingConfig);
