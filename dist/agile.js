/**
 * Like Underscore, but with zero callbacks and really more fun
 * @version v0.0.2 - 2014-11-15 * @link https://github.com/a8m/agile
 * @author Ariel Mashraki <ariel@mashraki.co.il>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function ( context, undefined ) {
'use strict';

/**
 * @description
 * generate error message
 * @param {string} module The namespace to use for the new minErr instance.
 * @param {function} ErrorConstructor Custom error constructor to be instantiated when returning
 *   error from returned function, for cases when a particular type of error is useful.
 * @returns {function(code:string, template:string, ...templateArgs): Error} minErr instance
 */

function minErr(module, ErrorConstructor) {
  ErrorConstructor = Error;
  return function (input) {
    var args = Array.prototype.slice.call(arguments, 1);
    var template = '[' + module + ':]' +
      input.replace(/{(\d+)}/g, function (match, number) {
        return isUndefined(args[number]) ? match : args[number];
      });
    return ErrorConstructor(template);
  };
}

/**
 * @private
 * @description
 * function that get a value and return another function
 * that return this value
 * @example
 * 1. valueFn(function (e) { return e; })() ==> function (e) { return e }
 * 2. valueFn(e)()                          ==> e
 * @param value
 * @returns {Function}
 */
function valueFn(value) {return function() {return value;};}

/**
 *
 * @param {Object|Array} obj Object to iterate over.
 * @param {Function} iterator Iterator function.
 * @param {Object=} context Object to become context (`this`) for the iterator function.
 * @returns {Object|Array} Reference to `obj`.
 */

function forEach(obj, iterator, context) {
  var key, length;
  if (obj) {
    if (isFunction(obj)) {
      for (key in obj) {
        // Need to check if hasOwnProperty exists,
        // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
        if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (isArray(obj) || isArrayLike(obj)) {
      var isPrimitive = typeof obj !== 'object';
      for (key = 0, length = obj.length; key < length; key++) {
        if (isPrimitive || key in obj) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    } else if (obj.forEach && obj.forEach !== forEach) {
      obj.forEach(iterator, context, obj);
    } else {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator.call(context, obj[key], key, obj);
        }
      }
    }
  }
  return obj;
}

/**
 * @description
 * return the first n element of an array,
 * if expression provided, is returns as long the expression return truthy
 * @param array
 * @param n {number}
 * @param expression {$parse}
 * @return array or single object
 */
function getFirstMatches(array, n, expression) {
  var count = 0;

  return array.filter(function(elm) {
    var rest = isDefined(expression) ? (count < n && expression(elm)) : count < n;
    count = rest ? count+1 : count;

    return rest;
  });
}

/**
 * @description
 * gets method name, array and expression
 * @param method {String}
 * @param array {Array}
 * @param exp {String} expression to parse
 * @returns {Number}
 */
function indexByMath(method, array, exp) {
    var mappedArray = array.map(function(elm){
        return $parse(exp)(elm);
    });
    return mappedArray.indexOf(Math[method].apply(Math, mappedArray));
}

//Parse Dependencies
var $parseMinErr = minErr('$parse');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var NODE_TYPE_ELEMENT = 1;

/**
 * @param {*} obj
 * @return {boolean} Returns true if `obj` is an array or array-like object (NodeList, Arguments, String ...)
 */
function isArrayLike(obj) {
    if (obj == null || isWindow(obj)) {
        return false;
    }

    var length = obj.length;

    if (obj.nodeType === NODE_TYPE_ELEMENT && length) {
        return true;
    }

    return isString(obj) || isArray(obj) || length === 0 ||
        typeof length === 'number' && length > 0 && (length - 1) in obj;
}
/**
 * @private
 * @param obj
 * @returns {*|boolean}
 */
function isWindow(obj) {
    return obj && obj.window === obj;
}

/**
 * @description
 * Iterate over the given array and return the first member that the getterFn
 * returns true, if `isIndex` set to `true`, return the index.
 * @param array
 * @param getterFn
 * @param isIndex
 * @returns {*}
 */
function findInArray(array, getterFn, isIndex) {

  var index = -1;
  var res;

  while(++index < array.length) {
    if(getterFn(array[index])) {
      res = isIndex ? index : array[index];
      break;
    }
  }

  return res;
}
/**
 * @name after-where
 * @kind function
 *
 * @description
 * get a an array and $parse:expression, and returns all of the items
 * in the array after the first that return true, include it.
 *
 */
function afterWhere(array, exp) {

  if(!isArray(array) || isUndefined(exp))
    return array;

  var index = array.map(function(elm) {
    return $parse(exp)(elm);
  }).indexOf(true);

  return array.slice((index === -1) ? 0 : index);
}
/**
 * @name after
 * @kind function
 *
 * @description
 * get an array and specified count, and returns all of the items
 * in the collection after the specified count.
 *
 */
function after(array, count) {
  return (isArray(array)) ?
    array.slice(count) :
    array;
}
/**
 * @ngdoc filter
 * @name before-where
 * @kind function
 *
 * @description
 * get an array and $parse:expression, and returns all of the items
 * in the array before the first that return true.
 */

function beforeWhere(array, exp) {
  if(!isArray(array) || isUndefined(exp))
    return array;

  var index = array.map(function(elm) {
    return $parse(exp)(elm);
  }).indexOf(true);

  return array.slice(0, (index === -1) ? array.length : ++index);
}
/**
 * @name before
 * @kind function
 *
 * @description
 * get a array and specified count, and returns all of the items
 * in the array before the specified count.
 */

function before(array, count) {
  return (isArray(array)) ?
    array.slice(0, (!count) ? count : --count) :
    array;
}

/**
 * @name contains
 * @kind function
 *
 * @description
 * Checks if given exp is present in one or more object in the array
 * aliases: _.some
 */

function contains(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return true;
  }

  return array.some( function(elm) {
    return (isObject(elm) || isFunction(exp)) ?
      $parse(exp)(elm) :
      elm === exp;
  });
}
/**
 * @name countBy
 * @kind function
 *
 * @description
 * Gets an array and $parse:expression,
 * and returns a count for the number of objects in each group.
 */

function countBy(array, exp) {

  var result = {},
    prop;

  if(!isArray(array) || isUndefined(exp)) {
    return array;
  }

  array.forEach( function(elm) {
    prop = $parse(exp)(elm);

    if(!result[prop]) {
      result[prop] = 0;
    }

    result[prop]++;
  });

  return result;
}
/**
 * @name defaults
 * @kind function
 *
 * @description
 * defaults allows to specify a default fallback value for properties that resolve to undefined.
 */

function defaults(array, defaults) {

  if(!isArray(array) || !isObject(defaults)) {
    return array;
  }
  //get defaults keys(include nested).
  var keys = deepKeys(defaults);

  array.forEach(function(elm) {
    //loop through all the keys
    keys.forEach(function(key) {
      var getter = $parse(key);
      var setter = getter.assign;
      //if it's not exist
      if(isUndefined(getter(elm))) {
        //get from defaults, and set to the returned object
        setter(elm, getter(defaults))
      }
    });
  });

  return array;
}
/**
 * @name every
 * @kind function
 *
 * @description
 * Checks if given exp is present in all members in the array
 */
function every(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return true;
  }

  return array.every(function(elm) {
    return (isObject(elm) || isFunction(exp))
      ? $parse(exp)(elm)
      : elm === exp;
  });

}
/**
 * @name filter
 * @kind function
 *
 * @description
 * filter by $parse:expression,
 * return all elements that return true, avoid the rest
 */
function filter(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return array;
  }

  return array.filter(function(elm) {
    return (isObject(elm) || isFunction(exp))
      ? $parse(exp)(elm)
      : elm === exp;
  });
}
/**
 * @name findIndex
 * @kind function
 *
 * @description
 * Iterate over the given array and return the index of the first member that the expression
 * returns truthy for
 */
function findIndex(array, exp) {
  return (isArray(array) && isDefined(exp))
    //return the the index of the member
    ? findInArray(array, $parse(exp), true)
    : array;
}

/**
 * @name findLastIndex
 * @kind function
 *
 * @description
 * Iterate over the given array and return the index of the last member that the expression
 * returns truthy for
 */
function findLastIndex(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return array;
  }
  //return the the index of the last member
  var index = (array.length - 1) - findInArray(reverse(array), $parse(exp), true);
  //if it's a NaN
  return index === index ? index : -1;
}

/**
 * @name findLast
 * @kind function
 *
 * @description
 * Iterate over the given array and return the last member that the expression
 * returns truthy for,
 */
