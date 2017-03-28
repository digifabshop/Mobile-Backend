(function() {
  'use strict';

  angular
  .module('ui')
  .controller('TagsController', TagsController);

  /** @ngInject */
  function TagsController($state, Restangular) {

    var vm = this;

    Restangular.one('tags/' + $state.params.id + '/children').get().then(function(tags){
      vm.tags = tags;
    });

    Restangular.one('tags/' + $state.params.id + '/path').get().then(function(nodes){
      vm.nodes = nodes
      vm.current = nodes[nodes.length-1];
    });

  }
})();
