const photosTemplate = require('./app/photos/index.jade');
const photoDetailTemplate = require('./app/photo-detail/index.jade');

function routesConfig($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<p>Pika</p>',
      controller: 'sessionController as $ctrl'
    })
    .when('/photos', {
      template: photosTemplate,
      controller: 'photosController as $ctrl',
    })
    .when('/photo-detail', {
      template: photoDetailTemplate,
      controller: 'photoDetailController as $ctrl',
    });
}

export default routesConfig;
