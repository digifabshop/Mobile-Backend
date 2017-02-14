(function() {
  'use strict';

  angular
  .module('ui')
  .controller('ClientsController', ClientsController);

  /** @ngInject */
  function ClientsController(Restangular) {

    var vm = this;

    Restangular.all('clients').getList().then(function(clients){
      vm.clients = clients;
    });

  }
})();
