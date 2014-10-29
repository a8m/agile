'use strict';

describe('xor', function() {

  it('should get 2 array collection and return exclusive or between them', function() {
    expect(xor([1,2], [1])).toEqual([2]);
    expect(xor([1, 2, 3], [5, 2, 1, 4])).toEqual([3, 5, 4]);

    expect(xor([1, 2, 3], [4, 5])).toEqual([1, 2, 3, 4, 5]);
    expect(xor([1, 2, 3], [2, 3, 4])).toEqual([1, 4]);
  });

  it('should get an objects collection and filters by value', function() {

    var array = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
      { id: 3, name: 'baz' }
    ];

    expect(xor(array, array)).toEqual([]); // A (xor) A
    expect(xor(array, [ { id: 1, name:'foo' } ])).toEqual([array[1], array[2]]);
    expect(xor(array, [ { id: 1 } ])).toEqual(
      array.concat([{ id: 1 }])
    );
  });

  it('should xor by specific property', function() {
    var users = [
      { id: 0, details: { first_name: 'foo', last_name: 'bar' } },
      { id: 1, details: { first_name: 'foo', last_name: 'baz' } },
      { id: 2, details: { first_name: 'foo', last_name: 'bag' } }
    ];

    expect(xor(users, [{ details: { first_name: 'foo' } }], 'details.first_name'))
      .toEqual([]);
    expect(xor(users, [{ id: 0 }, { id: 1 }], 'id')).toEqual([users[2]]);
    expect(xor(users, [{ id: 3, details: { first_name: 'foo', last_name: 'bag' }}], 'id'))
      .toEqual(
        users.concat([{ id: 3, details: { first_name: 'foo', last_name: 'bag' }}]
        ));
  });

  it('should xor by expression', function() {
    expect(xor([ { id: 2 }, { id: 3 }], [ { id: 4 } ], 'id % 2')).toEqual([{ id: 3 }])
  });


  it('should get !collection and return it as-is', function() {
    expect(xor(999)).toEqual(999);
    expect(xor(!1)).toBeFalsy();
    expect(null).toEqual(null);
  });

});