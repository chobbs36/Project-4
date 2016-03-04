'use strict';

angular.module('foodyAppApp')
  .controller('MealsCtrl', function (mealService, restaurantService, $scope, socketFactory) {
    var vm = this;
    vm.newMeal = '';
    vm.newMealDescription = '';
    vm.newMealPrice = '';
    vm.selectRestaurant = '';

    var defaultNewMeal = {
      name: '',
      description: '',
      price: '',
      rating: 0
    };

    vm.newMeal = angular.copy(defaultNewMeal);

    restaurantService.getRestaurants().then(function(response) {
      vm.restaurants = response.data;
    });

    mealService.getMeals().then(function(response) {
      vm.meals = response.data;
      vm.selectedMeal = vm.meals.length > 0 ? vm.meals[0] : null;
    });

    vm.setSelected = function(meal) {
      vm.selectedMeal = meal;
    };

    vm.isSelected = function(meal) {
      return meal._id === vm.selectedMeal._id;
    };

    vm.postMeal = function() {
      console.log('saving meal:', vm.newMeal, 'with selectedRestaurant:', vm.selectedRestaurantId);
      mealService.postMeal(vm.newMeal, vm.selectedRestaurantId)
      .then(function(response) {
        vm.newMeal = angular.copy(defaultNewMeal);
      });
    };

    $scope.rateMeal = function() {

      $location.path('/meals');
    };
  });
