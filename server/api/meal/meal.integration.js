'use strict';

var app = require('../..');
import request from 'supertest';

var newMeal;

describe('Meal API:', function() {

  describe('GET /api/meals', function() {
    var meals;

    beforeEach(function(done) {
      request(app)
        .get('/api/meals')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          meals = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      meals.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/meals', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/meals')
        .send({
          name: 'New Meal',
          info: 'This is the brand new meal!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMeal = res.body;
          done();
        });
    });

    it('should respond with the newly created meal', function() {
      newMeal.name.should.equal('New Meal');
      newMeal.info.should.equal('This is the brand new meal!!!');
    });

  });

  describe('GET /api/meals/:id', function() {
    var meal;

    beforeEach(function(done) {
      request(app)
        .get('/api/meals/' + newMeal._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          meal = res.body;
          done();
        });
    });

    afterEach(function() {
      meal = {};
    });

    it('should respond with the requested meal', function() {
      meal.name.should.equal('New Meal');
      meal.info.should.equal('This is the brand new meal!!!');
    });

  });

  describe('PUT /api/meals/:id', function() {
    var updatedMeal;

    beforeEach(function(done) {
      request(app)
        .put('/api/meals/' + newMeal._id)
        .send({
          name: 'Updated Meal',
          info: 'This is the updated meal!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMeal = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMeal = {};
    });

    it('should respond with the updated meal', function() {
      updatedMeal.name.should.equal('Updated Meal');
      updatedMeal.info.should.equal('This is the updated meal!!!');
    });

  });

  describe('DELETE /api/meals/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/meals/' + newMeal._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when meal does not exist', function(done) {
      request(app)
        .delete('/api/meals/' + newMeal._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
