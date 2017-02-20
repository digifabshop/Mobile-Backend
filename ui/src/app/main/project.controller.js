(function() {
  'use strict';

  angular
  .module('ui')
  .controller('ProjectController', ProjectController);

  /** @ngInject */
  function ProjectController($state, Restangular) {

    var vm = this;

    Restangular.one('projects', $state.params.id).get().then(function(project){
      vm.project = project;
      Restangular.all('assets', $state.params.id).getList({ project_id: vm.project.id }).then(function(assets){
        vm.assets = assets;
      });
    });

  }
})();
