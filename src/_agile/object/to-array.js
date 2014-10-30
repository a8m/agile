/**
 * @name toArray
 * @kind function
 *
 * @description
 * Convert objects into stable arrays.
 * if addKey set to true,the filter also attaches a new property
 * $key to the value containing the original key that was used in
 * the object we are iterating over to reference the property
 */
function toArray(collection, addKey) {

  if(!isObject(collection)) {
    return collection;
  }

  return Object.keys(collection).map(function (key) {
      return addKey
        ? extend(collection[key], { $key: key })
        : collection[key];
    });
}