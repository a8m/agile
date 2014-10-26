/**
 * @name after-where
 * @kind function
 *
 * @description
 * get a an array and $parse:expression, and returns all of the items
 * in the array after the first that return true, include it.
 *
 */
function afterWhere(array, exp) {

  if(!isArray(array) || isUndefined(exp))
    return array;

  var index = array.map(function(elm) {
    return $parse(exp)(elm);
  }).indexOf(true);

  return array.slice((index === -1) ? 0 : index);
}