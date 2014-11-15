'use strict';

describe('orderBy', function() {

  describe('(Arrays)', function() {
    it('should return sorted array if predicate is not provided', function() {
      expect(orderBy([2, 1, 3])).toEqual([1, 2, 3]);

      expect(orderBy([2, 1, 3], '')).toEqual([1, 2, 3]);
      expect(orderBy([2, 1, 3], [])).toEqual([1, 2, 3]);
      expect(orderBy([2, 1, 3], [''])).toEqual([1, 2, 3]);

      expect(orderBy([2, 1, 3], '+')).toEqual([1, 2, 3]);
      expect(orderBy([2, 1, 3], ['+'])).toEqual([1, 2, 3]);

      expect(orderBy([2, 1, 3], '-')).toEqual([3, 2, 1]);
      expect(orderBy([2, 1, 3], ['-'])).toEqual([3, 2, 1]);

      expect(orderBy(['a', 1])).toEqual(['a', 1].sort());
      expect(orderBy([1, 'a'])).toEqual(['a', 1].sort());
    });


    it('should sort array in reverse if it\'s defined', function() {
      expect(orderBy([{a:15}, {a:2}], 'a')).toEqual([{a:2}, {a:15}]);
      expect(orderBy([{a:15}, {a:2}], 'a', true)).toEqual([{a:15}, {a:2}]);
      expect(orderBy([{a:15}, {a:2}], 'a', "T")).toEqual([{a:15}, {a:2}]);
      expect(orderBy([{a:15}, {a:2}], 'a', "reverse")).toEqual([{a:15}, {a:2}]);
    });


    it('should sort inherited from array', function() {
      function BaseCollection() {}
      BaseCollection.prototype = Array.prototype;
      var child = new BaseCollection();
      child.push({a:2});
      child.push({a:15});

      expect(Array.isArray(child)).toBe(false);
      expect(child instanceof Array).toBe(true);

      expect(orderBy(child, 'a', true)).toEqual([{a:15}, {a:2}]);
    });

    it('should sort array by predicate', function() {
      expect(orderBy([{a:15, b:1}, {a:2, b:1}], ['a', 'b'])).toEqual([{a:2, b:1}, {a:15, b:1}]);
      expect(orderBy([{a:15, b:1}, {a:2, b:1}], ['b', 'a'])).toEqual([{a:2, b:1}, {a:15, b:1}]);
      expect(orderBy([{a:15, b:1}, {a:2, b:1}], ['+b', '-a'])).toEqual([{a:15, b:1}, {a:2, b:1}]);
    });

    it('should sort array by date predicate', function() {
      // same dates
      expect(orderBy([
        { a:new Date('01/01/2014'), b:1 },
        { a:new Date('01/01/2014'), b:3 },
        { a:new Date('01/01/2014'), b:4 },
        { a:new Date('01/01/2014'), b:2 }],
        ['a', 'b']))
        .toEqual([
          { a:new Date('01/01/2014'), b:1 },
          { a:new Date('01/01/2014'), b:2 },
          { a:new Date('01/01/2014'), b:3 },
          { a:new Date('01/01/2014'), b:4 }]);

      // one different date
      expect(orderBy([
        { a:new Date('01/01/2014'), b:1 },
        { a:new Date('01/01/2014'), b:3 },
        { a:new Date('01/01/2013'), b:4 },
        { a:new Date('01/01/2014'), b:2 }],
        ['a', 'b']))
        .toEqual([
          { a:new Date('01/01/2013'), b:4 },
          { a:new Date('01/01/2014'), b:1 },
          { a:new Date('01/01/2014'), b:2 },
          { a:new Date('01/01/2014'), b:3 }]);
    });

    it('should use function as a compare function', function() {
      expect(
        orderBy(
          [{a:15, b:1},{a:2, b:1}],
          function(value) { return value['a']; })).
        toEqual([{a:2, b:1},{a:15, b:1}]);
    });

    it('should support string predicates with names containing non-identifier characters', function() {
      /*jshint -W008 */
      expect(orderBy([{"Tip %": .25}, {"Tip %": .15}, {"Tip %": .40}], '"Tip %"'))
        .toEqual([{"Tip %": .15}, {"Tip %": .25}, {"Tip %": .40}]);
      expect(orderBy([{"원": 76000}, {"원": 31000}, {"원": 156000}], '"원"'))
        .toEqual([{"원": 31000}, {"원": 76000}, {"원": 156000}]);
    });

    it('should throw if quoted string predicate is quoted incorrectly', function() {
      /*jshint -W008 */
      expect(function() {
        return orderBy([{"Tip %": .15}, {"Tip %": .25}, {"Tip %": .40}], '"Tip %\'');
      }).toThrow();
    });
  });

  describe('get Number, Boolean and ObjectLiteral as an arguments', function() {
    it('should not applied', function() {
      var inputs = [1, {}, false];
      inputs.forEach(function(input) {
        expect(orderBy(input)).toEqual(input);
      });
    });
  });

  describe('get String as an argument', function() {
    it('should return an array of characters sort by ascii code', function() {
      expect(orderBy('ariel')).toEqual(['a', 'e', 'i', 'l', 'r']);
      expect(orderBy('abc2dez')).toEqual(['2', 'a', 'b', 'c', 'd', 'e', 'z']);
      expect(orderBy('!@za')).toEqual(['!', '@', 'a', 'z']);
    });
  });
});