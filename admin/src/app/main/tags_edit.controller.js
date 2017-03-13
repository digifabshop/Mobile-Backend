(function() {
  'use strict';

  angular
    .module('ui')
    .controller('TagsEditController', TagsEditController);

  /** @ngInject */
  function TagsEditController($state, Restangular) {

    var vm = this;

    vm.tag = {};

    if ($state.params.id) {
      Restangular.one('tags', $state.params.id).get().then(function(tag){
        vm.tag = tag;
      });
    }

    vm.remove = function() {
      if (confirm('Are you sure you want to delete?')) {
        vm.tag.remove().then(function(){
          $state.go('admin.tags');
        });
      }
    }

    vm.save = function() {
      if (!('id' in vm.tag)) {
        Restangular.all('tags').post(vm.tag).then(function(res){
          $state.go('admin.tags');
        });
      } else {
        vm.tag.put().then(function(res){
          $state.go('admin.tags');
        });
      }
    }

  }
})();
