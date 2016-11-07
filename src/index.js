import angular from 'angular';
import 'angular-material';
import 'angular-route';

import 'angular-material/angular-material.css';
import './index.scss';

import SideMenuComponent from './app/side-menu-component';
import PhotosComponent from './app/photos/photos-controller';
import PhotoDetailComponent from './app/photos/photo-detail-controller';

import routesConfig from './routes';
import themingConfig from './theming';

angular.module('pika', ['ngRoute', 'ngMaterial'])
  .component('sideMenu', SideMenuComponent)
  .controller('photosController', PhotosComponent)
  .controller('photoDetailController', PhotoDetailComponent)
  .config(routesConfig)
  .config(themingConfig);

