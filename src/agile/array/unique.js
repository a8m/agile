/**
 * @name unique/uniq
 * @kind function
 *
 * @description
 * get array and filter duplicate members
 * if uniqueFilter get a property(nested to) as argument it's
 * filter by this property as unique identifier
 */
function unique(array, property) {
  
  if (!isArray(array)) {
    return array;
  }

  //store all unique identifiers
  var uniqueItems = [],
    get = $parse(property);

  return (isUndefined(property)) ?
    //if it's kind of primitive array
    array.filter(function (elm, pos, self) {
      return self.indexOf(elm) === pos;
    }) :
    //else compare with equals
    array.filter(function (elm) {
      var prop = get(elm);
      if(some(uniqueItems, prop)) {
        return false;
      }
      uniqueItems.push(prop);
      return true;
    });

  //checked if the unique identifier is already exist
  function some(array, member) {
    if(isUndefined(member)) {
      return false;
    }
    return array.some(function(el) {
      return equals(el, member);
    });
  }

}