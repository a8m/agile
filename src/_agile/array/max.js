/**
 * @name max
 * @kind function
 *
 * @description
 * Math.max will get an array return the max value. if an expression
 * is provided, will return max value by expression.
 */
function max(input, expression) {
    if(!isArray(input)) {
        return input;
    }
    return isUndefined(expression)
        ? Math.max.apply(Math, input)
        : input[indexByMath('max', input, expression)]
}
