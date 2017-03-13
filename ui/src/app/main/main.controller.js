(function() {
  'use strict';

  angular
    .module('ui')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, Restangular, config) {

    var vm = this;
    $scope.active = 0;
    $scope.myInterval = 2000;
    $scope.noWrapSlides = false;
    $scope.slides = [];

    Restangular.all('assets').getList({visible: 1}).then(function(assets){
      assets.forEach(function(asset) {
        asset.image = config.url(asset.url);
        $scope.slides.push({
          id: $scope.slides.length + 1,
          url: asset.image
        });
      })
      vm.assets = assets;
    });

  }
})();


$(".carousel").swipe({

  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

    if (direction == 'left') $(this).carousel('next');
    if (direction == 'right') $(this).carousel('prev');

  },
  allowPageScroll:"vertical"

});