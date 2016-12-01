(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['lock', 'authManager', 'Formio'];

  function authService(lock, authManager, Formio) {

    function login() {
      lock.show();
    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      authManager.unauthenticate();
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        lock.getProfile(authResult.idToken, function (error, profile) {

          // Here we will set the token in the Formio provider, which will retrieve
          // the user object within Form.io
          Formio.setToken(profile.user_metadata.formio.token);
          authManager.authenticate();
        });
      });
    }

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }
})();
