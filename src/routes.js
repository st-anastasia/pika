const photosTemplate = require('./app/photos/photos.jade');
const photoDetailTemplate = require('./app/photos/photo-detail.jade');

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
