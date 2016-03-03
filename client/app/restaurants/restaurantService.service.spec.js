'use strict';

describe('Service: restaurantService', function () {

  // load the service's module
  beforeEach(module('foodyAppApp'));

  // instantiate service
  var restaurantService;
  beforeEach(inject(function (_restaurantService_) {
    restaurantService = _restaurantService_;
  }));

  it('should do something', function () {
    expect(!!restaurantService).toBe(true);
  });

});
