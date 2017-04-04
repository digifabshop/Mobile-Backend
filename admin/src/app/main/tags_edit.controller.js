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

    vm.tag.parent_id = _.find(vm.tags, { id: +$state.params.parent_id }).id;
    vm.parent = _.find(vm.tags, { id: +$state.params.parent_id });

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
          window.history.back();
          // $state.go('admin.tags');
        });
      } else {
        vm.tag.put().then(function(res){
          window.history.back();
          // $state.go('admin.tags');
        });
      }
    }

  }
})();
