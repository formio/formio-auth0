(function () {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'AppConfig'];

  function config($stateProvider, lockProvider, $urlRouterProvider, AppConfig) {
    Formio.setAppUrl(AppConfig.FORMIO_APP_URL);
    Formio.setBaseUrl(AppConfig.FORMIO_API_URL);
    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'components/home/home.html',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'components/login/login.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: AppConfig.AUTH0_CLIENT_ID,
      domain: AppConfig.AUTH0_DOMAIN
    });

    $urlRouterProvider.otherwise('/home');
  }

})();
