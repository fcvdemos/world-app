/**
 * hotels-container.js
 * Created by Favric for testing purposes
 */
angular.module('main')
  .component('hotelsContainer', {
    bindings : {
      hotels: '<'
    },
    templateUrl: './client/templates/hotels-container.view.html',
    controller: function($http) {
      //ensures that the this scope isn't lost
      let $ctrl = this;
    }
  });