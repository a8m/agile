/**
 * @ngdoc filter
 * @name before-where
 * @kind function
 *
 * @description
 * get an array and $parse:expression, and returns all of the items
 * in the array before the first that return true.
 */

function beforeWhere(array, exp) {
  if(!isArray(array) || isUndefined(exp))
    return array;

  var index = array.map(function(elm) {
    return $parse(exp)(elm);
  }).indexOf(true);

  return array.slice(0, (index === -1) ? array.length : ++index);
}