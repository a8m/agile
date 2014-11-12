/**
 * @name findLastIndex
 * @kind function
 *
 * @description
 * Iterate over the given array and return the index of the last member that the expression
 * returns truthy for
 */
function findLastIndex(array, exp) {

  if(!isArray(array) || isUndefined(exp)) {
    return array;
  }
  //return the the index of the last member
  var index = (array.length - 1) - findInArray(reverse(array), $parse(exp), true);
  //if it's a NaN
  return index === index ? index : -1;
}
