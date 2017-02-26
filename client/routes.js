const photosTemplate = require('./app/photos/index.jade');
const photoDetailTemplate = require('./app/photo-detail/index.jade');

function routesConfig($routeProvider) {
  $routeProvider
    .when('/photos', {
      template: photosTemplate,
      controller: 'photosController as $ctrl',
    })
    .when('/photos/:photoId', {
      template: photoDetailTemplate,
      controller: 'photoDetailController as $ctrl',
    });
}

export default routesConfig;
