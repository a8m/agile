/**
 * @ngdoc filter
 * @name min
 * @kind function
 *
 * @description
 * Math.min
 */

function min(input) {
    return (isArray(input)) ?
        Math.min.apply(Math, input) :
        input;
}