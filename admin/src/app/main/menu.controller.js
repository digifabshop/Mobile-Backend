(function() {
  'use strict';

  angular
  .module('ui')
  .controller('MenuController', MenuController);

  /** @ngInject */
  function MenuController(Restangular) {

    var vm = this;

    // Restangular.all('clients').getList().then(function(clients){
    //   vm.clients = clients;
    // });

  }
})();
