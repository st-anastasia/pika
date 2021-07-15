const photosTemplate = require('./photos/index.pug');
const photoDetailTemplate = require('./photo-detail/index.pug');

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
      resolve: { authenticate: authenticate }
    })
    .state('photo-detail', {
      url: '/photo-detail/:id',
      template: photoDetailTemplate,
      controller: 'photoDetailController',
      controllerAs: '$ctrl',
      resolve: { authenticate: authenticate }
    });

  $urlRouterProvider.otherwise('/session');
}

function authenticate($q, $state, $timeout, session) {
  if (session.isAuthenticated()) {
    return $q.when();
  }

  $timeout(function() {
    $state.go('session');
  })

  return $q.reject();
}

export default routesConfig;
