'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mealCtrlStub = {
  index: 'mealCtrl.index',
  show: 'mealCtrl.show',
  create: 'mealCtrl.create',
  update: 'mealCtrl.update',
  destroy: 'mealCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mealIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './meal.controller': mealCtrlStub
});

describe('Meal API Router:', function() {

  it('should return an express router instance', function() {
    mealIndex.should.equal(routerStub);
  });

  describe('GET /api/meals', function() {

    it('should route to meal.controller.index', function() {
      routerStub.get
        .withArgs('/', 'mealCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/meals/:id', function() {

    it('should route to meal.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'mealCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/meals', function() {

    it('should route to meal.controller.create', function() {
      routerStub.post
        .withArgs('/', 'mealCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/meals/:id', function() {

    it('should route to meal.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'mealCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/meals/:id', function() {

    it('should route to meal.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'mealCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/meals/:id', function() {

    it('should route to meal.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'mealCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
