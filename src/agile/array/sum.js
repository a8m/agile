/**
 * @name sum
 * @kind function
 *
 * @description
 * Sum up all values within an array
 */

function sum(input, initial) {

    return (!isArray(input)) ? input :
        input.reduce(function(prev, curr) {
            return prev + curr;
        }, initial || 0);
}