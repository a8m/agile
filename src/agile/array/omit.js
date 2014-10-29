/**
 * @name omit
 * @kind function
 *
 * @description
 * get an array, and return a new array without the omitted objects(by expression).
 */
function omit(array, expression) {

  if(!isArray(array) || isUndefined(expression)) {
    return array;
  }

  return array.filter(function (elm) {
    return !($parse(expression)(elm));
  });
}