'use strict';

describe('omit', function() {

  it('should get array as a collection and omit by expression', function() {
    var array = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(omit(array, 'id === 1')).toEqual([array[1]]);
    expect(omit(array, 'id === 1 && name === "foo"')).toEqual([array[1], array[2], array[3]]);
    expect(omit(array)).toEqual(array);
  });

  it('should work safety', function() {
    var array = [
      null, false, 2, 'string',
      { details: { id: 2 } },
      { details: { id: 1 } }
    ];
    expect(omit(array, 'details.id > 0')).toEqual([null, false, 2, 'string']);
  });

  it('should work with primitives', function() {
    var array = [7,7,4,3,6,7,7];
    expect(omit(array, 7)).toEqual([4,3,6]);
  });

  it('should get function as expression', function() {
    var array = [1, 2, 3, 4, 5];

    function mod2(elm) {
      return !(elm % 2);
    }

    expect(omit(array, mod2)).toEqual([1, 3, 5]);
  });

  it('should get !collection and return it as-is', function() {
    expect(omit('lorem ipsum')).toEqual('lorem ipsum');
    expect(omit(1, null)).toEqual(1);
    expect(omit(!1)).toBeFalsy();
  });

});