(function() {
  'use strict';

  angular
    .module('ui')
    .controller('TagsEditController', TagsEditController);

  /** @ngInject */
  function TagsEditController($state, Restangular, tags, tag) {

    var vm = this;
    vm.tag = tag;
    vm.tags = tags;

    if ($state.params.parent_id) {
      vm.tag.parent_id = _.find(vm.tags, { id: +$state.params.parent_id }).id;
      vm.parent = _.find(vm.tags, { id: +$state.params.parent_id });
    } else {
      vm.parent = _.find(vm.tags, { id: tag.parent_id });
    }

    vm.remove = function() {
      if (confirm('Are you sure you want to delete?')) {
        vm.tag.remove().then(function(){
          $state.go('admin.tags', { id: vm.parent.id });
        });
      }
    }

    vm.save = function() {
      if (!('id' in vm.tag)) {
        Restangular.all('tags').post(vm.tag).then(function(res){
          $state.go('admin.tags', { id: vm.parent.id });
        });
      } else {
        vm.tag.put().then(function(res){
          $state.go('admin.tags', { id: vm.parent.id });
        });
      }
    }

  }
})();
