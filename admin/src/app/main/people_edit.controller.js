(function() {
  'use strict';

  angular
    .module('ui')
    .controller('PeopleEditController', PeopleEditController);

  /** @ngInject */
  function PeopleEditController($state, config, Restangular, FileUploader) {

    var vm = this;

    vm.person = {};

    vm.uploader = new FileUploader({
      autoUpload: true,
      url: config.api + '/people/upload',
      headers: {
        accept: 'application/json'
      }
    });

    vm.uploader.onSuccessItem = function(item, response) {
      vm.uploaded = true;
      vm.person.url = response.url;
      vm.person.absUrl = config.url(response.url);
    }

    if ($state.params.id) {
      Restangular.one('people', $state.params.id).get().then(function(person){
        vm.person = person;
        vm.person.absUrl = config.url(vm.person.url);
      });
    }

    vm.remove = function() {
      if (confirm('Are you sure you want to delete?')) {
        vm.asset.remove().then(function(){
          $state.go('admin.people');
        });
      }
    }

    vm.save = function() {
      if (!('id' in vm.person)) {
        Restangular.all('people').post(vm.person).then(function(res){
          $state.go('admin.people');
        });
      } else {
        vm.person.put().then(function(res){
          $state.go('admin.people');
        });
      }
    }

  }
})();
