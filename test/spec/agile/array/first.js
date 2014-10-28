'use strict';

describe('first', function() {

  it('should return the first member in a collection', function() {
    expect(first([1,2,3,4,5])).toEqual(1);
    expect(first(['a', 'b', 'c', 'd'])).toEqual('a');
    expect(first([undefined, null, null])).toEqual(undefined);
    expect(first([ {0: 'foo'} ])).toEqual({ 0: 'foo' });
  });

  it('should return first n elements of a collection', function() {
    expect(first([1,2,3,4,5], 3)).toEqual([1,2,3]);
    expect(first([undefined, null, null], 1)).toEqual([undefined]);
    expect(first({0: 'foo', 1: 'bar'}, 2)).toEqual(['foo', 'bar']);
  });

  it('should return the first element that match the expression', function() {
    var users = [
      { id: 1, name: { first: 'foo', last: 'bar' } },
      { id: 2, name: { first: 'baz', last: 'bar' } },
      { id: 3, name: { first: 'bar', last: 'bar' } },
      { id: 4, name: { first: 'lol', last: 'bar' } }
    ];

    expect(first(users, 'name.first === name.last')).toEqual([ users[2] ]);
    expect(first(users, '!(id % 2)')).toEqual([ users[1] ]);
    expect(first(users, 'name.first === \'lol\' && name.last === \'bar\'')).toEqual([ users[3] ]);
    expect(first(users, 'id > 5')).toEqual([]);
  });

  it('should return the first n element that match the expression', function() {
    var users = [
      { id: 1, name: { first: 'foo', last: 'bar' } },
      { id: 2, name: { first: 'baz', last: 'bar' } },
      { id: 3, name: { first: 'bar', last: 'bar' } },
      { id: 4, name: { first: 'lol', last: 'bar' } }
    ];

    expect(first(users, 2, 'name.first === name.last')).toEqual([ users[2] ]);
    expect(first(users, 2, '!(id % 2)')).toEqual([ users[1], users[3] ]);
    expect(first(users, 'id > 5')).toEqual([]);

    function mod2(elm) {
      return !(elm%2);
    }

    expect(first([1, 2, 3, 4], 2, mod2)).toEqual([2, 4]);
    expect(first([1, 2, 3, 4, 6], 2, mod2)).toEqual([2, 4]);
    expect(first([1, 2], 2, mod2)).toEqual([2]);
  });

  it('should get !collection and return it as-is', function() {
    expect(first('string')).toEqual('string');
    expect(first(1010)).toEqual(1010);
    expect(first(!0)).toBeTruthy();
  });

});