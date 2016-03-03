'use strict';

angular.module('foodyAppApp')
  .service('mealService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var svc = this;
    svc.meals = [];

    svc.getMeals = function() {
      var promise= $http.get('/api/meals');
      promise.then(function(response) {
        svc.meals = response.data;
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
      return _.find(svc.meals, function(restaurant) {
        return restaurant._id === id;
      });
    };
  });
