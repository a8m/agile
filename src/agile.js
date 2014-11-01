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
  ARRAY:  ['concat', 'join', 'pop', 'push', 'shift', 'sort', 'splice', 'unshift'],
  NUMBER: ['abs', 'ceil', 'cos', 'floor', 'round', 'sin', 'sqrt', 'pow', 'tan']
};

var AGILE_METHODS = {
  BASE  : [value],
  OBJECT: [{ name: 'keys', action: objKeys }, toArray],
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
    var func = isString(method) ? prototype[method]
      : isObject(method) ? method.action //if it's method with custom name
      : method;
    ctor.prototype[methodName] = function() {
      var args = [this.__value__].concat(Array.prototype.slice.call(arguments));
      //if it's a prototype function, but not a static function, e.g: Math.pow
      //I'm not proud of this, but it'll get the job done for now.
      var res  = isString(method) && !(prototype[methodName])
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
      throw new Error('Agile value can\'t get ['+ typeof val + '] as an argument');
  }
}

/**
 * @constructor agile
 * @param value
 */
function agile(value) {
  if(value.__wrapped__) {
    return value;
  } else {
    var ctor = getWrapperCtor(value), inst;
    (inst = new ctor(value)).__wrapped__ = true;
    return inst;
  }
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