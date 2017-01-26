(function() {
  'use strict';

  angular
    .module('ui')
    .run(runBlock);

  /** @ngInject */
  function runBlock(Restangular) {

    Restangular.setBaseUrl('http://localhost');

    var headers = {
      // Authorization: 'Bearer ' + User.token,
      // 'X-Role': User.role,
      accept: "application/json"
    };

    Restangular.setDefaultHeaders(headers);

  }

})();
