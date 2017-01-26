(function() {
  'use strict';

  angular
    .module('ui')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, RestangularProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });

      RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;
        if (typeof(data) === 'string') {
          alert('API Error. Please check server logs');
          return;
        }
        if (operation === "getList") {
          extractedData = data.data;
          extractedData.success = data.success;
          extractedData.pagination = data.pagination;
        } else {
          extractedData = data.data;
        }
        return extractedData;
      });

    $urlRouterProvider.otherwise('/');
  }

})();
