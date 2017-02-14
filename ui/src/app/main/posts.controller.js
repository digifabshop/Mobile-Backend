(function() {
  'use strict';

  angular
  .module('ui')
  .controller('PostsController', PostsController);

  /** @ngInject */
  function PostsController(Restangular) {

    var vm = this;

    Restangular.all('posts').getList().then(function(posts){
      vm.posts = posts;
    });

  }
})();
