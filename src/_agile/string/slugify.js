/**
 * @name slugify
 * @kind function
 *
 * @description
 * remove spaces from string, replace with "-" or given argument
 */
function slugify(input, sub) {

  var replace = sub || '-';

  if(isString(input)) {
    return input.toLowerCase()
      .replace(/\s+/g, replace);
  }

  return input;
}