function findLast(array, exp) {
  return (isArray(array) && isDefined(exp))
    //return the member and not an array like `last`
    ? findInArray(reverse(array), $parse(exp), false)
    : array;
}

/**
 * @name find
 * @kind function
 *
 * @description
 * Iterate over the given array and return the first member that the expression
 * returns truthy for,
 */
function find(array, exp) {
  return (isArray(array) && isDefined(exp))
    //return the member and not an array like `first`
    ? findInArray(array, $parse(exp), false)
    : array;
}

/**
 * @name first
 * @kind function
 *
 * @description
 * Gets the first element or first `n` elements of an array
 * if expression is provided, is returns as long the expression return truthy
 */
function first(array) {

  var n,
    getter,
    args;

  if(!isArray(array)) {
    return array;
  }

  args = Array.prototype.slice.call(arguments, 1);
  n = (isNumber(args[0])) ? args[0] : 1;
  getter = (!isNumber(args[0]))  ? args[0] : (!isNumber(args[1])) ? args[1] : undefined;

  return (args.length) ? getFirstMatches(array, n,(getter) ? $parse(getter) : getter) :
    array[0];
}
/**
 * @name flatten
 * @kind function
 *
 * @description
 * Flattens a nested array (the nesting can be to any depth).
 * If shallow, the array will only be flattened a one level
 */
function flatten(array, shallow) {

  shallow = shallow || false;

  if(!isArray(array)) {
    return array;
  }

  return (!shallow) ? depthFlatten(array, 0) :
    [].concat.apply([], array);
}

/**
 * flatten nested array (the nesting can be to any depth).
 * @param array {Array}
 * @param i {int}
 * @returns {Array}
 * @private
 */
function depthFlatten(array, i) {
  i = i || 0;

  if(i >= array.length)
    return array;

  if(isArray(array[i])) {
    return depthFlatten(array.slice(0,i)
      .concat(array[i], array.slice(i+1)), i);
  }
  return depthFlatten(array, i+1);
}
/**
 * @name groupBy
 * @kind function
 *
 * @description
 * Create an object composed of keys generated from the result of running each element of a array,
 * each key is an array contains the results members.
 */
function groupBy(array, property) {
  var result = {},
      prop,
      getter = $parse(property);

  if(!isArray(array) || isUndefined(property)) {
    return array;
  }

  forEach(array, function(elm) {
    prop = getter(elm);

    if(!result[prop]) {
      result[prop] = [];
    }

    result[prop].push(elm);
  });

  return result;
}
/**
 * @name last
 * @kind function
 *
 * @description
 * Gets the last element or last n elements of an array
 * if expression is provided, is returns as long the expression return truthy
 */
function last(array) {

  var n,
    getter,
    args,
    reversed;

  if(!isArray(array)) {
    return array;
  }

  //cuz reverse change our src array
  //and we don't want side effects
  reversed = array.slice();

  args = Array.prototype.slice.call(arguments, 1);
  n = (isNumber(args[0])) ? args[0] : 1;
  getter = (!isNumber(args[0]))  ? args[0] : (!isNumber(args[1])) ? args[1] : undefined;

  return (args.length) ?
    //send reversed array as arguments, and reverse it back as result
    getFirstMatches(reversed.reverse(), n,(getter) ? $parse(getter) : getter).reverse() :
    //get the last element
    reversed[reversed.length-1];
}

/**
 * @name map
 * @kind function
 *
 * @description
 * Returns a new Array with the results of each expression execution.
 */
function map(array, expression) {

  if(!isArray(array) || isUndefined(expression)) {
    return array;
  }

  return array.map(function (elm) {
    return $parse(expression)(elm);
  });
}
/**
 * @name max
 * @kind function
 *
 * @description
 * Math.max will get an array return the max value. if an expression
 * is provided, will return max value by expression.
 */
function max(input, expression) {
    if(!isArray(input)) {
        return input;
    }
    return isUndefined(expression)
        ? Math.max.apply(Math, input)
        : input[indexByMath('max', input, expression)]
}

/**
 * @ngdoc filter
 * @name min
 * @kind function
 *
 * @description
 * Math.min will get an array return the min value. if an expression
 * is provided, will return min value by expression.
 */
function min(input, expression) {
  if(!isArray(input)) {
    return input;
  }
  return isUndefined(expression)
    ? Math.min.apply(Math, input)
    : input[indexByMath('min', input, expression)]
}

/**
 * @name omit
 * @kind function
 *
 * @description
 * get an array, and return a new array without the omitted objects(by expression).
 */
function omit(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return array;
  }

  return array.filter(function(elm) {
    return (isObject(elm) || isFunction(exp))
      ? !$parse(exp)(elm)
      : elm !== exp;
  });
}
/**
 * @name orderBy
 * @kind function
 * fork of AngularJS#orderByFilter
 *
 * @description
 * Orders a specified array by the expression predicate.
 * It is ordered alphabetically for strings and numerically for numbers.
 */
function orderBy(array, sortPredicate, reverseOrder) {
  if (!isArrayLike(array)) {
    return array;
  }
  sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate];
  if (sortPredicate.length === 0) { sortPredicate = ['+']; }
  sortPredicate = sortPredicate.map(function(predicate) {
    var descending = false;
    var get = predicate || value;
    if (isString(predicate)) {
      if ((predicate.charAt(0) == '+' || predicate.charAt(0) == '-')) {
        descending = predicate.charAt(0) == '-';
        predicate = predicate.substring(1);
      }
      if (predicate === '') {
        // Effectively no predicate was passed so we compare identity
        return reverseComparator(function(a, b) {
          return compare(a, b);
        }, descending);
      }
      get = $parse(predicate);
      if (get.constant) {
        var key = get();
        return reverseComparator(function(a, b) {
          return compare(a[key], b[key]);
        }, descending);
      }
    }
    return reverseComparator(function(a, b) {
      return compare(get(a),get(b));
    }, descending);
  });
  var arrayCopy = [];
  for (var i = 0; i < array.length; i++) { arrayCopy.push(array[i]); }
  return arrayCopy.sort(reverseComparator(comparator, reverseOrder));

  function comparator(o1, o2) {
    for (var i = 0; i < sortPredicate.length; i++) {
      var comp = sortPredicate[i](o1, o2);
      if (comp !== 0) break;
    }
    return comp;
  }
  function reverseComparator(comp, descending) {
    return descending
      ? function(a, b) {return comp(b,a);}
      : comp;
  }
  function compare(v1, v2) {
    var t1 = typeof v1;
    var t2 = typeof v2;
    if (t1 == t2) {
      if (isDate(v1) && isDate(v2)) {
        v1 = v1.valueOf();
        v2 = v2.valueOf();
      }
      if (t1 == "string") {
        v1 = v1.toLowerCase();
        v2 = v2.toLowerCase();
      }
      if (v1 === v2) return 0;
      return v1 < v2 ? -1 : 1;
    } else {
      return t1 < t2 ? -1 : 1;
    }
  }
}
/**
 * @name remove
 * @kind function
 *
 * @description
 * remove specific members from array by equality
 */
function remove(array) {
  
  var args = Array.prototype.slice.call(arguments, 1);

  if(!isArray(array) || isEmpty(args)) {
    return array;
  }

  return array.filter(function(member) {
    return !args.some(function(nest) {
      return equals(nest, member);
    })
  });

}
/**
 * @name reverse
 * @kind function
 *
 * @description
 * Reverses a string or collection
 */
function reverse(input) {

  if(isString(input)) {
    return input.split('').reverse().join('');
  }

  return (isArray(input)) ? input.slice().reverse() : input;
}
/**
 * @name sum
 * @kind function
 *
 * @description
 * Sum up all values within an array
 */

function sum(input, initial) {

    return (!isArray(input)) ? input :
        input.reduce(function(prev, curr) {
            return prev + curr;
        }, initial || 0);
}
/**
 * @name unique/uniq
 * @kind function
 *
 * @description
 * get array and filter duplicate members
 * if uniqueFilter get a property(nested to) as argument it's
 * filter by this property as unique identifier
 */
function unique(array, property) {
  
  if (!isArray(array)) {
    return array;
  }

  //store all unique identifiers
  var uniqueItems = [],
    get = $parse(property);

  return (isUndefined(property)) ?
    //if it's kind of primitive array
    array.filter(function (elm, pos, self) {
      return self.indexOf(elm) === pos;
    }) :
    //else compare with equals
    array.filter(function (elm) {
      var prop = get(elm);
      if(some(uniqueItems, prop)) {
        return false;
      }
      uniqueItems.push(prop);
      return true;
    });

  //checked if the unique identifier is already exist
  function some(array, member) {
    if(isUndefined(member)) {
      return false;
    }
    return array.some(function(el) {
      return equals(el, member);
    });
  }

}
/**
 * @name xor
 * @kind function
 *
 * @description
 * Exclusive or filter by expression
 */
