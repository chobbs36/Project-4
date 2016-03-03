'use strict';

angular.module('foodyAppApp')
  .controller('RestaurantsCtrl', function (restaurantService, mealService, $scope, socketFactory) {
    var vm = this;
    vm.newMeal = 'Add new meal here';

    var ioSocket = io('', {
      path: '/socket.io-client'
    });

    var socket = socketFactory({ ioSocket });

    restaurantService.getRestaurants().then(function (response) {
      vm.restaurants = response.data;
      vm.selectedRestaurant = vm.restaurants.length > 0 ? vm.restaurants[0] : null;
    });

    socket.on('meal:save', function (eventData) {
      var meal = eventData.meal;
      var restaurantId = eventData.restaurantId;
      var affectedRestaurant = restaurantService.find(restaurantId);
      var oldMeal = _.find(affectedRestaurant.meals, {_id: meal._id});
      var index = affectedRestaurant.meals.indexOf(oldMeal);

      if(oldMeal) {
        affectedRestaurant.meals.splice(index, 1, meal);
      } else {
        affectedRestaurant.meals.push(meal);
      }
    });

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('meal');
  });

  vm.setSelected = function(restaurant) {
    vm.selectedRestaurant = restaurant;
  };

  vm.isSelected = function(restaurant) {
    return restaurant._id === vm.selectedRestaurant._id;
  };

  vm.postMeal = function() {
    restaurantService.postMeal(vm.newMeal, vm.selectedRestaurant)
    .then(function (response) {
      vm.newMeal = 'Add new meal here';
    });
  };
});

