#agile.js - WIP [![Build Status](https://travis-ci.org/a8m/agile.svg?branch=master)](https://travis-ci.org/a8m/agile) [![Coverage Status](https://img.shields.io/coveralls/a8m/agile.svg)](https://coveralls.io/r/a8m/agile?branch=master)

- [Collection](#collection)
  - [after](#after)
  - [afterWhere](#afterwhere)
  - [before](#before)
  - [beforeWhere](#beforeWhere)
  - [contains](#contains)
  - [countBy](#countby)
  - [defaults](#defaults)
  - [every](#every)
  - [filter](#filter)
  - [first](#first)
  - [some](#contains)
  - [pick](#filter)


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
_.first(users);
// → { id: 1, user: { name: 'foo', isAdmin: true  } }

_.first(users, '!user.isAdmin');
// → [{ id: 2, user: { name: 'bar', isAdmin: false } }]

_.first(users, 2);
// → [users[0], users[1]]

_.first(users, 2, 'user.isAdmin');
// → [users[0], users[2]]
```
