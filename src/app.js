'use strict';

import 'angular-material/angular-material.css';
import './app.scss';

import angular from 'angular';
import angular_route from 'angular-route';
import angular_material from 'angular-material';

import './hello/hello.jade';
import './photos/photos.jade';
import './photos/photo-detail.jade';

import HelloController from './hello/hello-controller';
import PhotosController from './photos/photos-controller';
import PhotoDetailController from './photos/photo-detail-controller';

angular.module("pika", ['ngRoute', 'ngMaterial'])
 .controller('HelloController', HelloController)
 .controller('PhotosController', PhotosController)
 .controller("PhotoDetailController", PhotoDetailController)
 .config(function($routeProvider){
   $routeProvider
    .when('/', {
      templateUrl: 'build/hello/hello.html',
      controller: 'HelloController as controller'
    })
    .when('/photos', {
      templateUrl: 'build/photos/photos.html',
      controller: 'PhotosController as controller'
    })  
    .when("/photos/:photoId", {
      templateUrl: "build/photos/photo-detail.html",
      controller: "PhotoDetailController as controller"
    });
 });

