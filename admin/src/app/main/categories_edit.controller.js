(function() {
  'use strict';

  angular
    .module('ui')
    .controller('CategoriesEditController', CategoriesEditController);

  /** @ngInject */
  function CategoriesEditController($state, Restangular) {

    var vm = this;

    vm.category = {};

    if ($state.params.id) {
      Restangular.one('categories', $state.params.id).get().then(function(category){
        vm.category = category;
      });
    }

    vm.remove = function() {
      if (confirm('Are you sure you want to delete?')) {
        vm.category.remove().then(function(){
          $state.go('admin.categories');
        });
      }
    }

    vm.save = function() {
      if (!('id' in vm.category)) {
        Restangular.all('categories').post(vm.category).then(function(res){
          $state.go('admin.categories');
        });
      } else {
        vm.category.put().then(function(res){
          $state.go('admin.categories');
        });
      }
    }

  }
})();
