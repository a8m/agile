/**
 * @name remove
 * @kind function
 *
 * @description
 * remove specific members from array by equality
 */
function remove(array) {
  
  var args = Array.prototype.slice.call(arguments, 1);

  if(!isArray(array) || isEmpty(args)) {
    return array;
  }

  return array.filter(function(member) {
    return !args.some(function(nest) {
      return equals(nest, member);
    })
  });

}