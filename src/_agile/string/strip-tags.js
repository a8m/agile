/**
 * @name stripTags
 * @kind function
 *
 * @description
 * strip html tags from string
 */
function stripTags(input) {
  return isString(input)
    ? input.replace(/<\S[^><]*>/g, '')
    : input;
}