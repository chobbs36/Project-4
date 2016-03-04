'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'eatUp!',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('foodyAppApp')
  .controller('NavbarController', NavbarController);
