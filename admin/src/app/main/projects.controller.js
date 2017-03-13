(function() {
  'use strict';

  angular
    .module('ui')
    .controller('ProjectsController', ProjectsController);

  /** @ngInject */
  function ProjectsController(Restangular) {

    var vm = this;

  Restangular.all('projects').getList().then(function(projects){
      vm.projects = projects;
    });

    vm.save = function() {
      Restangular.all('projects').post($scope.projects).then(function(res){
        // nada
      });
    }

  }
})();
