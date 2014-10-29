/**
 * @name ltrim
 * @kind function
 *
 * @description
 * Left trim. Similar to trim, but only for left side.
 */
function ltrim(input, chars) {

  var trim = chars || '\\s';

  if(!isString(input)) {
    return input;
  }

  return input.replace(new RegExp('^' + trim + '+'), '');
}