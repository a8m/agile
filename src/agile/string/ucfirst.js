/**
 * @name ucfirst
 * @kind function
 *
 * @description
 * upper case first char
 */
function ucfirst(input) {
  return isString(input) ? input.split(' ')
    .map(function (char) {
      return char.charAt(0).toUpperCase() + char.substring(1);
    }).join(' ') : input;
}
