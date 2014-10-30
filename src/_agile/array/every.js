/**
 * @name every
 * @kind function
 *
 * @description
 * Checks if given exp is present in all members in the array
 */
function every(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return true;
  }

  return array.every(function(elm) {
    return (isObject(elm) || isFunction(exp))
      ? $parse(exp)(elm)
      : elm === exp;
  });

}