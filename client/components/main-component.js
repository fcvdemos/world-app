/**
 * main-component.js
 * Created by Favric for testing purposes
 */

angular.module('main', [])
  .component('app', {
    templateUrl: './client/templates/main-component.view.html',
    controller: function($http) {
      //ensures that the this scope isn't lost
      let $ctrl = this;
      $ctrl.hotels = '';
      $http.get('/hotels').then(function(res) {
        $ctrl.hotels = res.data;
      })
    }
  });