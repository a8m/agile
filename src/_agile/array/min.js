/**
 * @ngdoc filter
 * @name min
 * @kind function
 *
 * @description
 * Math.min will get an array return the min value. if an expression
 * is provided, will return min value by expression.
 */
function min(input, expression) {
  if(!isArray(input)) {
    return input;
  }
  return isUndefined(expression)
    ? Math.min.apply(Math, input)
    : input[indexByMath('min', input, expression)]
}
