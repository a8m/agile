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