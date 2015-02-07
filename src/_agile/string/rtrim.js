/**
 * @name rtrim
 * @kind function
 *
 * @description
 * Right trim. Similar to trim, but only for the right side.
 */
function rtrim(input, chars) {

  var trim = chars || '\\s';

  return isString(input)
    ? input.replace(new RegExp(trim + '+$'), '')
    : input;
}