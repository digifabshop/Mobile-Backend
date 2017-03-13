(function() {
  'use strict';

  angular
  .module('ui')
  .controller('ExplorerController', ExplorerController);

  /** @ngInject */
  function ExplorerController(Restangular) {

    var vm = this;

    // Restangular.all('clients').getList().then(function(clients){
    //   vm.clients = clients;
    // });

  }
})();