function xor(col1, col2, expression) {

  expression = expression || false;

  if(!isArray(col1) || !isArray(col2)) return col1;

  return col1.concat(col2)
    .filter(function(elm) {
      return !(some(elm, col1) && some(elm, col2));
    });

  function some(el, col) {
    var getter = $parse(expression);
    return col.some(function(dElm) {
      return expression ?
        equals(getter(dElm), getter(el)) :
        equals(dElm, el);
    })
  }
}
// AngularJS Boolean
/**
 * @description
 * Determines if a reference is a `String`.
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `String`.
 */
function isString(value){return typeof value === 'string';}

/**
 * @description
 * Determines if a reference is an `Object`. Unlike `typeof` in JavaScript, `null`s are not
 * considered to be objects. Note that JavaScript arrays are objects.
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Object` but not `null`.
 */
function isObject(value){
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object';
}

/**
 * @description
 * Determines if a reference is a `Number`.
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Number`.
 */
function isNumber(value){return typeof value === 'number';}

/**
 * @description
 * Determines if a reference is undefined.
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is undefined.
 */
function isUndefined(value){return typeof value === 'undefined';}


/**
 * @description
 * Determines if a reference is defined.
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is defined.
 */
function isDefined(value){return typeof value !== 'undefined';}

/**
 * @description
 * Determines if a value is a date.
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Date`.
 */
function isDate(value) {
  return toString.call(value) === '[object Date]';
}

/**
 * @description
 * Determines if a reference is an `Array`.
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is an `Array`.
 */
var isArray = Array.isArray;

/**
 * @description
 * Determines if a reference is a `Function`.
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Function`.
 */
function isFunction(value){return typeof value === 'function';}

/**
 * @description
 * Determines if a value is a regular expression object.
 * @private
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `RegExp`.
 */
function isRegExp(value) {
  return toString.call(value) === '[object RegExp]';
}

/**
 * @description
 * get Array or String and return if is empty
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a Empty.
 */
function isEmpty(value) {
  return (isString(value) || isArray(value)) ? !value.length : false;
}

/**
 * @description
 * Determines if a reference is a `Boolean`.
 * @param {*} value Reference to check.
 * @returns {boolean} True if `value` is a `Boolean`.
 */
function isBoolean(value){return typeof value === 'boolean';}
//these methods is kind of common methods for chaining wrappers
/**
 * @description
 * add methods get an object extend(based on type) and return it.
 * @param object
 * @returns {*}
 * @example
 * add(1,2) ==> 3
 * add([],1) ==> [1]  
 * add('f','g') ==> 'fg'
 * add({}, {a:1}) ==> {a:1}
 */
function add(object) {
  var args = Array.prototype.slice.call(arguments, 1);
  //loop through all over the arguments
  forEach(args, function(value, i) {
    switch(typeof object) {
      case 'object':
        isArray(object)
          ? object.push(value)
          : extend(object, isObject(value) ? value : creObject(i, value));
        break;
      case 'string':
        object += isString(value) ? value : '';
        break;
      case 'number':
        object += isNumber(value) ? value : 0;
    }
  });
  return object;
}

/**
 * @private
 * @description
 * return an object that index is the key
 * @param i {Index}
 * @param value
 * @returns {Object}
 */
function creObject(i, value) {
  var o = {};
  o[i] = value;
  return o;
}

/**
 * @description
 * get object and return it's keys,
 * if deep set to true, it will return it deeply.
 * @param obj {Object}
 * @param deep {Boolean}
 */
function objKeys(obj, deep) {
  return isObject(obj)
    ? (deep) ? deepKeys(obj) : Object.keys(obj)
    : obj;
}

/**
 * @description
 * Get an object, and return an array composed of it's properties names(nested too).
 * @param obj {Object}
 * @param stack {Array}
 * @param parent {String}
 * @returns {Array}
 * @example
 * deepKeys({ a:1, b: { c:2, d: { e: 3 } } }) ==> ["a", "b.c", "b.d.e"]
 */
function deepKeys(obj, stack, parent) {
  stack = stack || [];
  var keys = Object.keys(obj);

  keys.forEach(function(el) {
    //if it's a nested object
    if(isObject(obj[el]) && !isArray(obj[el])) {
      //concatenate the new parent if exist
      var p = parent ? parent + '.' + el : parent;
      deepKeys(obj[el], stack, p || el);
    } else {
      //create and save the key
      var key = parent ? parent + '.' + el : el;
      stack.push(key);
    }
  });
  return stack;
}
/**
 * @name toArray
 * @kind function
 *
 * @description
 * Convert objects into stable arrays.
 * if addKey set to true,the filter also attaches a new property
 * $key to the value containing the original key that was used in
 * the object we are iterating over to reference the property
 */
function toArray(collection, addKey) {

  if(!isObject(collection)) {
    return collection;
  }

  return Object.keys(collection).map(function (key) {
      return addKey
        ? extend(collection[key], { $key: key })
        : collection[key];
    });
}
/**
 * @name endsWith
 * @kind function
 *
 * @description
 * checks whether string ends with the ends parameter.
 */
function endsWith(input, ends, csensitive) {

  var sensitive = csensitive || false,
    position;

  if(!isString(input) || isUndefined(ends)) {
    return input;
  }

  input = (sensitive) ? input : input.toLowerCase();
  position = input.length - ends.length;

  return input.indexOf((sensitive) ? ends : ends.toLowerCase(), position) !== -1;
}
/**
 * @name ltrim
 * @kind function
 *
 * @description
 * Left trim. Similar to trim, but only for left side.
 */
function ltrim(input, chars) {

  var trim = chars || '\\s';

  if(!isString(input)) {
    return input;
  }

  return input.replace(new RegExp('^' + trim + '+'), '');
}
/**
 * @name repeat
 * @kind function
 *
 * @description
 * Repeats a string n times.
 */
function repeat(input, n) {

    var times = ~~n;

    return (!isString(input) || !times) ? input : strRepeat(input, n);
}

/**
 * Repeats a string n times with given separator
 * @param str string to repeat
 * @param n number of times
 * @returns {*}
 */
function strRepeat(str, n) {
    var res = '';
    do {
        if (n & 1) {
            res += str;
        }

        str += str;
    } while (n = n >> 1);

    return res;
}
/**
 * @name rtrim
 * @kind function
 *
 * @description
 * Right trim. Similar to trim, but only for the right side.
 */
function rtrim(input, chars) {

  var trim = chars || '\\s';

  if(!isString(input)) {
    return input;
  }

  return input.replace(new RegExp(trim + '+$'), '');
}
/**
 * @name slugify
 * @kind function
 *
 * @description
 * remove spaces from string, replace with "-" or given argument
 */
function slugify(input, sub) {

  var replace = sub || '-';

  if(isString(input)) {
    return input.toLowerCase()
      .replace(/\s+/g, replace);
  }

  return input;
}
/**
 * @name startsWith
 * @kind function
 *
 * @description
 * checks whether string starts with the starts parameter.
 */
function startsWith(input, start, csensitive) {

  var sensitive = csensitive || false;

  if(!isString(input) || isUndefined(start)) {
    return input;
  }

  input = (sensitive) ? input : input.toLowerCase();

  return !input.indexOf((sensitive) ? start : start.toLowerCase());
}
/**
 * @name stringular
 * @kind function
 *
 * @description
 * get string with {n} and replace match with enumeration values
 */
function stringular(input) {
  var args = Array.prototype.slice.call(arguments, 1);

  return input.replace(/{(\d+)}/g, function (match, number) {
    return isUndefined(args[number]) ? match : args[number];
  });

}
/**
 * @name stripTags
 * @kind function
 *
 * @description
 * strip html tags from string
 */
function stripTags(input) {
  if(isString(input)) {
    return input.replace(/<\S[^><]*>/g, '');
  }
  return input;
}
/**
 * @name trim
 * @kind function
 *
 * @description
 *  Strip whitespace (or other characters) from the beginning and end of a string
 */
function trim(input, chars) {

  var trim = chars || '\\s';

  if(!isString(input)) {
    return input;
  }

  return input.replace(new RegExp('^' + trim + '+|' + trim + '+$', 'g'), '');
}
/**
 * @name truncate
 * @kind function
 *
 * @description
 * truncates a string given a specified length, providing a custom string to denote an omission.
 */

