/**
 * @name countBy
 * @kind function
 *
 * @description
 * Gets an array and $parse:expression,
 * and returns a count for the number of objects in each group.
 */

function countBy(array, exp) {

  var result = {},
    prop;

  if(!isArray(array) || isUndefined(exp)) {
    return array;
  }

  array.forEach( function(elm) {
    prop = $parse(exp)(elm);

    if(!result[prop]) {
      result[prop] = 0;
    }

    result[prop]++;
  });

  return result;
}