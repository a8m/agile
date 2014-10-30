/**
 * @name max
 * @kind function
 *
 * @description
 * Math.max
 */
function max(input) {
    return (isArray(input)) ?
        Math.max.apply(Math, input) :
        input;
}