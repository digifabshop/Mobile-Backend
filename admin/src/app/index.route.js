(function() {
  'use strict';

  angular
    .module('ui')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, RestangularProvider) {

    $stateProvider
      // .state('home', {
      //   url: '',
      //   templateUrl: 'app/main/main.html',
      //   controller: 'MainController',
      //   controllerAs: 'main'
      // })
      // .state('home.menu', {
      //   url: '/menu',
      //   templateUrl: 'app/main/menu.html',
      //   controller: 'MenuController',
      //   controllerAs: 'menu'
      // })
      // .state('home.explorer', {
      //   url: '/explorer',
      //   templateUrl: 'app/main/explorer.html',
      //   controller: 'ExplorerController',
      //   controllerAs: 'explorer'
      // })
      // .state('home.map', {
      //   url: '/map',
      //   templateUrl: 'app/main/maps.html',
      //   controller: 'MapsController',
      //   controllerAs: 'map'
      // })
      // .state('home.project', {
      //   url: '/project/:id',
      //   templateUrl: 'app/main/project.html',
      //   controller: 'ProjectController',
      //   controllerAs: 'project'
      // })
      .state('admin', {
        url: '',
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
      .state('admin.tags', {
        url: '/tags/:id',
        templateUrl: 'app/main/tags.html',
        controller: 'TagsController',
        controllerAs: 'tags',
        resolve: {
          tags: function($stateParams, Restangular) {
            return Restangular.one('tags/' + $stateParams.id + '/children').get().then(function(tags){
              return tags;
            });
          },
          nodes: function($stateParams, Restangular) {
            return Restangular.one('tags/' + $stateParams.id + '/path').get().then(function(nodes){
              return nodes;
            });
          }
        }
      })
      .state('admin.tags_edit', {
        url: '/tags/edit/:id?parent_id',
        templateUrl: 'app/main/tags_edit.html',
        controller: 'TagsEditController',
        controllerAs: 'tags_edit',
        resolve: {
          tags: function($stateParams, Restangular) {
            return Restangular.all('tags').getList().then(function(tags){
              return tags;
            });
          },
          tag: function($stateParams, Restangular) {
            if ($stateParams.id) {
              return Restangular.one('tags', $stateParams.id).get().then(function(tag){
                return tag;
              });
            } else {
              return {};
            }
          }
        }
      })
      .state('admin.categories', {
        url: '/categories',
        templateUrl: 'app/main/categories.html',
        controller: 'CategoriesController',
        controllerAs: 'categories'
      })
      .state('admin.categories_edit', {
        url: '/categories/edit/:id',
        templateUrl: 'app/main/categories_edit.html',
        controller: 'CategoriesEditController',
        controllerAs: 'categories_edit'
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

    $urlRouterProvider.otherwise('');
  }

})();
