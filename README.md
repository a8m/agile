#Agile.js [![Build Status](https://travis-ci.org/a8m/agile.svg?branch=master)](https://travis-ci.org/a8m/agile) [![Coverage Status](https://img.shields.io/coveralls/a8m/agile.svg)](https://coveralls.io/r/a8m/agile?branch=master)
>Like Underscore, but with zero callbacks and really more fun, **v0.0.2**

- [Get Started](#get-started)
- [Collection](#collection)
  - [add](#add)
  - [after](#after)
  - [afterWhere](#afterwhere)
  - [before](#before)
  - [beforeWhere](#beforeWhere)
  - [contains](#contains)
  - [countBy](#countby)
  - [defaults](#defaults)
  - [every](#every)
  - [filter](#filter)
  - [find](#find)
  - [findIndex](#findindex)
  - [findLast](#findlast)
  - [findLastIndex](#findlastindex)
  - [first](#first)
  - [flatten](#flatten)
  - [groupBy](#groupby)
  - [last](#last)
  - [map](#map)
  - [max](#max)
  - [min](#min)
  - [omit](#omit)
  - [orderBy](#orderby)
  - [remove](#remove)
  - [reverse](#reverse)
  - [some](#contains)
  - [sortBy](#orderby)
  - [sum](#sum)
  - [pick](#filter)
  - [pluck](#map)
  - [unique](#unique)
  - [xor](#xor)
- [Object](#object)
  - [keys](#keys)
  - [toArray](#toarray)
  - [parse](#parse)
- [String](#string)
  - [endsWith](#endswith)
  - [ltrim](#ltrim)
  - [repeat](#repeat)
  - [rtrim](#rtrim)
  - [reverse](#reverse)
  - [slugify](#slugify)
  - [startsWith](#startswith)
  - [stringular](#stringular)
  - [stripTags](#striptags)
  - [trim](#trim)
  - [truncate](#truncate)
  - [ucfirst](#ucfirst)
  - [wrap](#wrap)
- [Utils](#utils)
  - [copy](#copy)
  - [dictionary](#dictionary)
  - [equals](#equals)
  - [extend](#extend)
  - [identity](#identity)
  - [forEach](#foreach)
  - [lowercase](#lowercase)
  - [uppercase](#uppercase)
  - [noop](#noop)
  - [toJson](#tojson)
- [Boolean](#boolean)
  - [isArray](#isarray)
  - [isDate](#isdate)
  - [isDefined](#isdefined)
  - [isUndefined](#isundefined)
  - [isString](#isstring)
  - [isObject](#isobject)
  - [isNumber](#isnumber)
  - [isFunction](#isfunction)
  - [isEmpty](#isempty)

#Get Started
**(1)** You can install **agile.js** using 3 different methods:  
- clone & [build](#developing) this repository
- via **[Bower](http://bower.io/)**: by running `$ bower install agile` from your terminal
- via **[npm](https://www.npmjs.org/)**: by running `$ npm install agile` from your terminal
- soon, <i>cdnjs</i> will be one of the options

**(2)** Add to your project:  
**For the Browser:**  
Include `agile.js` (or `agile.min.js`) in your `index.html`.  
```html
<script src="bower_components/agile/dist/agile.js"></script>
```
**For Node Apps:**  
```js
var _ = require('agile');
```
**(3)** Start Playing with agile.js:
```js
var orders = [
  { id: 21, customer: { id: 2, name: 'John P.' }, product: { price: 21.12 }  },
  { id: 22, customer: { id: 1, name: 'Cati P.' }, product: { price: 89.21 }  },
  { id: 23, customer: { id: 1, name: 'Cati P.' }, product: { price: 49.00 }  },
  { id: 24, customer: { id: 3, name: 'Poul S.' }, product: { price: 10.22 }  },
  { id: 25, customer: { id: 4, name: 'Erik L.' }, product: { price: 11.31 }  },
  { id: 26, customer: { id: 4, name: 'Erik L.' }, product: { price: 90.99 }  },
  { id: 27, customer: { id: 2, name: 'Cati P.' }, product: { price: 88.99 }  }
];
_(orders)               // ArrayWrapper
  .map('product.price') // [21.12, 89.21, 49, 10.22, 11.31, 90.99, 88.99]
  .sum()                // 360.84
  .round()              // 361
  .add(10)              // 371
  .value();             // get the value;
```

#Collection
###after
get a collection and specified count, and returns all of the items in the collection after the specified count.  
**Usage:** `_.after(array, count)`
```js
var users = [
    { name: 'foo' },
    { name: 'bar' },
    { name: 'baz' },
    { name: 'zap' }
];

_.after(users, 2);
// → [ { name: 'baz' }, { name: 'zap' } ]
```
###afterWhere
get a collection and `expression`/`callback`, and returns all of the items in the collection after the first that return true, include it.  
**Usage:** `_.afterWhere(array, expression/callback)`
```js
var orders = [
    { id: 1, date: 'Tue Jul 15 2014' },
    { id: 2, date: 'Tue Jul 16 2014' },
    { id: 3, date: 'Tue Jul 17 2014' },
    { id: 4, date: 'Tue Jul 18 2014' },
    { id: 5, date: 'Tue Jul 19 2014' }
];

_.afterWhere(orders, 'date == "Tue Jul 17 2014"');
// → [ orders[2], orders[3], orders[4] ]

_.afterWhere(orders, 'id > 3');
// → [ orders[3], orders[4] ]

_.afterWhere(orders, function(e) { 
    return e.id > 3;
});
// → [ orders[3], orders[4] ]
```
###add
`add` is similar to `Array.push`, but can get a multiple arguments, and return the array instead of the value.  
**Usage:** `_.add(array, args)`
```js
_.add([1,2,3], 4,5,6); // → [1, 2, 3, 4, 5, 6]
```

###before
get a collection and specified count, and returns all of the items in the collection before the specified count.  
**Usage:** `_.before(array, count)`
```js
var users = [
    { name: 'foo' },
    { name: 'bar' },
    { name: 'baz' },
    { name: 'zap' }
];

_.before(users, 2);
// → [ { name: 'foo' }, { name: 'bar' } ]
```
###beforeWhere
get a collection and `expression`/`callback`, and returns all of the items in the collection before the first that return true, including it.  
**Usage:** `_.beforeWhere(array, expression/callback)`
```js
var orders = [
    { id: 1, date: 'Tue Jul 15 2014' },
    { id: 2, date: 'Tue Jul 16 2014' },
    { id: 3, date: 'Tue Jul 17 2014' },
    { id: 4, date: 'Tue Jul 18 2014' },
    { id: 5, date: 'Tue Jul 19 2014' }
];

_.beforeWhere(orders, 'date == "Tue Jul 17 2014"');
// → [ orders[0], orders[1], orders[2] ]

_.beforeWhere(orders, 'id < 3');
// → [ orders[0], orders[1] ]

_.beforeWhere(orders, function(e) { 
    return e.id < 3;
});
// → [ orders[0], orders[1] ]
```
###contains
Checks if given expression(or value) is present in one or more object in the array.  
**Usage:** `_.contains(array, expression/callback/value)`  
**Aliases:** `_.some`
```js
var nums = [1,2,3,4];
_.contains(num, 2); 
// → true

var users = [
  { user: { id: 2, name: 'foo' } },
  { user: { id: 4, name: 'bar' } },
  { user: { id: 6, name: 'baz' } }
];
_.some(users, '!(user.id % 2)');
// → true
_.some(users, '(user.id > 5)');
// → false
```
###countBy
Create an object composed of keys generated from the result of the running expression, each key is the count of objects in each group.  
**Usage:** `_.countBy(array, expression/callback)`
```js
var players = [
  {name: 'Gene',    team: { name: 'alpha' } },
  {name: 'George',  team: { name: 'beta'  } },
  {name: 'Steve',   team: { name: 'gamma' } },
  {name: 'Paula',   team: { name: 'beta'  } },
  {name: 'Scruath', team: { name: 'gamma' } }
];
_.countBy(players, 'team.name');
// → { alpha: 1, beta:  2, gamma:2 }
```
###defaults
defaults allows to specify a default fallback value for properties that resolve to undefined.  
**Usage:** `_.defaults(array, object)`
```js
var orders = [
      { id:1, destination: { zip: 21908 }, name: 'Ariel M' },
      { id:2, name: 'John F' },
      { id:3, destination: { zip: 45841 } },
      { id:4, destination: { zip: 78612 }, name: 'Danno L' }
  ];
var fallback = {
      name: 'Customer name not available',
      destination: { zip: 'Pickup' }
  };
_.defaults(orders, fallback);
// Results:
// [{ id: 1, destination: { zip: 21908 }, name: 'Ariel M' },
// { id: 2, destination: { zip: 'Pickup' }, name: 'John F'  },
// { id: 3, destination: { zip: 45841 }, name: 'Customer name not available' },
// { id: 4, destination: { zip: 78612 }, name: 'Danno L' }]
```
###every
Checks if given expression/callback is present in all members in the array.  
**Usage:** `_.every(array, expression/callback)`
```js
var nums = [1,2,3,4];
_.every(num, 2); 
// → false

var users = [
  { id: 2, name: 'bob' } },
  { id: 4, name: 'bar' } },
  { id: 6, name: 'baz' } }
];
_.every(users, '!(id % 2)');
// → true
_.every(users, 'name.indexOf("ba") != -1');
// → false
```
###filter
filter by `expression/callback` return all elements that return `true`, avoid the rest.  
**Usage:** `_.filter(array, expression/callback)  `
**Aliases:** ` _.pick`
```js
var users = [
  { id: 1, user: { name: 'foo', isAdmin: true  } },
  { id: 2, user: { name: 'bar', isAdmin: false } },
  { id: 3, user: { name: 'baz', isAdmin: true  } }
];
_.pick(users, 'user.isAdmin');
// → [ users[0], users[2] ]
```
###find
Iterate over the given array and return the first member that the `expression` returns truthy for.  
**Usage:** `_.find(array, expression/callback)`
```js
var orders = [
  { id: 21, product: { price: 21.12 }, auth: ['3s!sa0'] },
  { id: 22, product: { price: 89.21 }, auth: ['@3dRg1'] },
  { id: 23, product: { price: 49.00 }, auth: ['a44Fy+'] },
  { id: 24, product: { price: 10.22 }, auth: ['WS4%a0'] },
  { id: 25, product: { price: 11.31 }, auth: ['7Y#d_1'] }
];
_.find(orders, 'product.price > 50'); 
// → { id: 22, product: { price: 89.21 }, auth: ['@3dRg1'] }

_.find(orders, 'auth.indexOf("7Y#d_1") !== -1');
// → { id: 25, product: { price: 11.31 }, auth: ['7Y#d_1'] }

_.find(orders, '!(id%2)');
// → { id: 22, product: { price: 89.21 }, auth: ['@3dRg1'] }
```
###findLast
Iterate over the given array and return the last member that the `expression` returns truthy for.  
**Usage:** `_.findLast(array, expression/callback)`
```js
var orders = [
  { id: 21, product: { price: 21.12 }, auth: ['3s!sa0'] },
  { id: 22, product: { price: 89.21 }, auth: ['@3dRg1'] },
  { id: 23, product: { price: 49.00 }, auth: ['7Y#d_1'] },
  { id: 24, product: { price: 10.22 }, auth: ['WS4%a0'] },
  { id: 25, product: { price: 91.31 }, auth: ['7Y#d_1'] }
];
_.findLast(orders, 'product.price > 50'); 
// → { id: 25, product: { price: 91.31 }, auth: ['7Y#d_1'] }

_.findLast(orders, 'auth.indexOf("7Y#d_1") !== -1');
// → { id: 25, product: { price: 91.31 }, auth: ['7Y#d_1'] }

_.findLast(orders, '!(id%2)');
// → { id: 24, product: { price: 10.22 }, auth: ['WS4%a0'] }
```
###findIndex
Iterate over the given array and return the **index** of the first member that the `expression` returns truthy for.  
**Usage:** `_.findIndex(array, expression/callback)`
```js
var orders = [
  { id: 21, product: { price: 21.12 }, auth: ['3s!sa0'] },
  { id: 22, product: { price: 89.21 }, auth: ['@3dRg1'] },
  { id: 23, product: { price: 49.00 }, auth: ['a44Fy+'] },
  { id: 24, product: { price: 10.22 }, auth: ['WS4%a0'] },
  { id: 25, product: { price: 11.31 }, auth: ['7Y#d_1'] }
];
_.findIndex(orders, 'product.price > 50');            // → 1
_.findIndex(orders, 'auth.indexOf("7Y#d_1") !== -1'); // → 4
```
###findLastIndex
Iterate over the given array and return the **index** of the last member that the `expression` returns truthy for.  
**Usage:** `_.findLastIndex(array, expression/callback)`
```js
var orders = [
  { id: 21, product: { price: 21.12 }, auth: ['3s!sa0'] },
  { id: 22, product: { price: 89.21 }, auth: ['@3dRg1'] },
  { id: 23, product: { price: 49.00 }, auth: ['a44Fy+'] },
  { id: 24, product: { price: 90.22 }, auth: ['a44Fy+'] },
  { id: 25, product: { price: 11.31 }, auth: ['7Y#d_1'] }
];
_.findLastIndex(orders, 'product.price > 50');             // → 3
_.findLastIndex(orders, 'auth.indexOf("a44Fy+") !== -1');  // → 3
```

###first
Gets the first element **or** first `n` elements of an array.  
if expression is provided, is returns as long the expression return truthy.  
**Usage:** See below 
```js
var users = [
  { id: 1, user: { name: 'foo', isAdmin: true  } },
  { id: 2, user: { name: 'bar', isAdmin: false } },
  { id: 3, user: { name: 'baz', isAdmin: true  } }
];
// Returns the first user
_.first(users);
// → { id: 1, user: { name: 'foo', isAdmin: true  } }

// Return the first user whose not `admin`
_.first(users, '!user.isAdmin');
// → [{ id: 2, user: { name: 'bar', isAdmin: false } }]

// Returns the first 2 users
_.first(users, 2);
// → [users[0], users[1]]

// Returns the first 2 `admin` users 
_.first(users, 2, 'user.isAdmin');
// → [users[0], users[2]]
```
###flatten
Flattens a nested array (the nesting can be to any depth).  
if `shallow` set to true, the array will only be flattened a one level.
**Usage:** `_.flatten(array, shallow[optional])`
```js
_.flatten(['out', ['out', ['in']], ['out', 'out', ['in', 'in']], ['out', 'out']], true);
// → ['out', 'out', ['in'], 'out', 'out', ['in', 'in'], 'out', 'out']

_.flatten([[], 1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, [12, [[[[[13], [[[[14, 15]]]]]]]]]]]]]));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
```
###groupBy
Get a collection, `expression/callback` and return an object composed of keys generated from the result of running each members in the collection on the `expression`.  
each key is an array contains the results members.  
**Usage:** `_.groupBy(array, expression)`
```js
var players = [
  {name: 'Gene',    team: { name: 'alpha' } },
  {name: 'George',  team: { name: 'beta'  } },
  {name: 'Steve',   team: { name: 'gamma' } },
  {name: 'Paula',   team: { name: 'beta'  } },
  {name: 'Scruath', team: { name: 'gamma' } }
];
_.groupBy(players, 'team.name');
// { 
//  alpha: [{name: 'Gene',    team: { name: 'alpha' } }],
//  betta: [{name: 'George',  team: { name: 'beta'  } }, {name: 'Paula',   team: { name: 'beta'  } }],
//  gamma: [{name: 'Steve',   team: { name: 'gamma' } }, {name: 'Scruath', team: { name: 'gamma' } }]
// }
```
###last
Gets the last element **or** last `n` elements of an array.  
if expression is provided, is returns as long the expression return truthy.  
**Usage:** See below 
```js
var users = [
  { id: 1, user: { name: 'foo', isAdmin: true  } },
  { id: 2, user: { name: 'bar', isAdmin: false } },
  { id: 3, user: { name: 'baz', isAdmin: false } },
  { id: 4, user: { name: 'zak', isAdmin: true  } }
];
// Returns the last user
_.last(users);
// → { id: 4, user: { name: 'zak', isAdmin: true  } }

// Return the last user whose not `admin`
_.last(users, '!user.isAdmin');
// → [{ id: 3, user: { name: 'baz', isAdmin: false } }]

// Returns the last 2 users
_.last(users, 2);
// → [users[2], users[3]]

// Returns the last 2 `admin` users 
_.last(users, 2, 'user.isAdmin');
// → [users[0], users[3]]
```
###map
Returns a new Array with the results of each expression execution.  
**Usage:** `_.map(array, expression)`  
**Aliases:** `_.pluck`
```js
var users = [
  { id:1, user: { name: 'Foo' } },
  { id:2, user: { name: 'Bar' } },
  { id:3, user: { name: 'Baz' } }
];
_.map(users, 'user.name');
// → ['Foo', 'Bar', 'Baz']

_.map(users, 'id <= 2 ? id : 0')
// → [1, 2, 0]
```
###max
Find and return the largest number in a given array.  
if an `expression` is provided, will return max value by expression.  
**Usage:** `_.max(array)`
```js
_.max([1,2,3,4,7,8,9]) // → 9

//By expression
var users = [
  { name: 'foo', score: 89 },
  { name: 'bar', score: 32 },
  { name: 'baz', score: 49 }
];
_.max(users, 'score'); // → { name: 'foo', score: 89 }

//Chaining example
var users = [
  { player: { ... }, score: 891 },
  { player: { ... }, score: 121 },
  { player: { ... }, score: 641 },
  { player: { ... }, score: 491 }
]
_(users)
  .map('score')
  .max()
  .value() // → 891
```
###min
Find and return the lowest number in a given array.  
if an `expression` is provided, will return min value by expression.  
**Usage:** `_.min(array)`
```js
_.min([1,2,3,4,7,8,9]) // → 1

//By expression
var users = [
  { user: { score: 197 } },
  { user: { score: 212 } },
  { user: { score: 978 } },
  { user: { score: 121 } }
];
_.min(users, 'user.score') // → { user: { score: 121 } }

//Chaining example
var users = [
  { player: { ... }, score: 891 },
  { player: { ... }, score: 121 },
  { player: { ... }, score: 641 },
  { player: { ... }, score: 491 }
]
_(users)
  .map('score')
  .min()
  .value() // → 121
```
###omit
Get an array, and return a new array without the omitted members(by `expression`).  
**Usage:** `_.omit(array, expression)`
```js
var users = [
  { id: 1, name: 'foo' },
  { id: 2, name: 'bar' },
  { id: 3, name: 'baz' }
];
_.omit(users, 'id > 2 && !name.indexOf("ba")');
// → [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]
```
###orderBy
Orders a specified array by the expression predicate.  
It is ordered alphabetically for strings and numerically for numbers.  
**Usage:** `_.orderBy(array, expression/callback, reverse[optional])`  
**Aliases:** `_.sortBy`
```js
var orders = [
  { id: 1, product: { price: 21.12 }, date: new Date('01/01/2014') },
  { id: 2, product: { price: 99.21 }, date: new Date('01/01/2014') },
  { id: 3, product: { price: 99.90 }, date: new Date('01/01/2013') },
  { id: 4, product: { price: 99.99 }, date: new Date('01/01/1970') }
];

_.orderBy(orders, 'date');
// → [orders[3], orders[2], orders[1], orders[0]];

_.orderBy(orders, '+product.price');
// → [orders[0], orders[1], orders[2], orders[3]];

_.orderBy(orders, '-product.price');
// → [orders[3], orders[2], orders[1], orders[0]]

_.orderBy(orders, ['-date', '-id']);
// → [orders[1], orders[0], orders[2], orders[3]]

_.orderBy([5,1,4,3,2]);           // → [1, 2, 3, 4, 5]
_.orderBy([5,1,4,3,2], '-');      // → [5, 4, 3, 2, 1]
.orderBy([5,1,4,3,2], '-', true); // → [1, 2, 3, 4, 5]

// sort by multiple arguments
_.orderBy([{a:1, b:10}, {a:1, b:4}, {a:0, b:5}], ['a', 'b']);
// → [{ a:0, b:5 }, { a:1, b:4 }, { a:1, b:10 }]
```

###remove
remove specific members from array by equality.  
**Usage:** `_.remove(array, args)`
```js
var collection = [
  { name: 'bar' },
  { name: 'foo' },
  null, 1
];
_.remove(collection, { name: 'foo' }, null, 1);
// → [{ name: 'bar' }]
```
###reverse
Reverses a string or array(doesn't change the source array).  
**Usage:** `_.reverse(array/string)`
```js
_.reverse([1,2,3]) // → [3, 2, 1]
_.reverse('agile') // → eliga
```
###sum
Sum up all values within an array.  
**Usage:** `_.sum(array)`
```js
_.sum([1,2,3,4,5]) // → 15

//Chainig example
var scores = [
  { player: { ... }, score: 891 },
  { player: { ... }, score: 121 },
  { player: { ... }, score: 641 },
  { player: { ... }, score: 491 }
];
_(scores)
  .map('score')
  .sum()
  .value(); // → 2144
```
###unique
Get an array and filter duplicate members.  
if `expression` is provided it's filters by this `expression` as unique identifier.  
**Usage:** `_.unique(array, expression[optional])`  
**Aliases:** `uniq`
```js
_.unique([12,3,4,12,4,5,6]) 
// → [12, 3, 4, 5, 6]

var orders = [
  { id:1, customer: { name: 'John',    id: 10 } },
  { id:2, customer: { name: 'William', id: 20 } },
  { id:3, customer: { name: 'John',    id: 10 } },
  { id:4, customer: { name: 'William', id: 20 } },
  { id:5, customer: { name: 'Clive',   id: 30 } }
];
_.unique(orders, 'customer.id');
// Results:
// [{ id:1, customer: { name: 'John',    id: 10 } },
//  { id:2, customer: { name: 'William', id: 20 } },
//  { id:5, customer: { name: 'Clive',   id: 30 } }]

//Chaining Example:
_(orders)
  .unique('customer.id')
  .map('customer.name')
  .join(', ')
  .value(); // → John, William, Clive
```
###xor
Exclusive or filter by expression.  
**Usage:** `_.xor(arr1, arr2, expression[optional])`
```js
_.xor([2,3,4], [3,4,5]);
// → [2, 5]

//Example with expression:
var users1 = [
  { id: 0, details: { first_name: 'foo', last_name: 'bar' } }, 
  { id: 1, details: { first_name: 'foo', last_name: 'baz' } },
  { id: 2, details: { first_name: 'foo', last_name: 'bag' } }
];
var users2 = [
  { id: 3, details: { first_name: 'foo', last_name: 'bar' } },
  { id: 4, details: { first_name: 'foo', last_name: 'baz' } }
];
_.xor(users1, users2, 'details.last_name');
// → [{ id: 2, details: { first_name: 'foo', last_name: 'bag' } }]
```

#Object
###toArray
Convert objects into stable arrays.  
if addKey set to true,the filter also attaches a new property `$key` to the value containing the original key that was used in the object we are iterating over to reference the property.  
**Usage:** `_.toArray(object, boolean[optional])`
```js
var users = {
  0: { name: 'Ariel', age: 25 },
  1: { name: 'Dan',   age: 21 },
  2: { name: 'John',  age: 31 }
};
_.toArray(users);
// → [{name:'Ariel', age:25}, {name:'Dan', age:21}, {name:'John', age:31}]

//Chaining example
_({
  Ariel: { age: 25 },
  Dan  : { age: 21 },
  John : { age: 31 }
}).toArray(true)
  .value(); // → [{$key:'Ariel', age:25}, {$key:'Dan', age:21}, {$key:'John', age:31}]
```
###keys
Creates an array composed of the own enumerable property names of an object.  
if `nested` set to true, it will return the properties in a recursively nested style(used mainly with `parse.setter`, `parse.getter`).  
**Usage:** `_.keys(object, nested[optional])`
```js
var user = { 
  name: 'Ariel M', 
  age: 26, 
  permissions: { isAdmin: true }, 
  details: { address: { city: 'Tel Aviv', zip: 61019 } }
};
_.keys(user); 
// → ['name', 'age', 'permissions', 'details']

_.keys(user, true);
// → ['name', 'age', 'permissions.isAdmin', 'details.address.city', 'details.address.zip']
```
###parse
Convert `expression` into function.  
**Usage:** `_.parse(expression)`  
**Returns:** `Function(context, local)`  
`context`**:** an object against which any expressions embedded in the strings are evaluated against.  
`local`**:** local variables context object, useful for overriding values in context.  
**Note:** The returned function also has the following properties:  
`literal` : whether the expression's top-level node is a JavaScript literal.  
`constant`: whether the expression is made entirely of JavaScript constant literals.  
`assign`  : `{?function(context, value)}` – if the expression is assignable, this will be set to a function to change its value on the given context.
```js
//Simple getter / setter functions
var user = { 
  name: 'Ariel M.', 
  age : 26, 
  details: { address: { city: 'Tel Aviv', zip: 61019 } }
};
var nameGetter = _.parse('name');
var nameSetter = nameGetter.assign;

nameGetter(user); // → 'Ariel M.'
nameSetter(user, 'Dan T.');
nameGetter(user); // → 'Dan T.'

//Example use local(override) object
var local = {
  age: 50,
  sayHello: function(name, age) { 
    return 'Hello ' + name + ' I\'m '+ age + ' years old.' 
  }
};
_.parse('sayHello(name, age)')(user, local);
// → Hello Ariel M. I'm 50 years old.

_.parse('[1,2]').literal    // → true
_.parse('[1 + 1]').constant // → true
_.parse('[x + 1]').constant // → false
```

#String
###endsWith
return whether string ends with the ends parameter.  
**Usage:** `_.endsWith(string, end, case-sensitive[optional])`
```js
_.endsWith('image.JPG', '.jpg'); // → true

_.endsWith('image.JPG', '.jpg', true); // → false
```
###ltrim
Left trim. Similar to `trim`, but only for left side.  
**Usage:** `_.ltrim(string, chars[optional])`
```js
_.ltrim('   foo   ') // → 'foo   '
_.ltrim('barfoobar', 'bar') // → 'foobar'
```
###rtrim
Reft trim. Similar to `trim`, but only for right side.  
**Usage:** `_.rtrim(string, chars[optional])`
```js
_.rtrim('   foo   ') // → '   foo'
_.rtrim('barfoobar', 'bar') // → 'barfoo'
```
###repeat
Repeats a string n times(**fast**).  
**Usage:** `_.repeat(string, n)`
```js
_.repeat('*',10); // → '**********'
_.repeat('foo');  // → 'foo'
```
###slugify
Transform text into a URL slug. Replaces whitespaces, with dash("-") or given argument.  
**Usage:** `_.slugify(input, sub[optional])`
```js
_.slugify('Some string with spaces'); // → 'some-string-with-spaces'
_.slugify('Some string with hashtags', '#'); // → 'some#string#with#hashtags'
```
###startsWith
return whether `string` starts with the starts parameter.  
**Usage:** `_.startsWith(str, case-sensitive[optional])`
```js
_.startsWith('Lorem ipsum', 'Lor'); // → true

//Chaining example:
_('Lorem ipsum')
  .startsWith('lor', true); // → false
```
###stringular
get string with `{n}` and replace matches with enumeration values.  
**Usage:** `_.stringular(str, args...)`
```js
_.stringular('lorem {0} dolor {1} amet', 'ipsum', 'sit'); 
// → 'lorem ipsum dolor sit amet'

_.stringular('{3} {0} dolor {1} amet', 'ipsum', 'sit', null, 'lorem');
// → 'lorem ipsum dolor sit amet'
```
###stripTags
strip out `html` tags from string.  
**Usage:** `_.stripTags(string)`
```js
_.stripTags('<div id="fr" class="paragraph">foo<br/></div>');
// → 'foo'

//Chaining example
_('<p class="paragraph">Lorem Ipsum...</p>')
  .stripTags()
  .value(); // → 'Lorem Ipsum...'
```
###trim
Strip whitespace (or other characters) from the beginning and end of a string.  
**Usage:** `_.trim(string, chars[optional])`
```js
_.trim('foobarfoo', 'foo'); // → 'bar'
_.trim('   foo   '); // → 'foo'
```
###truncate
truncates a string given a specified length, providing a custom string to denote an omission.  
**Usage:** `_.truncate(str, length, suffix[optional], preserve[optinal])`
```js
var text = 'lorem ipsum dolor sit amet';

_.truncate(text, 13, '...', true); // → 'lorem ipsum dolor...'
_.truncate(text, 13, '...');       // → 'lorem ipsum d...'
_.truncate(text, 50, '...');       // → 'lorem ipsum dolor sit amet'
```
###ucfirst
upper case first char.  
**Usage:** `_.ucfirst(string)`
```js
_.ucfirst('ariel mashraki'); // → 'Ariel Mashraki'

//Chaining example
_(['ariel', 'dan', 'john'])
  .join(', ')
  .ucfirst()
  .value(); // → 'Ariel, Dan, John'
```
###wrap
Wrap a string with another string.  
**Usage:** `_.wrap(string, start, end[optional])`
```js
_.wrap('foo', 'bar');          // → 'barfoobar'
_.wrap('text', '<p>', '</p>'); // → '<p>text</p>'

//Chaining example:
_(['ariel', 'dan', 'john'])
  .join(', ')
  .ucfirst()
  .wrap('Team members: ', ' ')
  .value(); // → 'Team members: Ariel, Dan, John'
```
#Utils
###copy
Creates a recursive copy of `source` object into `dest` object, could be an object or an array.  
**Usage:** `_.copy(src, dst)`
```js
var a = [1,2,3, { a: 1, b: 2 }];
var b;
_.copy(a, b);

//Test result
_.equals(a, b); // → true
```
###dictionary
Creates a new object without a prototype.  
**Usage:** `_.dictionary()`
```js
var map = _.dictionary();
console.log(map.toString); // → undefined
```
###equals
Determines if two objects or two values are equivalent.  
**Usage:** `_.equals(o1, o2)`
```js
_.equals({}, {});                   // → true
_.equals(new Date(), new Date());   // → true
_.equals(/\//g, new RegExp(/\//g)); // → true
```
###extend
Extends the destination object `dst` by copying own enumerable properties from the `src` object(s) to `dst`. You can specify multiple `src` objects.  
**Usage:** `_.extend(dst, arg...)`
```js
_.extend({a:1}, {b:2}, {a:3, c: 4}); // → {a: 3, b: 2, c: 4}
```
###identity
`identity` function returns its first argument.  
**Usage:** `_.identity(val)`
```js
_.identity(1); // → 1
```
###forEach
Invokes an `iterator` function once for each member in a collection(object, array).  
The `iterator` function is invoked with (value, key/index, obj/array).  
**Usage:** `_.forEach(collection, iteratorFn, context[optional]);`
###noop
A function that performs no operations.  
**Usage:** `_.noop()`
```js
function fn(cb) {
 //...
 return (cb || _.noop)(args);
}
```
