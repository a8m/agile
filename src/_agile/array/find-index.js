/**
 * @name findIndex
 * @kind function
 *
 * @description
 * Iterate over the given array and return the index of the first member that the expression
 * returns truthy for
 */
function findIndex(array, exp) {
  return (isArray(array) && isDefined(exp))
    //return the the index of the member
    ? findInArray(array, $parse(exp), true)
    : array;
}
