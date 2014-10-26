'use strict';

describe('map', function() {
  
  it('should returns a new array with the results of each expression execution', function() {
    var array = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(map(array, 'name')).toEqual(['foo', 'baz', 'ariel', 'bar']);
    expect(map(array, 'id === 1 && name === "foo"')).toEqual([true, false, false, false]);
    expect(map(array)).toEqual(array);
  });

  it('should support nested properties, and handle error safety', function() {
    var array = [
      { name: 'Ariel',  details: { age: 25 } },
      { name: 'Dan',    details: { age: 22 } },
      { name: 'Sharon', details: { age: 29 } },
      { name: 'Eddi',   details: { age: 20 } }
    ];

    expect(map(array, 'details.age >= 20')).toEqual([true, true, true, true]);
    expect(map(array, 'details.age.now.age')).toEqual([undefined, undefined, undefined, undefined]);
    expect(map(array, '!(details.age % 2)')).toEqual([false, true, false, true]);
  });


  it('should get function as expression', function() {
    var array = [1, 2, 3, 4, 5];

    function divide(elm) {
      return (elm/2);
    }
    expect(map(array, divide)).toEqual([0.5, 1, 1.5, 2, 2.5]);
  });

  it('should get !collection and return it as-is', function() {
    expect(map('lorem ipsum')).toEqual('lorem ipsum');
    expect(map(1, null)).toEqual(1);
    expect(map(!1)).toBeFalsy();
  });
});