/**
 * @name after
 * @kind function
 *
 * @description
 * get an array and specified count, and returns all of the items
 * in the collection after the specified count.
 *
 */
function after(array, count) {
  return (isArray(array)) ?
    array.slice(count) :
    array;
}