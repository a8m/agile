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

