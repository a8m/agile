/**
 * @name slugify
 * @kind function
 *
 * @description
 * remove spaces from string, replace with "-" or given argument
 */
function slugify(input, sub) {

  var replace = sub || '-';

  return isString(input)
    ? input.toLowerCase().replace(/\s+/g, replace)
    : input;
}