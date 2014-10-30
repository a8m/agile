/**
 * @name omit
 * @kind function
 *
 * @description
 * get an array, and return a new array without the omitted objects(by expression).
 */
function omit(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return array;
  }

  return array.filter(function(elm) {
    return (isObject(elm) || isFunction(exp))
      ? !$parse(exp)(elm)
      : elm !== exp;
  });
}