function truncate(input, length, suffix, preserve) {

  length = isUndefined(length) ? input.length : length;
  preserve = preserve || false;
  suffix = suffix || '';

  if(!isString(input) || (input.length <= length)) return input;

  return input.substring(0, (preserve) ?
    ((input.indexOf(' ', length) === -1) ? input.length : input.indexOf(' ', length)) :
    length) + suffix;
}
/**
 * @name ucfirst
 * @kind function
 *
 * @description
 * upper case first char
 */
function ucfirst(input) {
  return isString(input) ? input.split(' ')
    .map(function (char) {
      return char.charAt(0).toUpperCase() + char.substring(1);
    }).join(' ') : input;
}

/**
 * @name wrap
 * @kind function
 *
 * @description
 * Wrap a string with another string
 */
function wrap(input, wrap, ends) {

  if(!isString(input) || isUndefined(wrap)) {
    return input;
  }

  return [wrap, input, ends || wrap].join('');

}
// AngularJS Utils
/**
 * @description
 * Determines if two objects or two values are equivalent. Supports value types, regular
 * expressions, arrays and objects.
 *
 * @param {*} o1 Object or value to compare.
 * @param {*} o2 Object or value to compare.
 * @returns {boolean} True if arguments are equal.
 */
function equals(o1, o2) {
  if (o1 === o2) return true;
  if (o1 === null || o2 === null) return false;
  if (o1 !== o1 && o2 !== o2) return true; // NaN === NaN
  var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
  if (t1 == t2) {
    if (t1 == 'object') {
      if (isArray(o1)) {
        if (!isArray(o2)) return false;
        if ((length = o1.length) == o2.length) {
          for (key=0; key<length; key++) {
            if (!equals(o1[key], o2[key])) return false;
          }
          return true;
        }
      } else if (isDate(o1)) {
        if (!isDate(o2)) return false;
        return equals(o1.getTime(), o2.getTime());
      } else if (isRegExp(o1) && isRegExp(o2)) {
        return o1.toString() == o2.toString();
      } else {
        if (isWindow(o1) || isWindow(o2) || isArray(o2)) return false;
        keySet = {};
        for (key in o1) {
          if (isFunction(o1[key])) continue;
          if (!equals(o1[key], o2[key])) return false;
          keySet[key] = true;
        }
        for (key in o2) {
          if (!keySet.hasOwnProperty(key) &&
            o2[key] !== undefined &&
            !isFunction(o2[key])) return false;
        }
        return true;
      }
    }
  }
  return false;
}

/**
 * @description
 * A function that returns its first argument.
 */
function value(a) {return a;}

/**
 * @description
 * Extends the destination object `dst` by copying own enumerable properties from the `src` object(s)
 * to `dst`. You can specify multiple `src` objects.
 *
 * @param {Object} dst Destination object.
 * @param {...Object} src Source object(s).
 * @returns {Object} Reference to `dst`.
 */
function extend(dst) {
  for (var i = 1, ii = arguments.length; i < ii; i++) {
    var obj = arguments[i];
    if (obj) {
      var keys = Object.keys(obj);
      for (var j = 0, jj = keys.length; j < jj; j++) {
        var key = keys[j];
        dst[key] = obj[key];
      }
    }
  }
  return dst;
}

/**
 * @description
 * Creates a new object without a prototype.
 * @returns {Object}
 */
function createMap() {
  return Object.create(null);
}


/**
 * @description
 * A function that performs no operations.
 */
function noop() {}

/**
 * @description Converts the specified string to uppercase.
 * @param {string} string String to be converted to uppercase.
 * @returns {string} Uppercased string.
 */
var uppercase = function(string){return isString(string) ? string.toUpperCase() : string;};

/**
 * @description Converts the specified string to lowercase.
 * @param {string} string String to be converted to lowercase.
 * @returns {string} Lowercased string.
 */
var lowercase = function(string){return isString(string) ? string.toLowerCase() : string;};

/**
 * @description
 * Serializes input into a JSON-formatted string.
 *
 * @param {Object|Array|Date|string|number} obj Input to be serialized into JSON.
 * @returns {string|undefined} JSON-ified string representing `obj`.
 */
function toJson(obj) {
  if (typeof obj === 'undefined') return undefined;
  return JSON.stringify(obj);
}


/**
 * @description
 * Creates a deep copy of `source`, which should be an object or an array.
 * @param {*} source The source that will be used to make a copy.
 *                   Can be any type, including primitives, `null`, and `undefined`.
 * @param {(Object|Array)=} destination Destination into which the source is copied. If
 *     provided, must be of the same type as `source`.
 * @returns {*} The copy or updated `destination`, if `destination` was specified.
 *
 */
function copy(source, destination, stackSource, stackDest) {
  if (isWindow(source)) {
    throw Error("Can't copy! Making copies of Window instances is not supported.");
  }

  if (!destination) {
    destination = source;
    if (source) {
      if (isArray(source)) {
        destination = copy(source, [], stackSource, stackDest);
      } else if (isDate(source)) {
        destination = new Date(source.getTime());
      } else if (isRegExp(source)) {
        destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
        destination.lastIndex = source.lastIndex;
      } else if (isObject(source)) {
        var emptyObject = Object.create(Object.getPrototypeOf(source));
        destination = copy(source, emptyObject, stackSource, stackDest);
      }
    }
  } else {
    if (source === destination) throw Error("Can't copy! Source and destination are identical.");

    stackSource = stackSource || [];
    stackDest = stackDest || [];

    if (isObject(source)) {
      var index = stackSource.indexOf(source);
      if (index !== -1) return stackDest[index];

      stackSource.push(source);
      stackDest.push(destination);
    }

    var result;
    if (isArray(source)) {
      destination.length = 0;
      for (var i = 0; i < source.length; i++) {
        result = copy(source[i], null, stackSource, stackDest);
        if (isObject(source[i])) {
          stackSource.push(source[i]);
          stackDest.push(result);
        }
        destination.push(result);
      }
    } else {
      if (isArray(destination)) {
        destination.length = 0;
      } else {
        forEach(destination, function(value, key) {
          delete destination[key];
        });
      }
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          result = copy(source[key], null, stackSource, stackDest);
          if (isObject(source[key])) {
            stackSource.push(source[key]);
            stackDest.push(result);
          }
          destination[key] = result;
        }
      }
    }

  }
  return destination;
}
'use strict';

// @license AngularJS#parse v1.3.0
// (c) 2010-2014 Google, Inc. http://angularjs.org
// License: MIT
//
// Sandboxing Angular Expressions
// ------------------------------
// Angular expressions are generally considered safe because these expressions only have direct
// access to $scope and locals. However, one can obtain the ability to execute arbitrary JS code by
// obtaining a reference to native JS functions such as the Function constructor.
//
// As an example, consider the following Angular expression:
//
//   {}.toString.constructor('alert("evil JS code")')
//
// This sandboxing technique is not perfect and doesn't aim to be. The goal is to prevent exploits
// against the expression language, but not to prevent exploits that were enabled by exposing
// sensitive JavaScript or browser apis on Scope. Exposing such objects on a Scope is never a good
// practice and therefore we are not even trying to protect against interaction with an object
// explicitly exposed in this way.
//
// In general, it is not possible to access a Window object from an angular expression unless a
// window or some DOM object that has a reference to window is published onto a Scope.
// Similarly we prevent invocations of function known to be dangerous, as well as assignments to
// native objects.


function ensureSafeMemberName(name, fullExpression) {
  if (name === "__defineGetter__" || name === "__defineSetter__"
    || name === "__lookupGetter__" || name === "__lookupSetter__"
    || name === "__proto__") {
    throw $parseMinErr('isecfld',
      'Attempting to access a disallowed field in Angular expressions! '
        +'Expression: {0}', fullExpression);
  }
  return name;
}

function ensureSafeObject(obj, fullExpression) {
  // nifty check if obj is Function that is fast and works across iframes and other contexts
  if (obj) {
    if (obj.constructor === obj) {
      throw $parseMinErr('isecfn',
        'Referencing Function in Angular expressions is disallowed! Expression: {0}',
        fullExpression);
    } else if (// isWindow(obj)
      obj.window === obj) {
      throw $parseMinErr('isecwindow',
        'Referencing the Window in Angular expressions is disallowed! Expression: {0}',
        fullExpression);
    } else if (// isElement(obj)
      obj.children && (obj.nodeName || (obj.prop && obj.attr && obj.find))) {
      throw $parseMinErr('isecdom',
        'Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}',
        fullExpression);
    } else if (// block Object so that we can't get hold of dangerous Object.* methods
      obj === Object) {
      throw $parseMinErr('isecobj',
        'Referencing Object in Angular expressions is disallowed! Expression: {0}',
        fullExpression);
    }
  }
  return obj;
}

