'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var MealSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  restaurantId: mongoose.Schema.ObjectId
});

export default mongoose.model('Meal', MealSchema);
