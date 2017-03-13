(function() {
  'use strict';

  angular
    .module('ui')
    .controller('AssetsController', AssetsController);

  /** @ngInject */
  function AssetsController(Restangular) {

    var vm = this;

  Restangular.all('assets').getList().then(function(assets){
      vm.assets = assets;
    });

    vm.save = function() {
      Restangular.all('assets').post($scope.asset).then(function(res){
        // nada
      });
    }

  }
})();
