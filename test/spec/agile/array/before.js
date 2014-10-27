'use strict';

describe('before', function() {

  it('should get array as a collection and specified count, and returns all of the items' +
    'in the collection before the specified count.', function() {
    var array = [{ a: 1 }, { a: 2 }];

    expect(before(array, 2)).toEqual([{ a: 1 }]);
    expect(before([1,2,3,4], 4)).toEqual([1,2,3]);
    expect(before([1,2,3,4], 5)).toEqual([1,2,3,4]);
  });

  it('should not get count and return the array as-is', function() {
    expect(before([1,2,4])).toEqual([1,2,4]);
  });

  it('should get a !collection and return it as-is', function() {
    expect(before(!1)).toBeFalsy();
    expect(before(1)).toEqual(1);
    expect(before('string')).toEqual('string');
  });
});