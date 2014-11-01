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
  ARRAY:  ['concat', 'join', 'pop', 'push', 'shift', 'sort', 'splice', 'unshift']
};

var AGILE_METHODS = {
  BASE  : [value],
  STRING: [startsWith, endsWith, trim, ltrim, rtrim, repeat, slugify, stringular, stripTags, truncate, ucfirst, wrap],
  ARRAY : [after, afterWhere, before, beforeWhere, contains, countBy, defaults, map, contains, first,
          filter, last, flatten, groupBy, omit, filter, remove, reverse, unique, xor, max, min, sum]
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
    var func = isString(method) ? prototype[method] : method;
    ctor.prototype[methodName] = function() {
      var args = [this.__value__].concat(Array.prototype.slice.call(arguments));
      var res  = isString(method)
        ? func.call(this.__value__, arguments)
        : func.apply(this, args);
      return UNWRAPPED_FUNC.test(methodName)
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
    ctor[method.name] = method;
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
//bind the collection methods to ArrayWrapper.prototype and agile
var arrayWrapperMethods = flatten([PROTO_METHODS.ARRAY, AGILE_METHODS.ARRAY, AGILE_METHODS.BASE]);
defineWrapperPrototype(ArrayWrapper, arrayWrapperMethods, Array.prototype);


/**
 * @constructor agile
 * @param value
 */
function agile(value) {
  return new ArrayWrapper(value);
}
//@static methods as wrappers
var agileStaticMethods = flatten([AGILE_METHODS.ARRAY, AGILE_METHODS.STRING]);
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
agile.equals    = equals;
agile.identity  = value;
agile.extend    = extend;
agile.Map       = createMap;
agile.noop      = noop;
agile.uppercase = uppercase;
agile.lowercase = lowercase;
agile.toJson    = toJson;
agile.forEach   = forEach;

//@static object methods
agile.keys    = objKeys;
agile.toArray = toArray;