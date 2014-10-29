/**
 * @name trim
 * @kind function
 *
 * @description
 *  Strip whitespace (or other characters) from the beginning and end of a string
 */
function trim(input, chars) {

  var trim = chars || '\\s';

  if(!isString(input)) {
    return input;
  }

  return input.replace(new RegExp('^' + trim + '+|' + trim + '+$', 'g'), '');
}