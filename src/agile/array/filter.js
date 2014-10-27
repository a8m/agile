/**
 * @name filter
 * @kind function
 *
 * @description
 * filter by $parse:expression,
 * return all elements that return true, avoid the rest
 */
function filter(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return array;
  }

  return array.filter(function(elm) {
    return (isObject(elm) || isFunction(exp))
      ? $parse(exp)(elm)
      : elm === exp;
  });
}