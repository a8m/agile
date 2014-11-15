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