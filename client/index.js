import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'ng-file-upload';

import 'angular-material/angular-material.css';
import './index.scss';

import session from './session';
import sideMenu from './side-menu';
import photos from './photos';
import photoDetail from './photo-detail';

import HttpInterceptor from './http-interceptor';
import routesConfig from './routes';
import themingConfig from './theming';

angular.module('pika', [
  'ui.router',
  'ngMaterial',
  'ngFileUpload',
  sideMenu.name,
  session.name,
  photos.name,
  photoDetail.name
]).factory('httpInterceptor', HttpInterceptor)
  .config(routesConfig)
  .config(themingConfig)
  .config(($httpProvider) => {
    $httpProvider.interceptors.push('httpInterceptor');
  });