var CALL = Function.prototype.call;
var APPLY = Function.prototype.apply;
var BIND = Function.prototype.bind;

function ensureSafeFunction(obj, fullExpression) {
  if (obj) {
    if (obj.constructor === obj) {
      throw $parseMinErr('isecfn',
        'Referencing Function in Angular expressions is disallowed! Expression: {0}',
        fullExpression);
    } else if (obj === CALL || obj === APPLY || obj === BIND) {
      throw $parseMinErr('isecff',
        'Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}',
        fullExpression);
    }
  }
}

//Keyword constants
var CONSTANTS = createMap();
forEach({
  'null': function() { return null; },
  'true': function() { return true; },
  'false': function() { return false; },
  'undefined': function() {}
}, function(constantGetter, name) {
  constantGetter.constant = constantGetter.literal = constantGetter.sharedGetter = true;
  CONSTANTS[name] = constantGetter;
});

//Not quite a constant, but can be lex/parsed the same
CONSTANTS['this'] = function(self) { return self; };
CONSTANTS['this'].sharedGetter = true;


//Operators - will be wrapped by binaryFn/unaryFn/assignment/filter
var OPERATORS = extend(createMap(), {
  '+':function(self, locals, a, b){
    a=a(self, locals); b=b(self, locals);
    if (isDefined(a)) {
      if (isDefined(b)) {
        return a + b;
      }
      return a;
    }
    return isDefined(b)?b:undefined;},
  '-':function(self, locals, a, b){
    a=a(self, locals); b=b(self, locals);
    return (isDefined(a)?a:0)-(isDefined(b)?b:0);
  },
  '*':function(self, locals, a, b){return a(self, locals)*b(self, locals);},
  '/':function(self, locals, a, b){return a(self, locals)/b(self, locals);},
  '%':function(self, locals, a, b){return a(self, locals)%b(self, locals);},
  '===':function(self, locals, a, b){return a(self, locals)===b(self, locals);},
  '!==':function(self, locals, a, b){return a(self, locals)!==b(self, locals);},
  '==':function(self, locals, a, b){return a(self, locals)==b(self, locals);},
  '!=':function(self, locals, a, b){return a(self, locals)!=b(self, locals);},
  '<':function(self, locals, a, b){return a(self, locals)<b(self, locals);},
  '>':function(self, locals, a, b){return a(self, locals)>b(self, locals);},
  '<=':function(self, locals, a, b){return a(self, locals)<=b(self, locals);},
  '>=':function(self, locals, a, b){return a(self, locals)>=b(self, locals);},
  '&&':function(self, locals, a, b){return a(self, locals)&&b(self, locals);},
  '||':function(self, locals, a, b){return a(self, locals)||b(self, locals);},
  '!':function(self, locals, a){return !a(self, locals);},

  //Tokenized as operators but parsed as assignment/filters
  '=':true,
  '|':true
});
var ESCAPE = {"n":"\n", "f":"\f", "r":"\r", "t":"\t", "v":"\v", "'":"'", '"':'"'};


/////////////////////////////////////////


/**
 * @constructor
 */
var Lexer = function (options) {
  this.options = options;
};

Lexer.prototype = {
  constructor: Lexer,

  lex: function (text) {
    this.text = text;
    this.index = 0;
    this.ch = undefined;
    this.tokens = [];

    while (this.index < this.text.length) {
      this.ch = this.text.charAt(this.index);
      if (this.is('"\'')) {
        this.readString(this.ch);
      } else if (this.isNumber(this.ch) || this.is('.') && this.isNumber(this.peek())) {
        this.readNumber();
      } else if (this.isIdent(this.ch)) {
        this.readIdent();
      } else if (this.is('(){}[].,;:?')) {
        this.tokens.push({
          index: this.index,
          text: this.ch
        });
        this.index++;
      } else if (this.isWhitespace(this.ch)) {
        this.index++;
      } else {
        var ch2 = this.ch + this.peek();
        var ch3 = ch2 + this.peek(2);
        var fn = OPERATORS[this.ch];
        var fn2 = OPERATORS[ch2];
        var fn3 = OPERATORS[ch3];
        if (fn3) {
          this.tokens.push({index: this.index, text: ch3, fn: fn3});
          this.index += 3;
        } else if (fn2) {
          this.tokens.push({index: this.index, text: ch2, fn: fn2});
          this.index += 2;
        } else if (fn) {
          this.tokens.push({
            index: this.index,
            text: this.ch,
            fn: fn
          });
          this.index += 1;
        } else {
          this.throwError('Unexpected next character ', this.index, this.index + 1);
        }
      }
    }
    return this.tokens;
  },

  is: function(chars) {
    return chars.indexOf(this.ch) !== -1;
  },

  peek: function(i) {
    var num = i || 1;
    return (this.index + num < this.text.length) ? this.text.charAt(this.index + num) : false;
  },

  isNumber: function(ch) {
    return ('0' <= ch && ch <= '9');
  },

  isWhitespace: function(ch) {
    // IE treats non-breaking space as \u00A0
    return (ch === ' ' || ch === '\r' || ch === '\t' ||
      ch === '\n' || ch === '\v' || ch === '\u00A0');
  },

  isIdent: function(ch) {
    return ('a' <= ch && ch <= 'z' ||
      'A' <= ch && ch <= 'Z' ||
      '_' === ch || ch === '$');
  },

  isExpOperator: function(ch) {
    return (ch === '-' || ch === '+' || this.isNumber(ch));
  },

  throwError: function(error, start, end) {
    end = end || this.index;
    var colStr = (isDefined(start)
      ? 's ' + start +  '-' + this.index + ' [' + this.text.substring(start, end) + ']'
      : ' ' + end);
    throw $parseMinErr('lexerr', 'Lexer Error: {0} at column{1} in expression [{2}].',
      error, colStr, this.text);
  },

  readNumber: function() {
    var number = '';
    var start = this.index;
    while (this.index < this.text.length) {
      var ch = lowercase(this.text.charAt(this.index));
      if (ch == '.' || this.isNumber(ch)) {
        number += ch;
      } else {
        var peekCh = this.peek();
        if (ch == 'e' && this.isExpOperator(peekCh)) {
          number += ch;
        } else if (this.isExpOperator(ch) &&
          peekCh && this.isNumber(peekCh) &&
          number.charAt(number.length - 1) == 'e') {
          number += ch;
        } else if (this.isExpOperator(ch) &&
          (!peekCh || !this.isNumber(peekCh)) &&
          number.charAt(number.length - 1) == 'e') {
          this.throwError('Invalid exponent');
        } else {
          break;
        }
      }
      this.index++;
    }
    number = 1 * number;
    this.tokens.push({
      index: start,
      text: number,
      constant: true,
      fn: function() { return number; }
    });
  },

  readIdent: function() {
    var expression = this.text;

    var ident = '';
    var start = this.index;

    var lastDot, peekIndex, methodName, ch;

    while (this.index < this.text.length) {
      ch = this.text.charAt(this.index);
      if (ch === '.' || this.isIdent(ch) || this.isNumber(ch)) {
        if (ch === '.') lastDot = this.index;
        ident += ch;
      } else {
        break;
      }
      this.index++;
    }

    //check if the identifier ends with . and if so move back one char
    if (lastDot && ident[ident.length - 1] === '.') {
      this.index--;
      ident = ident.slice(0, -1);
      lastDot = ident.lastIndexOf('.');
      if (lastDot === -1) {
        lastDot = undefined;
      }
    }

    //check if this is not a method invocation and if it is back out to last dot
    if (lastDot) {
      peekIndex = this.index;
      while (peekIndex < this.text.length) {
        ch = this.text.charAt(peekIndex);
        if (ch === '(') {
          methodName = ident.substr(lastDot - start + 1);
          ident = ident.substr(0, lastDot - start);
          this.index = peekIndex;
          break;
        }
        if (this.isWhitespace(ch)) {
          peekIndex++;
        } else {
          break;
        }
      }
    }

    this.tokens.push({
      index: start,
      text: ident,
      fn: CONSTANTS[ident] || getterFn(ident, this.options, expression)
    });

    if (methodName) {
      this.tokens.push({
        index: lastDot,
        text: '.'
      });
      this.tokens.push({
        index: lastDot + 1,
        text: methodName
      });
    }
  },

  readString: function(quote) {
    var start = this.index;
    this.index++;
    var string = '';
    var rawString = quote;
    var escape = false;
    while (this.index < this.text.length) {
      var ch = this.text.charAt(this.index);
      rawString += ch;
      if (escape) {
        if (ch === 'u') {
          var hex = this.text.substring(this.index + 1, this.index + 5);
          if (!hex.match(/[\da-f]{4}/i))
            this.throwError('Invalid unicode escape [\\u' + hex + ']');
          this.index += 4;
          string += String.fromCharCode(parseInt(hex, 16));
        } else {
          var rep = ESCAPE[ch];
          string = string + (rep || ch);
        }
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === quote) {
        this.index++;
        this.tokens.push({
          index: start,
          text: rawString,
          string: string,
          constant: true,
          fn: function() { return string; }
        });
        return;
      } else {
        string += ch;
      }
      this.index++;
    }
    this.throwError('Unterminated quote', start);
  }
};


