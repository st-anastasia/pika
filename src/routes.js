export default routesConfig;

function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      component: 'app'
    })

    .state('photos', {
      url: '/photos',
      component: 'photosComponent'
    })

    .state('photoDetail', {
      url: '/photos/:photoId',
      controller: 'photoDetailComponent'
    });
}
