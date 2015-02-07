/**
 * @name wrap
 * @kind function
 *
 * @description
 * Wrap a string with another string
 */
function wrap(input, wrap, ends) {
  return isString(input) && isDefined(wrap)
    ? [wrap, input, ends || wrap].join('')
    : input;
}