function isConstant(exp) {
  return exp.constant;
}

/**
 * @constructor
 */
var Parser = function (lexer, options) {
  this.lexer = lexer;
  this.options = options;
};

Parser.ZERO = extend(function () {
  return 0;
}, {
  sharedGetter: true,
  constant: true
});

Parser.prototype = {
  constructor: Parser,

  parse: function (text) {
    this.text = text;
    this.tokens = this.lexer.lex(text);

    var value = this.statements();

    if (this.tokens.length !== 0) {
      this.throwError('is an unexpected token', this.tokens[0]);
    }

    value.literal = !!value.literal;
    value.constant = !!value.constant;

    return value;
  },

  primary: function () {
    var primary;
    if (this.expect('(')) {
      primary = this.filterChain();
      this.consume(')');
    } else if (this.expect('[')) {
      primary = this.arrayDeclaration();
    } else if (this.expect('{')) {
      primary = this.object();
    } else {
      var token = this.expect();
      primary = token.fn;
      if (!primary) {
        this.throwError('not a primary expression', token);
      }
      if (token.constant) {
        primary.constant = true;
        primary.literal = true;
      }
    }

    var next, context;
    while ((next = this.expect('(', '[', '.'))) {
      if (next.text === '(') {
        primary = this.functionCall(primary, context);
        context = null;
      } else if (next.text === '[') {
        context = primary;
        primary = this.objectIndex(primary);
      } else if (next.text === '.') {
        context = primary;
        primary = this.fieldAccess(primary);
      } else {
        this.throwError('IMPOSSIBLE');
      }
    }
    return primary;
  },

  throwError: function(msg, token) {
    throw $parseMinErr('syntax',
      'Syntax Error: Token \'{0}\' {1} at column {2} of the expression [{3}] starting at [{4}].',
      token.text, msg, (token.index + 1), this.text, this.text.substring(token.index));
  },

  peekToken: function() {
    if (this.tokens.length === 0)
      throw $parseMinErr('ueoe', 'Unexpected end of expression: {0}', this.text);
    return this.tokens[0];
  },

  peek: function(e1, e2, e3, e4) {
    if (this.tokens.length > 0) {
      var token = this.tokens[0];
      var t = token.text;
      if (t === e1 || t === e2 || t === e3 || t === e4 ||
        (!e1 && !e2 && !e3 && !e4)) {
        return token;
      }
    }
    return false;
  },

  expect: function(e1, e2, e3, e4){
    var token = this.peek(e1, e2, e3, e4);
    if (token) {
      this.tokens.shift();
      return token;
    }
    return false;
  },

  consume: function(e1){
    if (!this.expect(e1)) {
      this.throwError('is unexpected, expecting [' + e1 + ']', this.peek());
    }
  },

  unaryFn: function(fn, right) {
    return extend(function $parseUnaryFn(self, locals) {
      return fn(self, locals, right);
    }, {
      constant:right.constant,
      inputs: [right]
    });
  },

  binaryFn: function(left, fn, right, isBranching) {
    return extend(function $parseBinaryFn(self, locals) {
      return fn(self, locals, left, right);
    }, {
      constant: left.constant && right.constant,
      inputs: !isBranching && [left, right]
    });
  },

  statements: function() {
    var statements = [];
    while (true) {
      if (this.tokens.length > 0 && !this.peek('}', ')', ';', ']'))
        statements.push(this.filterChain());
      if (!this.expect(';')) {
        // optimize for the common case where there is only one statement.
        // TODO(size): maybe we should not support multiple statements?
        return (statements.length === 1)
          ? statements[0]
          : function $parseStatements(self, locals) {
          var value;
          for (var i = 0, ii = statements.length; i < ii; i++) {
            value = statements[i](self, locals);
          }
          return value;
        };
      }
    }
  },

  filterChain: function() {
    var left = this.expression();
    var token;
    while ((token = this.expect('|'))) {
      left = true;
    }
    return left;
  },

  expression: function() {
    return this.assignment();
  },

  assignment: function() {
    var left = this.ternary();
    var right;
    var token;
    if ((token = this.expect('='))) {
      if (!left.assign) {
        this.throwError('implies assignment but [' +
          this.text.substring(0, token.index) + '] can not be assigned to', token);
      }
      right = this.ternary();
      return extend(function $parseAssignment(scope, locals) {
        return left.assign(scope, right(scope, locals), locals);
      }, {
        inputs: [left, right]
      });
    }
    return left;
  },

  ternary: function() {
    var left = this.logicalOR();
    var middle;
    var token;
    if ((token = this.expect('?'))) {
      middle = this.assignment();
      if ((token = this.expect(':'))) {
        var right = this.assignment();

        return extend(function $parseTernary(self, locals){
          return left(self, locals) ? middle(self, locals) : right(self, locals);
        }, {
          constant: left.constant && middle.constant && right.constant
        });

      } else {
        this.throwError('expected :', token);
      }
    }

    return left;
  },

  logicalOR: function() {
    var left = this.logicalAND();
    var token;
    while ((token = this.expect('||'))) {
      left = this.binaryFn(left, token.fn, this.logicalAND(), true);
    }
    return left;
  },

  logicalAND: function() {
    var left = this.equality();
    var token;
    if ((token = this.expect('&&'))) {
      left = this.binaryFn(left, token.fn, this.logicalAND(), true);
    }
    return left;
  },

  equality: function() {
    var left = this.relational();
    var token;
    if ((token = this.expect('==','!=','===','!=='))) {
      left = this.binaryFn(left, token.fn, this.equality());
    }
    return left;
  },

  relational: function() {
    var left = this.additive();
    var token;
    if ((token = this.expect('<', '>', '<=', '>='))) {
      left = this.binaryFn(left, token.fn, this.relational());
    }
    return left;
  },

  additive: function() {
    var left = this.multiplicative();
    var token;
    while ((token = this.expect('+','-'))) {
      left = this.binaryFn(left, token.fn, this.multiplicative());
    }
    return left;
  },

  multiplicative: function() {
    var left = this.unary();
    var token;
    while ((token = this.expect('*','/','%'))) {
      left = this.binaryFn(left, token.fn, this.unary());
    }
    return left;
  },

  unary: function() {
    var token;
    if (this.expect('+')) {
      return this.primary();
    } else if ((token = this.expect('-'))) {
      return this.binaryFn(Parser.ZERO, token.fn, this.unary());
    } else if ((token = this.expect('!'))) {
      return this.unaryFn(token.fn, this.unary());
    } else {
      return this.primary();
    }
  },

  fieldAccess: function(object) {
    var expression = this.text;
    var field = this.expect().text;
    var getter = getterFn(field, this.options, expression);

    return extend(function $parseFieldAccess(scope, locals, self) {
      return getter(self || object(scope, locals));
    }, {
      assign: function(scope, value, locals) {
        var o = object(scope, locals);
        if (!o) object.assign(scope, o = {});
        return setter(o, field, value, expression);
      }
    });
  },

  objectIndex: function(obj) {
    var expression = this.text;

    var indexFn = this.expression();
    this.consume(']');

    return extend(function $parseObjectIndex(self, locals) {
      var o = obj(self, locals),
        i = indexFn(self, locals),
        v;

      ensureSafeMemberName(i, expression);
      if (!o) return undefined;
      v = ensureSafeObject(o[i], expression);
      return v;
    }, {
      assign: function(self, value, locals) {
        var key = ensureSafeMemberName(indexFn(self, locals), expression);
        // prevent overwriting of Function.constructor which would break ensureSafeObject check
        var o = ensureSafeObject(obj(self, locals), expression);
        if (!o) obj.assign(self, o = {});
        return o[key] = value;
      }
    });
  },

  functionCall: function(fnGetter, contextGetter) {
    var argsFn = [];
    if (this.peekToken().text !== ')') {
      do {
        argsFn.push(this.expression());
      } while (this.expect(','));
    }
    this.consume(')');

    var expressionText = this.text;
    // we can safely reuse the array across invocations
    var args = argsFn.length ? [] : null;

    return function $parseFunctionCall(scope, locals) {
      var context = contextGetter ? contextGetter(scope, locals) : scope;
      var fn = fnGetter(scope, locals, context) || noop;

      if (args) {
        var i = argsFn.length;
        while (i--) {
          args[i] = ensureSafeObject(argsFn[i](scope, locals), expressionText);
        }
      }

      ensureSafeObject(context, expressionText);
      ensureSafeFunction(fn, expressionText);

      // IE stupidity! (IE doesn't have apply for some native functions)
      var v = fn.apply
        ? fn.apply(context, args)
        : fn(args[0], args[1], args[2], args[3], args[4]);

      return ensureSafeObject(v, expressionText);
    };
  },

  // This is used with json array declaration
  arrayDeclaration: function () {
    var elementFns = [];
    if (this.peekToken().text !== ']') {
      do {
        if (this.peek(']')) {
          // Support trailing commas per ES5.1.
          break;
        }
        var elementFn = this.expression();
        elementFns.push(elementFn);
      } while (this.expect(','));
    }
    this.consume(']');

    return extend(function $parseArrayLiteral(self, locals) {
      var array = [];
      for (var i = 0, ii = elementFns.length; i < ii; i++) {
        array.push(elementFns[i](self, locals));
      }
      return array;
    }, {
      literal: true,
      constant: elementFns.every(isConstant),
      inputs: elementFns
    });
  },

  object: function () {
    var keys = [], valueFns = [];
    if (this.peekToken().text !== '}') {
      do {
        if (this.peek('}')) {
          // Support trailing commas per ES5.1.
          break;
        }
        var token = this.expect();
        keys.push(token.string || token.text);
        this.consume(':');
        var value = this.expression();
        valueFns.push(value);
      } while (this.expect(','));
    }
    this.consume('}');

    return extend(function $parseObjectLiteral(self, locals) {
      var object = {};
      for (var i = 0, ii = valueFns.length; i < ii; i++) {
        object[keys[i]] = valueFns[i](self, locals);
      }
      return object;
    }, {
      literal: true,
      constant: valueFns.every(isConstant),
      inputs: valueFns
    });
  }
};


