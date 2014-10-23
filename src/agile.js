/**
 * The `agile` function.
 * @name _
 * @constructor
 * @param {Mixed} value The value to wrap in a `agile` instance.
 * @returns {Object} Returns a `agile` instance.
 */
function agile(value) {
  // if it's defined, and already wrapped.
  if (value && value.__wrapped__) {
    return value;
  }
  // allow invoking `agile` without the `new` operator
  if (!(this instanceof lodash)) {
    return new agile(value);
  }
  this.__wrapped__ = value;
}

// @static boolean methods
agile.isString    = isString;
agile.isObject    = isObject;
agile.isNumber    = isNumber;
agile.isUndefined = isUndefined;
agile.isDefined   = isDefined;
agile.isArray     = isArray;
agile.isDate      = isDate;
agile.isFunction  = isFunction;

//@static utils methods
agile.equals    = equals;
agile.identity  = identity;
agile.extend    = extend;
agile.createMap = createMap;
agile.noop      = noop;
agile.uppercase = uppercase;
agile.lowercase = lowercase;
agile.toJson    = toJson;