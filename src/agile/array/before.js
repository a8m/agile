/**
 * @name before
 * @kind function
 *
 * @description
 * get a array and specified count, and returns all of the items
 * in the array before the specified count.
 */

function before(array, count) {
  return (isArray(array)) ?
    array.slice(0, (!count) ? count : --count) :
    array;
}
