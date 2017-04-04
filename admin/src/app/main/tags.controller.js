(function() {
  'use strict';

  angular
  .module('ui')
  .controller('TagsController', TagsController);

  /** @ngInject */
  function TagsController($state, Restangular, tags, nodes) {

    var vm = this;
    vm.tags = tags;
    vm.nodes = nodes;
    vm.current = vm.nodes[vm.nodes.length-1];

  }
})();
