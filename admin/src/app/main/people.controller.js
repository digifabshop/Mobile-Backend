(function() {
  'use strict';

  angular
    .module('ui')
    .controller('PeopleController', PeopleController);

  /** @ngInject */
  function PeopleController(Restangular) {

    var vm = this;

  Restangular.all('people').getList().then(function(people){
      vm.people = people;
    });

    vm.save = function() {
      Restangular.all('people').post($scope.person).then(function(res){
        // nada
      });
    }

  }
})();
