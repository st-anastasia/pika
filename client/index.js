import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'ng-file-upload';

import 'angular-material/angular-material.css';
import './index.scss';

import HttpInterceptor from './app/http-interceptor';
import SideMenuComponent from './app/side-menu/component';
import Session from './app/session';
import SessionController from './app/session/controller';
import PhotosClient from './app/photos/client';
import PhotosGallery from './app/photos/gallery';
import PhotosController from './app/photos/controller';
import PhotosToolbarComponent from './app/photos/toolbar-component';
import PhotoDetailController from './app/photo-detail/controller';
import PhotoDetailToolbarComponent from './app/photo-detail/toolbar-component';
import PhotoDetailFormComponent from './app/photo-detail/form-component';

import routesConfig from './routes';
import themingConfig from './theming';

angular.module('pika', ['ui.router', 'ngMaterial', 'ngFileUpload'])
  .component('sideMenu', SideMenuComponent)
  .factory('photosClient', PhotosClient)
  .service('photosGallery', PhotosGallery)
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
