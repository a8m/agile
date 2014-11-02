'use strict';
describe('common chain methods', function() {
  var _ = agile;
  describe('#add', function() {
    it('should works with arrays', function() {
      expect(add([1,2,3], 4,5,6)).toEqual([1, 2, 3, 4, 5, 6]);
      expect(add([1,2,3], [1,2,3])).toEqual([1, 2, 3, [1,2,3]]);
      expect(add([1,2,3], null)).toEqual([1, 2, 3, null]);
    });

    it('should works with object', function() {
      expect(add({},{a:1})).toEqual({a:1});
      expect(add({a:1},{a:2})).toEqual({a:2});
      expect(add({}, 1)).toEqual({0:1});
      expect(add({},'a')).toEqual({0:'a'});
    });

    it('should work with numbers', function() {
      expect(add(10, 1,1,1)).toEqual(13);
      expect(add(10, 'a',2)).toEqual(12);
      expect(add(10, [], 1,5,[])).toEqual(16);
    });

    it('should work with strings', function() {
      expect(add('a', 'b')).toEqual('ab');
      expect(add('a', 'b', 'c')).toEqual('abc');
      expect(add('a', [])).toEqual('a');
      expect(add('a', 3)).toEqual('a');
    });

    it('should work on chaining', function() {
      //arrays
      expect(_([])
        .add(3,4,5,6)
        .value())
        .toEqual([3,4,5,6]);
      //strings
      expect(_('')
        .add('a', 'b', 'c')
        .repeat(2)
        .value())
        .toEqual('abcabc');
      //nums
      expect(_([1,2,3,4])
        .max()
        .add(100,200)
        .value())
        .toEqual(304);
      //object
      expect(_({})
        .add({v:4})
        .value())
        .toEqual({v:4});
    });
  });

});