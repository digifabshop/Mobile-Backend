(function() {
  'use strict';

  angular
    .module('ui')
    .controller('PostsEditController', PostsEditController);

  /** @ngInject */
  function PostsEditController($state, Restangular) {

    var vm = this;

    vm.post = {};

    if ($state.params.id) {
      Restangular.one('posts', $state.params.id).get().then(function(post){
        vm.post = post;
      });
    }

    vm.remove = function() {
      if (confirm('Are you sure you want to delete?')) {
        vm.post.remove().then(function(){
          $state.go('admin.posts');
        });
      }
    }

    vm.save = function() {
      if (!('id' in vm.post)) {
        Restangular.all('posts').post(vm.post).then(function(res){
          $state.go('admin.posts');
        });
      } else {
        vm.post.put().then(function(res){
          $state.go('admin.posts');
        });
      }
    }

  }
})();
