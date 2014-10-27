'use strict';

describe('every', function() {

  it('should get collection of primitives and use strict comparison(===)', function() {
    expect(every(['bar', 'bar'], 'bar')).toBeTruthy();
    expect(every([4,4,4,4], 4)).toBeTruthy();

    expect(every(['foo', 'bar'], 'bar')).toBeFalsy();
    expect(every([1,4,4,4], 4)).toBeFalsy();
  });

  it('should get array as collection and return if given expression is ' +
    'present all members in the collection', function() {

    var array = [
      { id: 1, name: 'faa' },
      { id: 1, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(every(array, 'id === 1')).toBeTruthy();
    expect(every(array, 'id >= 1 && name.indexOf(\'a\') !== -1')).toBeTruthy();
    expect(every(array)).toBeTruthy();

    expect(every(array, 'id > 77')).toBeFalsy();
    expect(every(array, 'name.indexOf(\'b\') !== -1')).toBeFalsy();
  });

  it('should get function as expression', function() {
    var array = [0, 2, 4, 6, 8];

    function mod2(elm) {
      return !(elm % 2);
    }

    expect(every(array, mod2)).toBeTruthy();
  });

  it('should get !collection and return always true', function() {

    expect(every('lorem ipsum')).toBeTruthy();
    expect(every(1, null)).toBeTruthy();
    expect(every(!1)).toBeTruthy();
  });
});