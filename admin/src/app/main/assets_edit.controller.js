(function() {
  'use strict';

  angular
    .module('ui')
    .controller('AssetsEditController', AssetsEditController);

  /** @ngInject */
  function AssetsEditController($state, $filter, config, Restangular, FileUploader) {

    var vm = this;

    vm.asset = {};

    vm.uploader = new FileUploader({
      autoUpload: true,
      url: config.api + '/assets/upload',
      headers: {
        accept: 'application/json'
      }
    });

    vm.uploader.onSuccessItem = function(item, response) {
      vm.uploaded = true;
      vm.asset.url = response.url;
      vm.asset.absUrl = config.url(response.url);
    }

    vm.boolOptions = [{ id: null, name: 'No'}, { id: true, name: 'Yes' }];
    vm.imageTypes = [{ id: 'in_progress', name: 'In Progress'}, { id: 'finished', name: 'Finished' }];

    Restangular.all('tags').getList().then(function(tags){
      vm.tags = tags;
      vm.tags = $filter('orderBy')(vm.tags, 'name');
    });

    if ($state.params.id) {
      Restangular.one('assets', $state.params.id).get().then(function(asset){
        vm.asset = asset;
        vm.asset.absUrl = config.url(vm.asset.url);
        vm.asset.tags = $filter('orderBy')(vm.asset.tags, 'name');
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
