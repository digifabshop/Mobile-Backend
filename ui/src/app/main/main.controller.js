(function() {
  'use strict';

  angular
    .module('ui')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(Restangular, config) {

    var vm = this;

    Restangular.all('assets').getList({visible: 1}).then(function(assets){
      assets.forEach(function(asset) {
        asset.url = config.url(asset.url)
      })
      console.log(assets)
      vm.assets = assets;
    });


  }
})();
