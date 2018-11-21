/**
 * sidebar.js
 * Created by Favric for testing purposes
 */
angular.module('main')
  .component('sidebar', {
    bindings: {
      list: '='
    },
    templateUrl: './client/templates/sidebar.view.html',
    controller: function($http) {
      //ensures that the this scope isn't lost
      let $ctrl = this;
      $ctrl.maxStars = 5;
      $ctrl.filters = {};
      $ctrl.filterTags = [];
      $ctrl.hotelQuery = null;
      $ctrl.rating = {0:true};
      // Returns new array for rendering checkboxes stars
      $ctrl.starsArray =  (n) => new Array(n);
      // Detects enter keypress on input
      $ctrl.checkEnter = (keyCode, func) => {
        if(keyCode == 13 && typeof func === 'function'){
          func();
        }
      };
      // Gets full hotels list
      $ctrl.getHotelsList = () => {
        $http.get('/hotels')
          .then(function(res) {
            $ctrl.list = res.data;
          })
          .catch(err => console.log('Unable to perform query: ' + err))
      };
      // Query hotels list by name
      $ctrl.search = () => {
        let query = $ctrl.hotelQuery;
        $ctrl.clearFilters();
        $ctrl.hotelQuery = query;
        if(!$ctrl.hotelQuery){
          $ctrl.processTags({});
          $ctrl.getHotelsList();
        }
        else {
          $ctrl.processTags({name: $ctrl.hotelQuery});
          $http.get('/hotels/search?name='+$ctrl.hotelQuery)
            .then(function(res) {
              $ctrl.list = res.data;
            })
            .catch(err => console.log('Unable to perform query: ' + err))
        }
      };
      // Filters hotels according to rating
      $ctrl.filterByRating = (stars) => {
        $ctrl.clearFilters();
        $ctrl.rating = {[stars]:true};
        $ctrl.processTags({rating:[stars]});
        $http.get('/hotels/search?rating='+stars)
          .then(function(res) {
            $ctrl.list = res.data;
          })
          .catch(err => console.log('Unable to perform query: ' + err))
      };
      // Updates applied filter tags array
      $ctrl.processTags = (filters) => {
        if (filters.rating){$ctrl.filterTags =  Object.values([filters.rating + ' Estrellas']);}
        else {$ctrl.filterTags =  Object.values(filters);}
      };
      // Clear all filters and shows full hotels list
      $ctrl.clearFilters = () => {
        $ctrl.hotelQuery = null;
        $ctrl.rating = {0:true};
        $ctrl.processTags({});
        $ctrl.getHotelsList();
      };

    }
  });