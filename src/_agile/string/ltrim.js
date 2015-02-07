/**
 * @name ltrim
 * @kind function
 *
 * @description
 * Left trim. Similar to trim, but only for left side.
 */
function ltrim(input, chars) {

  var trim = chars || '\\s';

  return isString(input)
    ? input.replace(new RegExp('^' + trim + '+'), '')
    : input;
}