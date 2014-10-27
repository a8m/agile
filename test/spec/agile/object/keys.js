'use strict';
describe('deep-keys', function() {

  var keys = deepKeys;

  it('should return array composed of it\'s properties names', function() {
    expect(keys({ a:1, b:2, c:3, d:4  })).toEqual(['a', 'b', 'c', 'd']);
    expect(keys({})).toEqual([]);
  });

  it('should return owned properties', function() {
    var obj = {
      a: { b: 1, c: 2 }
    };
    expect(keys(obj.a)).toEqual(['b', 'c']);
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
    expect(keys(obj1)).toEqual(['a', 'b.c', 'c.d.e', 'c.f', 'd.e.f.g', 'd.e.f.h', 'e', 'f.g']);

    var obj2 = {
      type: 'customer',
      details: {
        name: 'Ariel', age: 26, address: { city: 'Tel Aviv', country: 'Israel' }
      },
      isActive: true
    };
    expect(keys(obj2)).toEqual([
      'type',
      'details.name',
      'details.age',
      'details.address.city',
      'details.address.country',
      'isActive'
    ]);
  });

});