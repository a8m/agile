/**
 * @name stringular
 * @kind function
 *
 * @description
 * get string with {n} and replace match with enumeration values
 */
function stringular(input) {
  var args = Array.prototype.slice.call(arguments, 1);

  return input.replace(/{(\d+)}/g, function (match, number) {
    return isUndefined(args[number]) ? match : args[number];
  });

}