//these methods is kind of common methods for chaining wrappers
/**
 * @description
 * add methods get an object extend(based on type) and return it.
 * @param object
 * @returns {*}
 * @example
 * add(1,2) ==> 3
 * add([],1) ==> [1]  
 * add('f','g') ==> 'fg'
 * add({}, {a:1}) ==> {a:1}
 */
function add(object) {
  var args = Array.prototype.slice.call(arguments, 1);
  //loop through all over the arguments
  forEach(args, function(value, i) {
    switch(typeof object) {
      case 'object':
        isArray(object)
          ? object.push(value)
          : extend(object, isObject(value) ? value : creObject(i, value));
        break;
      case 'string':
        object += isString(value) ? value : '';
        break;
      case 'number':
        object += isNumber(value) ? value : 0;
    }
  });
  return object;
}

/**
 * @private
 * @description
 * return an object that index is the key
 * @param i {Index}
 * @param value
 * @returns {Object}
 */
function creObject(i, value) {
  var o = {};
  o[i] = value;
  return o;
}
