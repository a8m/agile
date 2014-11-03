#agile.js - WIP [![Build Status](https://travis-ci.org/a8m/agile.svg?branch=master)](https://travis-ci.org/a8m/agile) [![Coverage Status](https://img.shields.io/coveralls/a8m/agile.svg)](https://coveralls.io/r/a8m/agile?branch=master)

- [Collection](#collection)
  - [after](#after)
  - [afterWhere](#afterwhere)
  - [before](#before)
  - [beforeWhere](#beforeWhere)


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
