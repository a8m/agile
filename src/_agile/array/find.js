/**
 * @name find
 * @kind function
 *
 * @description
 * Iterate over the given array and return the first member that the expression
 * returns truthy for,
 */
function find(array, exp) {
  return (isArray(array) && isDefined(exp))
    //return the member and not an array like `first`
    ? findInArray(array, $parse(exp), false)
    : array;
}
