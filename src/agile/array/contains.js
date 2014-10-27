/**
 * @name contains
 * @kind function
 *
 * @description
 * Checks if given exp is present in one or more object in the array
 * aliases: _.some
 */

function contains(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return true;
  }

  return array.some( function(elm) {
    return (isObject(elm) || isFunction(exp)) ?
      $parse(exp)(elm) :
      elm === exp;
  });
}