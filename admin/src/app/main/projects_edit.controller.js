(function() {
  'use strict';

  angular
    .module('ui')
    .controller('ProjectsEditController', ProjectsEditController);

  /** @ngInject */
  function ProjectsEditController($state, $filter, Restangular) {

    var vm = this;

    vm.project = {};

    if ($state.params.id) {
      Restangular.one('projects', $state.params.id).get().then(function(project){
        vm.project = project;
      });
    }

    Restangular.all('clients').getList().then(function(clients){
      vm.clients = clients;
    });

    vm.remove = function() {
      if (confirm('Are you sure you want to delete?')) {
        vm.project.remove().then(function(){
          $state.go('admin.projects');
        });
      }
    }

    vm.save = function() {
      vm.project.start = $filter('date')(vm.project.start,'yyyy-MM-dd');
      vm.project.end = $filter('date')(vm.project.end,'yyyy-MM-dd');
      if (!('id' in vm.project)) {
        Restangular.all('projects').post(vm.project).then(function(res){
          $state.go('admin.projects');
        });
      } else {
        vm.project.put().then(function(res){
          $state.go('admin.projects');
        });
      }
    }

  }
})();
