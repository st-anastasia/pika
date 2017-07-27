import angular from 'angular';

import session from './session';
import controller from './controller';

export default angular.module('pika.session', [session.name, controller.name]);