//////////////////////////////////////////////////
// Parser helper functions
//////////////////////////////////////////////////

function setter(obj, path, setValue, fullExp) {
  ensureSafeObject(obj, fullExp);

  var element = path.split('.'), key;
  for (var i = 0; element.length > 1; i++) {
    key = ensureSafeMemberName(element.shift(), fullExp);
    var propertyObj = ensureSafeObject(obj[key], fullExp);
    if (!propertyObj) {
      propertyObj = {};
      obj[key] = propertyObj;
    }
    obj = propertyObj;
  }
  key = ensureSafeMemberName(element.shift(), fullExp);
  ensureSafeObject(obj[key], fullExp);
  obj[key] = setValue;
  return setValue;
}

var getterFnCache = createMap();

/**
 * Implementation of the "Black Hole" variant from:
 * - http://jsperf.com/angularjs-parse-getter/4
 * - http://jsperf.com/path-evaluation-simplified/7
 */
function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp) {
  ensureSafeMemberName(key0, fullExp);
  ensureSafeMemberName(key1, fullExp);
  ensureSafeMemberName(key2, fullExp);
  ensureSafeMemberName(key3, fullExp);
  ensureSafeMemberName(key4, fullExp);

  return function cspSafeGetter(scope, locals) {
    var pathVal = (locals && locals.hasOwnProperty(key0)) ? locals : scope;

    if (pathVal == null) return pathVal;
    pathVal = pathVal[key0];

    if (!key1) return pathVal;
    if (pathVal == null) return undefined;
    pathVal = pathVal[key1];

    if (!key2) return pathVal;
    if (pathVal == null) return undefined;
    pathVal = pathVal[key2];

    if (!key3) return pathVal;
    if (pathVal == null) return undefined;
    pathVal = pathVal[key3];

    if (!key4) return pathVal;
    if (pathVal == null) return undefined;
    pathVal = pathVal[key4];

    return pathVal;
  };
}

function getterFn(path, options, fullExp) {
  var fn = getterFnCache[path];

  if (fn) return fn;

  var pathKeys = path.split('.'),
    pathKeysLength = pathKeys.length;

  // http://jsperf.com/angularjs-parse-getter/6
  if (options.csp) {
    if (pathKeysLength < 6) {
      fn = cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp);
    } else {
      fn = function cspSafeGetter(scope, locals) {
        var i = 0, val;
        do {
          val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++],
            pathKeys[i++], fullExp)(scope, locals);

          locals = undefined; // clear after first iteration
          scope = val;
        } while (i < pathKeysLength);
        return val;
      };
    }
  } else {
    var code = '';
    forEach(pathKeys, function(key, index) {
      ensureSafeMemberName(key, fullExp);
      code += 'if(s == null) return undefined;\n' +
        's='+ (index
        // we simply dereference 's' on any .dot notation
        ? 's'
        // but if we are first then we check locals first, and if so read it first.
        // there is a problem with the dot notation with keys with spaces
        // maybe we could move to brackets [" "]
        : '((l&&l.hasOwnProperty("' + key + '"))?l:s)') + '.' + key + ';\n';
    });
    code += 'return s;';

    /* jshint -W054 */
    var evaledFnGetter = new Function('s', 'l', code); // s=scope, l=locals
    /* jshint +W054 */
    evaledFnGetter.toString = valueFn(code);

    fn = evaledFnGetter;
  }

  fn.sharedGetter = true;
  fn.assign = function(self, value) {
    return setter(self, path, value, path);
  };
  getterFnCache[path] = fn;
  return fn;
}

var objectValueOf = Object.prototype.valueOf;

function getValueOf(value) {
  return isFunction(value.valueOf) ? value.valueOf() : objectValueOf.call(value);
}

///////////////////////////////////

/**
 * @ngdoc service
 * @name $parse
 * @kind function
 *
 * @description
 *
 * Converts Angular {@link guide/expression expression} into a function.
 *
 * ```js
 *   var getter = $parse('user.name');
 *   var setter = getter.assign;
 *   var context = {user:{name:'angular'}};
 *   var locals = {user:{name:'local'}};
 *
 *   expect(getter(context)).toEqual('angular');
 *   setter(context, 'newValue');
 *   expect(context.user.name).toEqual('newValue');
 *   expect(getter(context, locals)).toEqual('local');
 * ```
 *
 *
 * @param {string} expression String expression to compile.
 * @returns {function(context, locals)} a function which represents the compiled expression:
 *
 *    * `context` – `{object}` – an object against which any expressions embedded in the strings
 *      are evaluated against (typically a scope object).
 *    * `locals` – `{object=}` – local variables context object, useful for overriding values in
 *      `context`.
 *
 *    The returned function also has the following properties:
 *      * `literal` – `{boolean}` – whether the expression's top-level node is a JavaScript
 *        literal.
 *      * `constant` – `{boolean}` – whether the expression is made entirely of JavaScript
 *        constant literals.
 *      * `assign` – `{?function(context, value)}` – if the expression is assignable, this will be
 *        set to a function to change its value on the given context.
 *
 */


/**
 * @ngdoc provider
 * @name $parseProvider
 *
 * @description
 * `$parseProvider` can be used for configuring the default behavior of the {@link ng.$parse $parse}
 *  service.
 */
var $parse = (function $ParseProvider() {
  var cache = createMap();

  var $parseOptions = {
    csp: false
  };

  return function (exp, interceptorFn) {
    var parsedExpression, oneTime, cacheKey;

    switch (typeof exp) {
      case 'string':
        cacheKey = exp = exp.trim();

        parsedExpression = cache[cacheKey];

        if (!parsedExpression) {
          if (exp.charAt(0) === ':' && exp.charAt(1) === ':') {
            oneTime = true;
            exp = exp.substring(2);
          }

          var lexer = new Lexer($parseOptions);
          var parser = new Parser(lexer, $parseOptions);
          parsedExpression = parser.parse(exp);
          cache[cacheKey] = parsedExpression;
        }
        return addInterceptor(parsedExpression, interceptorFn);

      case 'function':
        return addInterceptor(exp, interceptorFn);

      default:
        return addInterceptor(noop, interceptorFn);
    }
  };

  function addInterceptor(parsedExpression, interceptorFn) {
    if (!interceptorFn) return parsedExpression;

    return function interceptedExpression(scope, locals) {
      var value = parsedExpression(scope, locals);
      var result = interceptorFn(value, scope, locals);
      // we only return the interceptor's result if the
      // initial value is defined (for bind-once)
      return isDefined(value) ? result : value;
    };
  }
})();
/**
 * @const
 * constant RegExp contains all unwrapped function
 * that return the result and not an WrapperInstance
 * @type {RegExp}
 */
