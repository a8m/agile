'use strict';
describe('last', function() {

  it('should return the last member in a collection', function() {
    expect(last([1,2,3,4,5])).toEqual(5);
    expect(last(['a', 'b', 'c', 'd'])).toEqual('d');
    expect(last([undefined, null, null])).toEqual(null);
    expect(last([{0: 'foo'}, { 1: 'bar'}])).toEqual({ 1: 'bar' });
  });

  it('should return last n elements of a collection', function() {
    expect(last([1, 2, 3, 4, 5], 3)).toEqual([3, 4, 5]);
    expect(last([undefined, null, null], 2)).toEqual([null, null]);
    expect(last({0: 'foo', 1: 'bar'}, 2)).toEqual(['foo', 'bar']);
  });

  it('should return the last element that match the expression', function() {
    var users = [
      { id: 1, name: { first: 'foo', last: 'bar' } },
      { id: 2, name: { first: 'baz', last: 'bar' } },
      { id: 3, name: { first: 'bar', last: 'bar' } },
      { id: 4, name: { first: 'lol', last: 'bar' } }
    ];

    expect(last(users, 'name.first === name.last')).toEqual([ users[2] ]);
    expect(last(users, '!(id % 2)')).toEqual([ users[3] ]);
    expect(last(users, 'name.first !== \'lol\' && name.last === \'bar\'')).toEqual([ users[2] ]);
    expect(last(users, 'id > 5')).toEqual([]);
  });

  it('should return the last n element that match the expression', function() {
    var users = [
      { id: 1, name: { first: 'foo', last: 'bar' } },
      { id: 2, name: { first: 'baz', last: 'bar' } },
      { id: 3, name: { first: 'bar', last: 'bar' } },
      { id: 4, name: { first: 'lol', last: 'bar' } }
    ];

    expect(last(users, 2, 'name.first !== name.last')).toEqual([users[1], users[3]]);
    expect(last(users, 2, '(id % 2)')).toEqual([users[0], users[2]]);
    expect(last(users, 'id > 5')).toEqual([]);

    function mod2(elm) {
      return !(elm%2);
    }

    expect(last([1, 2, 3, 4, 5, 6], 2, mod2)).toEqual([4, 6]);
    expect(last([1, 2, 3, 4, 6, 11], 2, mod2)).toEqual([4, 6]);
    expect(last([2,1], 2, mod2)).toEqual([2]);
  });

  it('should get !collection and return it as-is', function() {
    expect(last('string')).toEqual('string');
    expect(last(1010)).toEqual(1010);
    expect(last(!0)).toBeTruthy();
  });

  it('should run the test from the readme file', function() {
    var users = [
      { id: 1, user: { name: 'foo', isAdmin: true  } },
      { id: 2, user: { name: 'bar', isAdmin: false } },
      { id: 3, user: { name: 'baz', isAdmin: false } },
      { id: 4, user: { name: 'zak', isAdmin: true  } }
    ];

    expect(last(users)).toEqual(users[3]);
    expect(last(users, '!user.isAdmin')).toEqual([users[2]]);
    expect(last(users, 2)).toEqual([users[2], users[3]]);
    expect(last(users, 2, 'user.isAdmin')).toEqual([users[0], users[3]]);
  });

});