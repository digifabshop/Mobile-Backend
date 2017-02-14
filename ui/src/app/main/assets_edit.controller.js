(function() {
  'use strict';

  angular
    .module('ui')
    .controller('AssetsEditController', AssetsEditController);

  /** @ngInject */
  function AssetsEditController($state, Restangular) {

    var vm = this;

    vm.asset = {};

    vm.boolOptions = [{ id: false, name: 'No'}, { id: true, name: 'Yes' }];

    if ($state.params.id) {
      Restangular.one('assets', $state.params.id).get().then(function(asset){
        vm.asset = asset;
      });
    }

    Restangular.all('asset_types').getList().then(function(asset_types){
      vm.asset_types = asset_types;
    });

    Restangular.all('projects').getList().then(function(projects){
      vm.projects = projects;
    });

    vm.remove = function() {
      if (confirm('Are you sure you want to delete?')) {
        vm.asset.remove().then(function(){
          $state.go('admin.assets');
        });
      }
    }

    vm.save = function() {
      if (!('id' in vm.asset)) {
        Restangular.all('assets').post(vm.asset).then(function(res){
          $state.go('admin.assets');
        });
      } else {
        vm.asset.put().then(function(res){
          $state.go('admin.assets');
        });
      }
    }

  }
})();