var UNWRAPPED_FUNC = /^(?:value|identity)$/;

/**
 * @const
 * prototype methods, used for chaining and static methods
 */
var PROTO_METHODS = {
  STRING: ['charAt', 'concat', 'indexOf', 'lastIndexOf', 'match', 'replace','slice', 'substr', 'substring', 'toLowerCase', 'toUpperCase'],
  ARRAY:  ['concat', 'join', 'pop', 'push', 'shift', 'sort', 'splice', 'unshift', 'indexOf', 'lastIndexOf'],
  NUMBER: ['abs', 'ceil', 'cos', 'floor', 'round', 'sin', 'sqrt', 'pow', 'tan']
};

var AGILE_METHODS = {
  BASE  : [
    { name: 'add',   action: add   },
    { name: 'value', action: value }],
  OBJECT: [
    { name: 'keys',    action: objKeys },
    { name: 'toArray', action: toArray },
    { name: 'extend',  action: extend  },
    { name: 'forEach', action: forEach }],
  STRING: [
    { name: 'startsWith', action: startsWith },
    { name: 'endsWith',   action: endsWith   },
    { name: 'trim',       action: trim       },
    { name: 'ltrim',      action: ltrim      },
    { name: 'rtrim',      action: rtrim      },
    { name: 'repeat',     action: repeat     },
    { name: 'slugify',    action: slugify    },
    { name: 'stringular', action: stringular },
    { name: 'stripTags',  action: stripTags  },
    { name: 'truncate',   action: truncate   },
    { name: 'ucfirst',    action: ucfirst    },
    { name: 'wrap',       action: wrap       },
    { name: 'reverse',    action: reverse    }],
  ARRAY : [
    { name: 'after',         action: after         },
    { name: 'afterWhere',    action: afterWhere    },
    { name: 'before',        action: before        },
    { name: 'beforeWhere',   action: beforeWhere   },
    { name: 'contains',      action: contains      },
    { name: 'countBy',       action: countBy       },
    { name: 'defaults',      action: defaults      },
    { name: 'map',           action: map           },
    { name: 'contains',      action: contains      },
    { name: 'find',          action: find          },
    { name: 'findIndex',     action: findIndex     },
    { name: 'findLast',      action: findLast      },
    { name: 'findLastIndex', action: findLastIndex },
    { name: 'first',         action: first         },
    { name: 'last',          action: last          },
    { name: 'flatten',       action: flatten       },
    { name: 'every',         action: every         },
    { name: 'groupBy',       action: groupBy       },
    { name: 'omit',          action: omit          },
    { name: 'filter',        action: filter        },
    { name: 'remove',        action: remove        },
    { name: 'reverse',       action: reverse       }, //TODO:
    { name: 'unique',        action: unique        }, // Maybe we could set the name as an array for aliases issue
    { name: 'uniq',          action: unique        }, // { name: ['uniq', 'unique'], action: unique }
    { name: 'xor',           action: xor           },
    { name: 'max',           action: max           },
    { name: 'min',           action: min           },
    { name: 'sum',           action: sum           },
    { name: 'pluck',         action: map           },
    { name: 'pick',          action: filter        },
    { name: 'some',          action: contains      },
    { name: 'orderBy',       action: orderBy       },
    { name: 'sortBy',        action: orderBy       },
    { name: 'forEach',       action: forEach       }] // DRY, remove common collection's function to owned array
};

/**
 * @private
 * @description
 * get a constructor and extends it's prototype.
 * based on the real type prototype + relevant static methods
 * @param ctor
 * @param methods
 * @param prototype
 */
function defineWrapperPrototype(ctor, methods, prototype) {
  forEach(methods, function(method) {
    var methodName = isString(method) ? method : method.name;
    var func = isString(method) ? prototype[method]
      : isObject(method) ? method.action //if it's method with custom name
      : method;
    //if it's a prototype function, but not a static function, e.g: Math.pow
    var isStatic = isString(method) && !(prototype.E);
    ctor.prototype[methodName] = function() {
      var fnArgs = Array.prototype.slice.call(arguments);
      var args   = [this.__value__].concat(fnArgs);
      var res  = isStatic
        ? func.call(this.__value__, fnArgs)
        : func.apply(this, args);
      return UNWRAPPED_FUNC.test(methodName) || isBoolean(res)
        ? res
        : agile(res);
    };
  });
}

/**
 * @private
 * @description
 * get a constructor and extends it's static methods based on given list
 * @param ctor
 * @param methods
 */
function defineStaticMethods(ctor, methods) {
  forEach(methods, function(method) {
    ctor[method.name] = isFunction(method) ? method : method.action;
  });
}

/**
 * @constructor StringWrapper
 * @description
 * wraps a string and implements the methods of agile and String.prototype
 * @param value {String}
 */
function StringWrapper(value) {
  this.__value__ = value;
}
//bind the methods to StringWrapper.prototype
var stringWrapperMethods = flatten([PROTO_METHODS.STRING, AGILE_METHODS.STRING, AGILE_METHODS.BASE]);
defineWrapperPrototype(StringWrapper, stringWrapperMethods, String.prototype);

/**
 * @constructor ArrayWrapper
 * @description
 * wraps an array and implements the methods of agile and Array.prototype
 * @param value {Array}
 */
function ArrayWrapper(value) {
  this.__value__ = value;
}
//bind the collection methods to ArrayWrapper.prototype
var arrayWrapperMethods = flatten([PROTO_METHODS.ARRAY, AGILE_METHODS.ARRAY, AGILE_METHODS.BASE]);
defineWrapperPrototype(ArrayWrapper, arrayWrapperMethods, Array.prototype);

/**
 * @constructor ObjectWrapper
 * @description
 * wraps an object and implements the methods of object and Object.prototype
 * @param value {Object}
 */
function ObjectWrapper(value) {
  this.__value__ = value;
}
//bind the object methods to ObjectWrapper.prototype
var objectWrapperMethods = flatten([AGILE_METHODS.OBJECT, AGILE_METHODS.BASE]);
defineWrapperPrototype(ObjectWrapper, objectWrapperMethods, Object.prototype);

/**
 * @constructor NumberWrapper
 * @description
 * wraps an number and implements the methods of number and Number.prototype
 * @param value {Number}
 */
function NumberWrapper(value) {
  this.__value__ = value;
}
//bind the number methods to NumberWrapper.prototype
var numberWrapperMethods = flatten([PROTO_METHODS.NUMBER, AGILE_METHODS.BASE]);
defineWrapperPrototype(NumberWrapper, numberWrapperMethods, Math);

/**
 * @private
 * @description
 * return Wrapper::constructor based on given value
 * @param val
 * @returns {*}
 */
function getWrapperCtor(val) {
  switch (typeof val) {
    case 'string':
      return StringWrapper;
    case 'number':
      return NumberWrapper;
    case 'object':
      return isArray(val) ? ArrayWrapper : ObjectWrapper;
    default :
      throw Error('Agile value can\'t be ['+ typeof val + '] as an argument');
  }
}

/**
 * @constructor agile
 * @param value
 */
function agile(value) {
  if(value && value.__wrapped__) {
    return value;
  } else {
    var ctor = getWrapperCtor(value), inst;
    (inst = new ctor(value)).__wrapped__ = true;
    return inst;
  }
}
//@static methods as wrappers
var agileStaticMethods = flatten([AGILE_METHODS.BASE, AGILE_METHODS.ARRAY, AGILE_METHODS.STRING, AGILE_METHODS.OBJECT]);
defineStaticMethods(agile, agileStaticMethods);

// @static boolean methods
agile.isString    = isString;
agile.isObject    = isObject;
agile.isNumber    = isNumber;
agile.isUndefined = isUndefined;
agile.isDefined   = isDefined;
agile.isArray     = isArray;
agile.isDate      = isDate;
agile.isFunction  = isFunction;
agile.isEmpty     = isEmpty;
//@static utils methods
agile.copy       = copy;
agile.equals     = equals;
agile.identity   = value;
agile.dictionary = createMap;
agile.noop       = noop;
agile.uppercase  = uppercase;
agile.lowercase  = lowercase;
agile.toJson     = toJson;
//@static parse method
agile.parse      = $parse;

//Expose agile.js
function runInContext(context) {
  // Node.js
  return (typeof module === "object" && module && module.exports === context)
    ? module.exports = agile
    // Browsers
    : context[(context._) ? 'agile' : '_'] = agile;
}

//@expose agile
runInContext(context);

})( this );