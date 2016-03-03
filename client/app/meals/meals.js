'use strict';

angular.module('foodyAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('meals', {
        url: '/meals',
        templateUrl: 'app/meals/meals.html',
        controller: 'MealsCtrl',
        controllerAs: 'vm'
      });
  });
