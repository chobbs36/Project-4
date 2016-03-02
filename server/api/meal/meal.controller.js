/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/meals              ->  index
 * POST    /api/meals              ->  create
 * GET     /api/meals/:id          ->  show
 * PUT     /api/meals/:id          ->  update
 * DELETE  /api/meals/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Meal from './meal.model';
import Restaurant from '../restaurant/restaurant.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Meals
export function index(req, res) {
  Meal.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Meal from the DB
export function show(req, res) {
  Meal.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Meal in the DB
export function create(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  Restaurant.findByIdAsync(req.body.restaurantId)
  .then(function(restaurant) {
    if (!restaurant) {
      return res.status(404).send('Restaurant not found.');
    }
    var newMeal = restaurant.meals.create({
      name: req.body.text,
      description: req.body.text,
      price: req.body.text
    });
    restaurant.meals.push(newMeal);
    return restaurant.save();
  })
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}

// Updates an existing Meal in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Meal.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Meal from the DB
export function destroy(req, res) {
  Meal.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
