'use strict';
describe('deep-keys', function() {

  var keys = objKeys;

  it('should return array composed of it\'s properties names', function() {
    expect(keys({ a:1, b:2, c:3, d:4  })).toEqual(['a', 'b', 'c', 'd']);
    expect(keys({})).toEqual([]);
  });

  it('should return owned properties, `Object.keys`', function() {
    var obj = {
      a: { b: 1, c: 2, d: { f: 3 } }
    };
    expect(keys(obj.a)).toEqual(['b', 'c', 'd']);
  });

  it('should return deep keys', function() {
    var obj1 = {
      a: 1,
      b: { c: 1 },
      c: { d: { e: 1 }, f: 1 },
      d: { e: { f: { g: 1, h: 2 } } },
      e: 2,
      f: { g: [] }
    };
    expect(keys(obj1, true)).toEqual(['a', 'b.c', 'c.d.e', 'c.f', 'd.e.f.g', 'd.e.f.h', 'e', 'f.g']);

    var obj2 = {
      type: 'customer',
      details: {
        name: 'Ariel', age: 26, address: { city: 'Tel Aviv', country: 'Israel' }
      },
      isActive: true
    };
    expect(keys(obj2, true)).toEqual([
      'type',
      'details.name',
      'details.age',
      'details.address.city',
      'details.address.country',
      'isActive'
    ]);
  });

  it('should get a !not object, and return it as-is', function() {
    expect(keys('a')).toEqual('a');
    expect(keys(1)).toEqual(1);
    expect(keys(true)).toEqual(true);
  });

});