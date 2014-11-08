'use strict';
var _ = require('..');

// Wrappers Types:
_([]);       // ArrayWrapper {__value__: Array[0], __wrapped__: true, concat: functi...

_('string'); // StringWrapper {__value__: "string", __wrapped__: true, charAt: functi...

_({});       // ObjectWrapper {__value__: Object, __wrapped__: true, keys: function, ...

_(1);        // NumberWrapper {__value__: 1, __wrapped__: true, abs: function, ceil: ...


var users = [
  { id: 1, details: { name: 'Ariel M', age: 25 }, isAdmin: true  },
  { id: 2, details: { name: 'Danny L', age: 19 }, isAdmin: false },
  { id: 3, details: { name: 'Eitan O', age: 31 }, isAdmin: true  },
  { id: 4, details: { name: 'Cati P',  age: 26 }, isAdmin: true  },
  { id: 5, details: { name: 'Mike P',  age: 50 }, isAdmin: false },
  { id: 6, details: { name: 'Niko M',  age: 30 }, isAdmin: false }
];

//get the admins names
_(users)
  .pick('isAdmin')
  .map('details.name')
  .join(', ')
  .value();


//get the average age of users
var average = _(users)
  .map('details.age')
  .sum()
  .value() / users.length;

//get all users that greater than 25 and not admin
_(users)
  .pick('details.age > 30 && !isAdmin')
  .value();


var orders = [
  { id: 21, customer: { id: 2, name: 'John P.' }, product: { price: 21.12 }  },
  { id: 22, customer: { id: 1, name: 'Cati P.' }, product: { price: 89.21 }  },
  { id: 23, customer: { id: 1, name: 'Cati P.' }, product: { price: 49.00 }  },
  { id: 24, customer: { id: 3, name: 'Poul S.' }, product: { price: 10.22 }  },
  { id: 25, customer: { id: 4, name: 'Erik L.' }, product: { price: 11.31 }  },
  { id: 26, customer: { id: 4, name: 'Erik L.' }, product: { price: 90.99 }  },
  { id: 27, customer: { id: 2, name: 'Cati P.' }, product: { price: 88.99 }  }
];

//list of customers
_(orders)
  .uniq('customer.id')
  .value();

//get the greatest purchase
_(orders)
  .max('product.price')
  .value();

//group orders by customer name
_(orders)
  .groupBy('customer.name')
  .value();

var n = _(orders)       // ArrayWrapper
  .map('product.price') // [21.12, 89.21, 49, 10.22, 11.31, 90.99, 88.99]
  .sum()                // 360.84
  .round()              // 361
  .add(10)              // 371
  .value();             // get the value;







