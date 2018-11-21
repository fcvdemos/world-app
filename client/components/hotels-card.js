/**
 * hotels-card.js
 * Created by Favric for testing purposes
 */
angular.module('main')
  .component('hotelsCard', {
    bindings : {
      pedro: '<'
    },
    templateUrl: './client/templates/hotel-card.view.html',
    controller: function($http) {
      //ensures that the this scope isn't lost
      let $ctrl = this;
    }
  });