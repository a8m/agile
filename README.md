#agile.js - WIP [![Build Status](https://travis-ci.org/a8m/agile.svg?branch=master)](https://travis-ci.org/a8m/agile) [![Coverage Status](https://img.shields.io/coveralls/a8m/agile.svg)](https://coveralls.io/r/a8m/agile?branch=master)

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
  - [first](#first)
  - [flatten](#flatten)
  - [groupBy](#groupby)
  - [last](#last)
  - [map](#map)
  - [max](#max)
  - [min](#min)
  - [omit](#omit)
  - [remove](#remove)
  - [reverse](#reverse)
  - [some](#contains)
  - [sum](#sum)
  - [pick](#filter)
  - [pluck](#map)
  - [unique](#unique)
  - [xor](#xor)
- [String](#string)
  - [endsWith](#endswith)
  - [ltrim](#ltrim)
  - [repeat](#repeat)
  - [rtrim](#rtrim)
  - [reverse](#reverse)


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

