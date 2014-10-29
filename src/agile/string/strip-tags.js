/**
 * @name stripTags
 * @kind function
 *
 * @description
 * strip html tags from string
 */
function stripTags(input) {
  if(isString(input)) {
    return input.replace(/<\S[^><]*>/g, '');
  }
  return input;
}