/**
 * @name flatten
 * @kind function
 *
 * @description
 * Flattens a nested array (the nesting can be to any depth).
 * If shallow, the array will only be flattened a one level
 */
function flatten(array, shallow) {

  shallow = shallow || false;

  if(!isArray(array)) {
    return array;
  }

  return (!shallow) ? depthFlatten(array, 0) :
    [].concat.apply([], array);
}

/**
 * flatten nested array (the nesting can be to any depth).
 * @param array {Array}
 * @param i {int}
 * @returns {Array}
 * @private
 */
function depthFlatten(array, i) {
  i = i || 0;

  if(i >= array.length)
    return array;

  if(isArray(array[i])) {
    return depthFlatten(array.slice(0,i)
      .concat(array[i], array.slice(i+1)), i);
  }
  return depthFlatten(array, i+1);
}