/**
 * @name findLast
 * @kind function
 *
 * @description
 * Iterate over the given array and return the last member that the expression
 * returns truthy for,
 */
function findLast(array, exp) {
  return (isArray(array) && isDefined(exp))
    //return the member and not an array like `last`
    ? findInArray(reverse(array), $parse(exp), false)
    : array;
}
