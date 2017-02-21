/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('ui')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('config', {
      api: 'http://localhost/api',
      url: function(path) {
        return this.api + path
      }
    });

})();
