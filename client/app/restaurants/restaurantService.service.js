'use strict';

angular.module('foodyAppApp')
  .service('restaurantService', function ($http) {

    // AngularJS will instantiate a singleton by calling "new" on this function
    var svc = this;
    svc.restaurants = [];

    svc.getRestaurants = function() {
      var promise = $http.get('/api/restaurants');
      promise.then(function(response) {
        svc.restaurants = response.data;
      });
      return promise;
    };

    svc.findById = function(id) {
      return _.find(svc.restaurants, function(restaurant) {
        return restaurant._id === id;
      });
    };
  });
