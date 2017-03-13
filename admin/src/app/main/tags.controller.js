(function() {
  'use strict';

  angular
  .module('ui')
  .controller('TagsController', TagsController);

  /** @ngInject */
  function TagsController(Restangular) {

    var vm = this;

    Restangular.all('tags').getList().then(function(tags){
      vm.tags = tags;
    });

  }
})();
