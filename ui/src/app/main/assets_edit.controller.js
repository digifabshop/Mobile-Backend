(function() {
  'use strict';

  angular
    .module('ui')
    .controller('AssetsEditController', AssetsEditController);

  /** @ngInject */
  function AssetsEditController($state, config, Restangular, FileUploader) {

    var vm = this;

    vm.asset = {};

    vm.uploader = new FileUploader({
      autoUpload: true,
      url: config.api + '/assets/upload',
      headers: {
        accept: 'application/json'
      }
    });

    // vm.uploader.onAfterAddingFile = function(item) {
    //   // debugger;
    // }

    vm.uploader.onSuccessItem = function(item, response) {
      vm.uploaded = true;
      vm.asset.url = config.url(response.url);
    }

    vm.boolOptions = [{ id: false, name: 'No'}, { id: true, name: 'Yes' }];

    if ($state.params.id) {
      Restangular.one('assets', $state.params.id).get().then(function(asset){
        vm.asset = asset;
        vm.asset.url = config.url(vm.asset.url);
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
