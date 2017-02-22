(function() {
  'use strict';

  angular
  .module('ui')
  .controller('CategoriesController', CategoriesController);

  /** @ngInject */
  function CategoriesController(Restangular) {

    var vm = this;

    Restangular.all('categories').getList().then(function(categories){
      vm.categories = categories;
    });

  }
})();
