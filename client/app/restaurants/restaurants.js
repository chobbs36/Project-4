'use strict';

angular.module('foodyAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('restaurants', {
        url: '/restaurants',
        templateUrl: 'app/restaurants/restaurants.html',
        controller: 'RestaurantsCtrl',
        controllerAs: 'vm'
      });
  });
