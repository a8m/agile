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