'use strict';

describe('after', function() {
  
  it('should get array as a collection and specified count, and returns all of the items' +
    'in the collection after the specified count.', function() {
    var array = [{ a: 1 }, { a: 2 }];

    expect(after(array, 1)).toEqual([{ a:2 }]);
    expect(after([1,2,3,4], 1)).toEqual([2,3,4]);
    expect(after([1,2,3,4], 5)).toEqual([]);
  });


  it('should get a !collection and return it as-is', function() {
    expect(after(!1)).toBeFalsy();
    expect(after(1)).toEqual(1);
    expect(after('string')).toEqual('string');
  });
});