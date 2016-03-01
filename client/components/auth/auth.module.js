'use strict';

angular.module('foodyAppApp.auth', [
  'foodyAppApp.constants',
  'foodyAppApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
