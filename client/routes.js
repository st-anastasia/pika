const photosTemplate = require('./photos/index.jade');
const photoDetailTemplate = require('./photo-detail/index.jade');

function routesConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('session', {
      url: '/session',
      template: '<p>Pika</p>',
      controller: 'sessionController',
      controllerAs: '$ctrl',
    })
    .state('photos', {
      url: '/photos/:page?search',
      template: photosTemplate,
      controller: 'photosController',
      controllerAs: '$ctrl',
    })
    .state('photo-detail', {
      url: '/photo-detail/:id',
      template: photoDetailTemplate,
      controller: 'photoDetailController',
      controllerAs: '$ctrl',
    });

  $urlRouterProvider.otherwise('/session');
}

export default routesConfig;
