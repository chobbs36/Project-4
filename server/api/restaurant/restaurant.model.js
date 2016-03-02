'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Meal = require('../meal/meal.model');

var RestaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  cuisine: String,
  meals: [Meal.schema]
});

export default mongoose.model('Restaurant', RestaurantSchema);
