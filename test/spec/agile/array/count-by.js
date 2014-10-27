'use strict';

describe('countBy', function() {

  it('should returns a count for the number of objects in each group.', function() {
    var players = [
      {name: 'Gene',    team: { name: 'alpha' } },
      {name: 'George',  team: { name: 'beta'  } },
      {name: 'Steve',   team: { name: 'beta'  } },
      {name: 'Paula',   team: { name: 'alpha' } },
      {name: 'Scruath', team: { name: 'gamma' } }
    ];

    expect(countBy(players, 'team.name')).toEqual( {
      alpha: 2,
      beta: 2,
      gamma: 1
    });
  });

  it('should returns a count for the number of objects in each group.', function() {
    var players = [
      {name: 'Gene',    team: { members: 123 } },
      {name: 'George',  team: { members: 123  } },
      {name: 'Steve',   team: { members: 424  } },
      {name: 'Paula',   team: { members: 624  } },
      {name: 'Scruath', team: { members: 224  } },
    ];

    expect(countBy(players, 'team.members > 300')).toEqual( {
      'false': 3,
      'true' : 2
    });
  });

  it('should handle nested properties safety', function() {
    var orders = [
      { id:10, customer: { name: 'foo', id: 1 } },
      { id:11, customer: { name: 'bar', id: 2 } },
      { id:12, customer: { name: 'foo', id: 1 } },
      { id:13, customer: { name: 'bar', id: 2 } },
      { id:14, customer: { name: 'bar', id: 3 } },
      2, null, true
    ];

    expect(countBy(orders, 'customer.name')).toEqual( {
      foo: 2,
      bar: 3,
      undefined: 3
    });
  });


  it('should get !collection and return it as-is ', function() {
    expect(countBy('string')).toEqual('string');
    expect(countBy(1)).toEqual(1);
    expect(countBy(!1)).toBeFalsy();
    expect(countBy(null)).toBeNull();
  });

});