/**
 * @name map
 * @kind function
 *
 * @description
 * Returns a new Array with the results of each expression execution.
 */
function map(array, expression) {

  if(!isArray(array) || isUndefined(expression)) {
    return array;
  }

  return array.map(function (elm) {
    return $parse(expression)(elm);
  });
}