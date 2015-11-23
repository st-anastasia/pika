"use strict";
import "./app.scss";
import "./hello/hello.jade";
import "./photos/photos.jade";

import angular from "angular";
import angular_route from "angular-route";

import HelloController from './hello/hello-controller';
import PhotosController from "./photos/photos-controller";

angular.module("pika", ["ngRoute"])
 .controller("HelloController", HelloController)
 .controller("PhotosController", PhotosController)
 .config(function($routeProvider){
   $routeProvider
    .when("/", {
      templateUrl: "build/hello/hello.html",
      controller: "HelloController as controller"
    })
    .when("/photos", {
      templateUrl: "build/photos/photos.html",
      controller: "PhotosController as controller"
    });
 });

