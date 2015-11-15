"use strict";
import "./app.scss";
import "./hello/hello.jade"

import angular from "angular";
import angular_route from "angular-route";

import HelloController from './hello/hello-controller';

angular.module("pika", ["ngRoute"])
 .controller("HelloController", HelloController)
 .config(function($routeProvider){
   $routeProvider
    .when("/", {
      templateUrl: "build/hello/hello.html",
      controller: "HelloController as controller"
    });
 });
