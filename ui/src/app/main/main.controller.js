(function() {
  'use strict';

  angular
    .module('ui')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(Restangular) {

    var vm = this;

    Restangular.all('photos').getList().then(function(photos){
      vm.photos = photos;
    });

    vm.save = function() {
      Restangular.all('assets').post($scope.asset).then(function(res){
        alert("saved!");
      });
    }

  }
})();
