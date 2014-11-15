/**
 * @name orderBy
 * @kind function
 * fork of AngularJS#orderByFilter
 *
 * @description
 * Orders a specified array by the expression predicate.
 * It is ordered alphabetically for strings and numerically for numbers.
 */
function orderBy(array, sortPredicate, reverseOrder) {
  if (!isArrayLike(array)) {
    return array;
  }
  sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate];
  if (sortPredicate.length === 0) { sortPredicate = ['+']; }
  sortPredicate = sortPredicate.map(function(predicate) {
    var descending = false;
    var get = predicate || value;
    if (isString(predicate)) {
      if ((predicate.charAt(0) == '+' || predicate.charAt(0) == '-')) {
        descending = predicate.charAt(0) == '-';
        predicate = predicate.substring(1);
      }
      if (predicate === '') {
        // Effectively no predicate was passed so we compare identity
        return reverseComparator(function(a, b) {
          return compare(a, b);
        }, descending);
      }
      get = $parse(predicate);
      if (get.constant) {
        var key = get();
        return reverseComparator(function(a, b) {
          return compare(a[key], b[key]);
        }, descending);
      }
    }
    return reverseComparator(function(a, b) {
      return compare(get(a),get(b));
    }, descending);
  });
  var arrayCopy = [];
  for (var i = 0; i < array.length; i++) { arrayCopy.push(array[i]); }
  return arrayCopy.sort(reverseComparator(comparator, reverseOrder));

  function comparator(o1, o2) {
    for (var i = 0; i < sortPredicate.length; i++) {
      var comp = sortPredicate[i](o1, o2);
      if (comp !== 0) break;
    }
    return comp;
  }
  function reverseComparator(comp, descending) {
    return descending
      ? function(a, b) {return comp(b,a);}
      : comp;
  }
  function compare(v1, v2) {
    var t1 = typeof v1;
    var t2 = typeof v2;
    if (t1 == t2) {
      if (isDate(v1) && isDate(v2)) {
        v1 = v1.valueOf();
        v2 = v2.valueOf();
      }
      if (t1 == "string") {
        v1 = v1.toLowerCase();
        v2 = v2.toLowerCase();
      }
      if (v1 === v2) return 0;
      return v1 < v2 ? -1 : 1;
    } else {
      return t1 < t2 ? -1 : 1;
    }
  }
}