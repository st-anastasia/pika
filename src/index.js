import angular from 'angular';
import 'angular-material';
import 'angular-ui-router';

import 'angular-material/angular-material.css';
import './index.scss';

import SideMenuComponent from './app/side-menu-component';
import PhotosComponent from './app/photos/photos-component';
// import {PhotoDetailComponent} from './app/photos/photo-detail-component';

import routesConfig from './routes';
import themingConfig from './theming';

angular.module('pika', ['ui.router', 'ngMaterial'])
  .component('sideMenu', SideMenuComponent)
  .component('photos', PhotosComponent)
 // .component('photoDetail', PhotoDetailComponent)
  .config(routesConfig)
  .config(themingConfig);

