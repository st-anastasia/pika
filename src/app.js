'use strict';
import 'angular-material/angular-material.css';
import './app.scss';

import angular from 'angular';
import angular_route from 'angular-route';
import angular_material from 'angular-material';

import PhotosController from './photos/photos-controller';
import PhotoDetailController from './photos/photo-detail-controller';

import SideMenuDirective from './side-menu/directive';

angular.module('pika', ['ngRoute', 'ngMaterial'])
  .controller('PhotosController', PhotosController)
  .controller('PhotoDetailController', PhotoDetailController)
  .directive('sideMenu', SideMenuDirective)
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
        'hue-1': '800',
        'hue-2': '900'
      })
      .accentPalette('cyan')
      .dark();
  });
