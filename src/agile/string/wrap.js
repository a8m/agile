/**
 * @name wrap
 * @kind function
 *
 * @description
 * Wrap a string with another string
 */
function wrap(input, wrap, ends) {

  if(!isString(input) || isUndefined(wrap)) {
    return input;
  }

  return [wrap, input, ends || wrap].join('');

}