import 'angular-material/angular-material.css';
import './index.scss';

import angular from 'angular';
import angular_material from 'angular-material';
import angular_ui_router from 'angular-ui-router';

import { SideMenuComponent }  from './app/side-menu-component';
// import {PhotosComponent} from './app/photos/photos-component';
// import {PhotoDetailComponent} from './app/photos/photo-detail-component';

// import routesConfig from './routes';
// import themingConfig from './theming;
debugger;
angular.module('pika', ['ui.router', 'ngMaterial'])
  .component('sideMenu', SideMenuComponent);
 // .component('photos', PhotosComponent)
 // .component('photoDetail', PhotoDetailComponent)
 // .config(routesConfig)
 // .config(themingConfig);

