'use strict';
require('./app.scss');

import angular from 'angular';
import angular_route from  'angular-route';

let appModule = angular.module('app', []);
angular.element(document).ready(() =>
  angular.bootstrap(document, [appModule.name], {})
);
