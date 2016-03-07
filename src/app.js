'use strict';

import 'angular-material/angular-material.css';
import './app.scss';

import angular from 'angular';
import angular_route from 'angular-route';
import angular_material from 'angular-material';

import './hello/hello.jade';
import './photos/photos.jade';

import HelloController from './hello/hello-controller';
import PhotosController from './photos/photos-controller';

angular.module("pika", ['ngRoute', 'ngMaterial'])
 .controller('HelloController', HelloController)
 .controller('PhotosController', PhotosController)
 .config(function($routeProvider){
   $routeProvider
    .when('/', {
      templateUrl: 'build/hello/hello.html',
      controller: 'HelloController as controller'
    })
    .when('/photos', {
      templateUrl: 'build/photos/photos.html',
      controller: 'PhotosController as controller'
    });
 });

