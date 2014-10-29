/**
 * The `agile` function.
 * @name _
 * @constructor
 * @param {Mixed} value The value to wrap in a `agile` instance.
 * @returns {Object} Returns a `agile` instance.
 */
function agile(value) {
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
agile.ltrim       = ltrim;
agile.rtrim       = rtrim;
agile.repeat      = repeat;
agile.slugify     = slugify;
agile.stringular  = stringular;