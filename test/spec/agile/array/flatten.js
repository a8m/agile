'use strict';

'use strict';

describe('flatten', function() {

  it('should get a multiple nested array and return it flatten', function() {
    expect(flatten([[[[[0]]]]])).toEqual([0]);

    expect(flatten([[], 'A', 'B', ['C', 'D'], ['E', ['F'], []]]))
      .toEqual(['A', 'B', 'C', 'D', 'E', 'F']);

    expect(flatten([[[[null]]], [[null]], [null]]))
      .toEqual([null, null, null]);

    expect(flatten([[], 1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, [12, [[[[[13], [[[[14, 15]]]]]]]]]]]]]))
      .toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it('should flattened a single level, if shallow set to true', function() {
    expect(flatten(['out', ['out', ['in']], ['out', 'out', ['in', 'in']], ['out', 'out']], true))
      .toEqual(['out', 'out', ['in'], 'out', 'out', ['in', 'in'], 'out', 'out']);
    expect(flatten([[], 1, [1, [0, [0, [0]]], 1, [0]], 1, [1, [0]]], true))
      .toEqual([1, 1, [0, [0, [0]]], 1, [0], 1, 1, [0]]);
  });

  it('should get !collection, and return it as-is', function() {
    expect(flatten('string')).toEqual('string');
    expect(flatten(1, true)).toEqual(1);
    expect(flatten(~~undefined)).toEqual(0);
    expect(flatten(null)).toEqual(null);
  });

});