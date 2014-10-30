/**
 * @name last
 * @kind function
 *
 * @description
 * Gets the last element or last n elements of an array
 * if expression is provided, is returns as long the expression return truthy
 */
function last(array) {

  var n,
    getter,
    args,
    reversed;

  if(!isArray(array)) {
    return array;
  }

  //cuz reverse change our src array
  //and we don't want side effects
  reversed = array.slice();

  args = Array.prototype.slice.call(arguments, 1);
  n = (isNumber(args[0])) ? args[0] : 1;
  getter = (!isNumber(args[0]))  ? args[0] : (!isNumber(args[1])) ? args[1] : undefined;

  return (args.length) ?
    //send reversed array as arguments, and reverse it back as result
    getFirstMatches(reversed.reverse(), n,(getter) ? $parse(getter) : getter).reverse() :
    //get the last element
    reversed[reversed.length-1];
}
