/**
 * @name rtrim
 * @kind function
 *
 * @description
 * Right trim. Similar to trim, but only for the right side.
 */
function rtrim(input, chars) {

  var trim = chars || '\\s';

  if(!isString(input)) {
    return input;
  }

  return input.replace(new RegExp(trim + '+$'), '');
}