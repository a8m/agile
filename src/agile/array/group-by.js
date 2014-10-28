/**
 * @name groupBy
 * @kind function
 *
 * @description
 * Create an object composed of keys generated from the result of running each element of a array,
 * each key is an array contains the results members.
 */
function groupBy(array, property) {
  var result = {},
      prop,
      getter = $parse(property);

  if(!isArray(array) || isUndefined(property)) {
    return array;
  }

  forEach(array, function(elm) {
    prop = getter(elm);

    if(!result[prop]) {
      result[prop] = [];
    }

    result[prop].push(elm);
  });

  return result;
}