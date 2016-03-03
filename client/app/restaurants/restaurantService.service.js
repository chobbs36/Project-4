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

    svc.postMeal = function(newMeal, restaurant) {
      return $http.post('/api/meals',
                        { text: newMeal,
                          restaurantId: restaurant._id
                        });
    };

    svc.findById = function(id) {
      return _.find(svc.restaurants, function(restaurant) {
        return restaurant._id === id;
      });
    };
  });
