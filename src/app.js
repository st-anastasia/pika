'use strict';
import 'angular-material/angular-material.css';
import './app.scss';

import angular from 'angular';
import angular_route from 'angular-route';
import angular_material from 'angular-material';

import SideMenuController from './side-menu-controller';
import PhotosController from './photos/photos-controller';
import PhotoDetailController from './photos/photo-detail-controller';

angular.module("pika", ['ngRoute', 'ngMaterial'])
 .controller('SideMenuController', SideMenuController)
 .controller('PhotosController', PhotosController)
 .controller("PhotoDetailController", PhotoDetailController)
 .config(function($routeProvider, $mdThemingProvider){
   $routeProvider
    .when('/photos', {
      template: require('./photos/photos.jade'),
      controller: 'PhotosController as controller'
    })
    .when("/photos/:photoId", {
      template: require('./photos/photo-detail.jade'),
      controller: "PhotoDetailController as controller"
    });
    $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey', {
      'default': '400',
      'hue-1': '50',
      'hue-2': '800',
    })
    .backgroundPalette('blue-grey', {
      'default': '50',
      'hue-1': '800'
    })
    .accentPalette('cyan');
 });

