(function() {
  'use strict';

  angular
    .module('ui')
    .controller('ClientsEditController', ClientsEditController);

  /** @ngInject */
  function ClientsEditController($state, Restangular) {

    var vm = this;

    vm.client = {};

    if ($state.params.id) {
      Restangular.one('clients', $state.params.id).get().then(function(client){
        vm.client = client;
      });
    }

    vm.remove = function() {
      if (confirm('Are you sure you want to delete?')) {
        vm.client.remove().then(function(){
          $state.go('admin.clients');
        });
      }
    }

    vm.save = function() {
      if (!('id' in vm.client)) {
        Restangular.all('clients').post(vm.client).then(function(res){
          $state.go('admin.clients');
        });
      } else {
        vm.client.put().then(function(res){
          $state.go('admin.clients');
        });
      }
    }

  }
})();
