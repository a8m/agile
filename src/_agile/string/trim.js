/**
 * @name trim
 * @kind function
 *
 * @description
 *  Strip whitespace (or other characters) from the beginning and end of a string
 */
function trim(input, chars) {

  var trim = chars || '\\s';

  return isString(input)
    ? input.replace(new RegExp('^' + trim + '+|' + trim + '+$', 'g'), '')
    : input;
}