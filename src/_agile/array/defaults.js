/**
 * @name defaults
 * @kind function
 *
 * @description
 * defaults allows to specify a default fallback value for properties that resolve to undefined.
 */

function defaults(array, defaults) {

  if(!isArray(array) || !isObject(defaults)) {
    return array;
  }
  //get defaults keys(include nested).
  var keys = deepKeys(defaults);

  array.forEach(function(elm) {
    //loop through all the keys
    keys.forEach(function(key) {
      var getter = $parse(key);
      var setter = getter.assign;
      //if it's not exist
      if(isUndefined(getter(elm))) {
        //get from defaults, and set to the returned object
        setter(elm, getter(defaults))
      }
    });
  });

  return array;
}