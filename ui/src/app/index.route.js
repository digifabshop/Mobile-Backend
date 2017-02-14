(function() {
  'use strict';

  angular
    .module('ui')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, RestangularProvider) {

    $stateProvider
      .state('home', {
        url: '',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('home.menu', {
        url: '/menu',
        templateUrl: 'app/main/menu.html',
        controller: 'MenuController',
        controllerAs: 'menu'
      })
      .state('home.explorer', {
        url: '/explorer',
        templateUrl: 'app/main/explorer.html',
        controller: 'ExplorerController',
        controllerAs: 'explorer'
      })
      .state('home.map', {
        url: '/map',
        templateUrl: 'app/main/maps.html',
        controller: 'MapsController',
        controllerAs: 'map'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/main/admin.html',
        controller: 'AdminController',
        controllerAs: 'admin'
      })
      .state('admin.clients', {
        url: '/clients',
        templateUrl: 'app/main/clients.html',
        controller: 'ClientsController',
        controllerAs: 'clients'
      })
      .state('admin.clients_edit', {
        url: '/clients/edit/:id',
        templateUrl: 'app/main/clients_edit.html',
        controller: 'ClientsEditController',
        controllerAs: 'clients_edit'
      })
      .state('admin.posts', {
        url: '/posts',
        templateUrl: 'app/main/posts.html',
        controller: 'PostsController',
        controllerAs: 'posts'
      })
      .state('admin.posts_edit', {
        url: '/posts/edit/:id',
        templateUrl: 'app/main/posts_edit.html',
        controller: 'PostsEditController',
        controllerAs: 'posts_edit'
      })
      .state('admin.projects', {
        url: '/projects',
        templateUrl: 'app/main/projects.html',
        controller: 'ProjectsController',
        controllerAs: 'projects'
      })
      .state('admin.projects_edit', {
        url: '/projects/edit/:id',
        templateUrl: 'app/main/projects_edit.html',
        controller: 'ProjectsEditController',
        controllerAs: 'projects_edit'
      })
      .state('admin.assets', {
        url: '/assets',
        templateUrl: 'app/main/assets.html',
        controller: 'AssetsController',
        controllerAs: 'assets'
      })
      .state('admin.assets_edit', {
        url: '/assets/edit/:id',
        templateUrl: 'app/main/assets_edit.html',
        controller: 'AssetsEditController',
        controllerAs: 'assets_edit'
      })
      ;

      RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
        var extractedData;
        if (typeof(data) === 'string') {
          alert('API Error. Please check server logs');
          return;
        }
        if (operation === "getList") {
          extractedData = data.data;
          extractedData.success = data.success;
          extractedData.pagination = data.pagination;
        } else {
          extractedData = data.data;
        }
        return extractedData;
      });

    $urlRouterProvider.otherwise('/');
  }

})();
