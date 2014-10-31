/**
 * @const
 * prototype methods, used for chaining and static methods
 */
var PROTO_METHODS = {
  STRING: ['charAt', 'concat', 'indexOf', 'lastIndexOf', 'match', 'replace','slice', 'substr', 'substring', 'toLowerCase', 'toUpperCase'],
  ARRAY:  ['concat', 'join', 'pop', 'push', 'shift', 'sort', 'splice', 'unshift']
};

var AGILE_METHODS = {
  STRING: [startsWith, endsWith, trim, ltrim, rtrim, repeat, slugify, stringular, stripTags, truncate, ucfirst, wrap],
  ARRAY:  [after, afterWhere, before, beforeWhere, contains, countBy, defaults, map, contains, first,
          filter, last, flatten, groupBy, omit, filter, remove, reverse, unique, xor, max, min, sum]
};

/**
 * StringWrapper
 * @param value
 * @constructor
 */
function StringWrapper(value) {
  this.__value__ = value;
}
//bind the methods to StringWrapper.prototype and agile
forEach(PROTO_METHODS.STRING, function(methodName) {
  StringWrapper.prototype[methodName] = function() {
    var func = String.prototype[methodName];
    var res  = func.apply(this.__value__, arguments);
    return isString(res)
      ? new StringWrapper(res)
      : new ArrayWrapper(res)
  }
});

/**
 * ArrayWrapper
 * @param value
 * @constructor
 */
function ArrayWrapper(value) {
  this.__value__ = value;
}
//bind the methods to StringWrapper.prototype and agile
forEach(PROTO_METHODS.ARRAY, function(methodName) {
  ArrayWrapper.prototype[methodName] = function() {
    var func = Array.prototype[methodName];
    var res  = func.apply(this.__value__, arguments);
    return isString(res)
      ? new StringWrapper(res)
      : new ArrayWrapper(res)
  }
});


/**
 * @constructor agile
 * @param value
 */
function agile(value) {
  return new ArrayWrapper(value);
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
agile.isEmpty     = isEmpty;

//@static utils methods
agile.equals    = equals;
agile.identity  = identity;
agile.extend    = extend;
agile.createMap = createMap;
agile.noop      = noop;
agile.uppercase = uppercase;
agile.lowercase = lowercase;
agile.toJson    = toJson;
agile.forEach   = forEach;

//@static array methods
agile.after       = after;
agile.afterWhere  = afterWhere;
agile.before      = before;
agile.beforeWhere = beforeWhere;
agile.contains    = contains;
agile.countBy     = countBy;
agile.defaults    = defaults;
agile.map         = map;
agile.some        = contains;
agile.first       = first;
agile.filter      = filter;
agile.last        = last;
agile.flatten     = flatten;
agile.groupBy     = groupBy;
agile.omit        = omit;
agile.pick        = filter;
agile.remove      = remove;
agile.reverse     = reverse;
agile.unique      = unique;
agile.uniq        = unique;
agile.xor         = xor;
agile.max         = max;
agile.min         = min;
agile.sum         = sum;

//@static object methods
agile.keys    = objKeys;
agile.toArray = toArray;

//@static strings methods
agile.startsWith  = startsWith;
agile.endsWith    = endsWith;
agile.trim        = trim;
agile.ltrim       = ltrim;
agile.rtrim       = rtrim;
agile.repeat      = repeat;
agile.slugify     = slugify;
agile.stringular  = stringular;
agile.stripTags   = stripTags;
agile.truncate    = truncate;
agile.ucfirst     = ucfirst;
agile.wrap        = wrap;
