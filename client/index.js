import angular from 'angular';
import 'angular-material';
import 'angular-route';

import 'angular-material/angular-material.css';
import './index.scss';

import SideMenuComponent from './app/side-menu/component';
import Client from './app/client';
import SessionController from './app/session/controller';
import PhotosController from './app/photos/controller';
import PhotosToolbarComponent from './app/photos/toolbar-component';
import PhotoDetailController from './app/photo-detail/controller';
import PhotoDetailToolbarComponent from './app/photo-detail/toolbar-component';
import PhotoDetailFormComponent from './app/photo-detail/form-component';

import routesConfig from './routes';
import themingConfig from './theming';

angular.module('pika', ['ngRoute', 'ngMaterial'])
  .component('sideMenu', SideMenuComponent)
  .service('client', Client)
  .controller('sessionController', SessionController)
  .controller('photosController', PhotosController)
  .component('photosToolbar', PhotosToolbarComponent)
  .controller('photoDetailController', PhotoDetailController)
  .component('photoDetailToolbar', PhotoDetailToolbarComponent)
  .component('photoDetailForm', PhotoDetailFormComponent)
  .config(routesConfig)
  .config(themingConfig);
