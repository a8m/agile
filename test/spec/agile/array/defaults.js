'use strict';

describe('defaults', function() {

  it('should return the collection as-is, if default object not provided', function() {
    expect(defaults([{}])).toEqual([{}]);
    expect(defaults([])).toEqual([]);
  });

  it('should change the source object', function() {
    var array       = [{ a: 1 }];
    var defaultsObj = { b: 2 };
    var copy        = window.copy(array);

    expect(defaults(array, defaultsObj)).toEqual([{ a:1, b: 2 }]);
    expect(array).not.toEqual(copy);
  });

  //test the simple usage
  describe('should use fallback value', function() {
    var expectOrders = [
      { id:1, destination: { zip: 21908 }, name: 'Ariel M.' },
      { id:2, destination: { zip: 'Pickup' }, name: 'John F.' },
      { id:3, destination: { zip: 45841 }, name: 'Not available'},
      { id:4, destination: { zip: 78612 }, name: 'Danno L.' }
    ];
    var defaultsObj = { name: 'Not available', destination: { zip: 'Pickup' } };

    it('should work with array', function() {
      var orders = [
        { id:1, destination: { zip: 21908 }, name: 'Ariel M.' },
        { id:2, name: 'John F.' },
        { id:3, destination: { zip: 45841 } },
        { id:4, destination: { zip: 78612 }, name: 'Danno L.' }
      ];
      var copyOrders = window.copy(orders);

      expect(defaults(copyOrders, defaultsObj)).toEqual(expectOrders);
      expect(defaults(copyOrders, defaultsObj)).not.toEqual(orders);
    });

  });

  it('should work fine with complex objects', function() {
    var array = [
      { a: 'string',
        b: { c: 1 },
        d: { e: { f: new Function() } },
        g: [],
        h: undefined,
        i: { j: { k: { l: 'm' } } },
        o: new RegExp }
    ];
    var copy        = window.copy(array);
    var defaultsObj = { z: 'z', z1: { z2: 'z2' } , h: 1 };
    extend(array[0], defaultsObj);
    expect(defaults(copy, defaultsObj)).toEqual(array);
  });

  it('should get !collection and return it as-is ', function() {
    expect(defaults('string')).toEqual('string');
    expect(defaults(1)).toEqual(1);
    expect(defaults(!1)).toBeFalsy();
    expect(defaults(null)).toBeNull();
  });

});