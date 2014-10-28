'use strict';

describe('groupBy', function() {

  it('should get array as collection, property(nested to) as identifier and ' +
    'returns the composed aggregate object.', function() {
    var players = [
      {name: 'Gene', team: 'alpha'},
      {name: 'George', team: 'beta'},
      {name: 'Steve', team: 'gamma'},
      {name: 'Paula', team: 'beta'},
      {name: 'Scruath', team: 'gamma'}
    ];

    expect(groupBy(players, 'team')).toEqual( {
      alpha: [players[0]],
      beta: [players[1], players[3]],
      gamma: [players[2], players[4]]
    });
  });

  it('should support nested properties to', function() {
    var orders = [
      { id:10, customer: { name: 'foo', id: 1 } },
      { id:11, customer: { name: 'bar', id: 2 } },
      { id:12, customer: { name: 'foo', id: 1 } },
      { id:13, customer: { name: 'bar', id: 2 } },
      { id:14, customer: { name: 'bar', id: 3 } },
      2, null, true
    ];

    expect(groupBy(orders, 'customer.name')).toEqual( {
      foo: [orders[0], orders[2]],
      bar: [orders[1], orders[3], orders[4]],
      undefined: [2, null, true]
    });
  });

  it('should get !collection and return it as-is ', function() {
    expect(groupBy('string')).toEqual('string');
    expect(groupBy(1)).toEqual(1);
    expect(groupBy(!1)).toBeFalsy();
    expect(groupBy(null)).toBeNull();
  });
});