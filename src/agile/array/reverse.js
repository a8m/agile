/**
 * @name reverse
 * @kind function
 *
 * @description
 * Reverses a string or collection
 */
function reverse(input) {

  if(isString(input)) {
    return input.split('').reverse().join('');
  }

  return (isArray(input)) ? input.slice().reverse() : input;
}