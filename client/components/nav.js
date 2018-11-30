/**
 * nav.js
 * Created by Favric for testing purposes
 */
angular.module('main')
  .component('mainNavbar', {
    templateUrl: './client/templates/navbar.view.html',
    controller: function($http) {
      //ensures that the this scope isn't lost
      let $ctrl = this;
    }
  });