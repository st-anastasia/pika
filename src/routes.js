function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('photos', {
      url: '/photos',
      component: 'photos',
    })

    .state('photoDetail', {
      url: '/photos/:photoId',
      controller: 'photoDetailComponent',
    });
}

export default routesConfig;
