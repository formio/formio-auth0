(function () {

  'use strict';

  angular
    .module('app')
    .service('authService', authService);

  authService.$inject = ['lock', 'authManager'];
  function authService(lock, authManager) {
    return {
      login: function() {
        lock.show();
      },
      logout: function() {
        localStorage.removeItem('id_token');
        authManager.unauthenticate();
        Formio.setUser(null);
      },
      init: function() {
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
    };
  }
})();
