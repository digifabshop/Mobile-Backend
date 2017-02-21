/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('ui')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('config', {
      api: window.location.origin + '/api',
      url: function(path) {
        return this.api + path
      }
    });

})();
