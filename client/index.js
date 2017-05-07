import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';

import 'angular-material/angular-material.css';
import './index.scss';

import HttpInterceptor from './app/http-interceptor';
import SideMenuComponent from './app/side-menu/component';
import Session from './app/session';
import SessionController from './app/session/controller';
import PhotosService from './app/photos/service';
import PhotosController from './app/photos/controller';
import PhotosToolbarComponent from './app/photos/toolbar-component';
import PhotoDetailController from './app/photo-detail/controller';
import PhotoDetailToolbarComponent from './app/photo-detail/toolbar-component';
import PhotoDetailFormComponent from './app/photo-detail/form-component';

import routesConfig from './routes';
import themingConfig from './theming';

angular.module('pika', ['ui.router', 'ngMaterial'])
  .component('sideMenu', SideMenuComponent)
  .service('photosService', PhotosService)
  .service('session', Session)
  .factory('httpInterceptor', HttpInterceptor)
  .controller('sessionController', SessionController)
  .controller('photosController', PhotosController)
  .component('photosToolbar', PhotosToolbarComponent)
  .controller('photoDetailController', PhotoDetailController)
  .component('photoDetailToolbar', PhotoDetailToolbarComponent)
  .component('photoDetailForm', PhotoDetailFormComponent)
  .config(routesConfig)
  .config(themingConfig)
  .config(($httpProvider) => {
    $httpProvider.interceptors.push('httpInterceptor');
  });
