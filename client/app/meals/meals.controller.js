'use strict';

angular.module('foodyAppApp')
  .controller('MealsCtrl', function (mealService, restaurantService) {
    var vm = this;
    vm.newMeal = 'Add new meal here.';

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
      restaurantService.postMeal(vm.newMeal, vm.selectedRestaurant)
      .then(function(response) {
        vm.newMeal = 'Add new meal here';
      });
    };
  });
