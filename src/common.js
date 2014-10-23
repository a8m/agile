'use strict';
var $parseMinErr = minErr('$parse');

var hasOwnProperty = Object.prototype.hasOwnProperty;


//Parse Dependencies
var NODE_TYPE_ELEMENT = 1;

/**
 * @private
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

function isWindow(obj) {
  return obj && obj.window === obj;
}

/**
 * @description
 * generate error message
 * @param {string} module The namespace to use for the new minErr instance.
 * @param {function} ErrorConstructor Custom error constructor to be instantiated when returning
 *   error from returned function, for cases when a particular type of error is useful.
 * @returns {function(code:string, template:string, ...templateArgs): Error} minErr instance
 */

function minErr(module, ErrorConstructor) {
  ErrorConstructor = ErrorConstructor || Error;
  return function () {
    var code = arguments[0],
      prefix = '[' + (module ? module + ':' : '') + code + '] ',
      template = arguments[1],
      templateArgs = arguments,
      stringify = function (obj) {
        if (typeof obj === 'function') {
          return obj.toString().replace(/ \{[\s\S]*$/, '');
        } else if (typeof obj === 'undefined') {
          return 'undefined';
        } else if (typeof obj !== 'string') {
          return JSON.stringify(obj);
        }
        return obj;
      },
      message, i;

    message = prefix + template.replace(/\{\d+\}/g, function (match) {
      var index = +match.slice(1, -1), arg;

      if (index + 2 < templateArgs.length) {
        arg = templateArgs[index + 2];
        if (typeof arg === 'function') {
          return arg.toString().replace(/ ?\{[\s\S]*$/, '');
        } else if (typeof arg === 'undefined') {
          return 'undefined';
        } else if (typeof arg !== 'string') {
          return toJson(arg);
        }
        return arg;
      }
      return match;
    });

    message = message + '\nhttp://errors.angularjs.org/1.3.0/' +
      (module ? module + '/' : '') + code;
    for (i = 2; i < arguments.length; i++) {
      message = message + (i == 2 ? '?' : '&') + 'p' + (i-2) + '=' +
        encodeURIComponent(stringify(arguments[i]));
    }
    return new ErrorConstructor(message);
  };
}


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