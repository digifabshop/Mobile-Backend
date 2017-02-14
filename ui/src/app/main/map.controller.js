(function() {
  'use strict';

  angular
  .module('ui')
  .controller('MapsController', MapsController);

  /** @ngInject */
  function MapsController(Restangular) {

    var vm = this;

    vm.center = {
        lat: 51.505,
        lng: -0.09,
        zoom: 8
    }

    // Restangular.all('clients').getList().then(function(clients){
    //   vm.clients = clients;
    // });

  }
})();
