/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Restaurant from '../api/restaurant/restaurant.model';

Thing.find({}).removeAsync()
  .then(() => {
    return Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  }, handleError);

User.find({}).removeAsync()
  .then(() => {
    return User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
      return User.find();
    })
    .then((users) => {
      return createRestaurants(users);
    })
    .then((restaurants) => {
      console.log('created the following the restaurants:\n', restaurants);
    }, handleError);
  });

function createRestaurants(users) {
  return Restaurant.find().remove({})
  .then(() => {
    return Restaurant.create([
      {
        name: 'Yard House',
        location: '261 19th Street NW, Atlanta, GA 30363',
        cuisine: 'American',
        meals: [
          { name: 'Spicy Jambalaya', description: 'blackened shrimp, chicken-andouille sausage, peppers, crawfish, cajun cream sauce', price: 13.45 },
          { name: 'Chicken Enchilada Stack', description: 'corn tortillas, pasilla, jack, beans, sour cream, tomatillo & red chili sauce', price: 16.85 }
        ]
      },
      {
        name: 'Front Page News',
        location: '1104 Crescent Avenue NE, Atlanta, GA 30309',
        cuisine: 'American',
        meals: [
          { name: 'Fried Shrimp Po-Boy', description: 'New Orleans style Po’Boy toasted and piled high with lightly breaded, flash fried Gulf white shrimp, shredded lettuce, tomato & Creole mayo', price: 11.99 },
          { name: 'Crescent City', description: 'Tangy honey chipotle glaze, thinly sliced andouille sausage, melted pepper jack, grilled onions, Kaiser bun', price: 11.99 }
        ]
      },
      {
        name: 'Tacos and Tequilas',
        location: '650 Ponce De Leon Avenue NE, Atlanta, GA 30308',
        cuisine: 'Mexican',
        meals: [
          { name: 'Speedy Gonzalez', description: 'One taco, one enchilada, Mexican rice and Mexi-beans', price: 5.99 },
          { name: 'Mexican Cheeseburger', description: 'Mexican style, 8 oz burger topped with lettuce, avocado, jalapenos, bacon and cheddar cheese. Served with seasoned fries', price: 7.99 }
        ]
      }
    ]);
  }, handleError);
}

function handleError(err) {
  console.log('ERROR', err);
}
