(function() {
  'use strict';

  angular
    .module('ui')
    .run(runBlock);

  /** @ngInject */
  function runBlock(Restangular, config) {

    Restangular.setBaseUrl(config.api);

    var headers = {
      // Authorization: 'Bearer ' + User.token,
      // 'X-Role': User.role,
      accept: "application/json"
    };

    Restangular.setDefaultHeaders(headers);

  }

})();
