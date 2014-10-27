'use strict';

describe('contains', function() {

  it('should get collection of primitives and use strict comparison(===)', function() {
    expect(contains(['foo', 'bar'], 'bar')).toBeTruthy();
    expect(contains([1,2,3,4], 4)).toBeTruthy();

    expect(contains(['foo', 'bar'], 'baz')).toBeFalsy();
    expect(contains([1,2,3,4], -1)).toBeFalsy();
  });

  it('should get array as collection and return if given expression is ' +
    'present in one or more object in the collection', function() {
    var array = [
      { id: 1, name: 'foo' },
      { id: 2, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(contains(array, 'id === 2')).toBeTruthy();
    expect(contains(array, 'id >= 1 && name === \'foo\'')).toBeTruthy();
    expect(contains(array)).toBeTruthy();

    expect(contains(array, 'id > 77')).toBeFalsy();
    expect(contains(array, 'name.indexOf(\'u\') !== -1')).toBeFalsy();
  });

  it('should get function as expression', function() {
    var array = [1, 2, 3, 4, 5];

    function mod2(elm) {
      return !(elm % 2);
    }

    expect(contains(array, mod2)).toBeTruthy();
  });

  it('should get !collection and return always true', function() {
    expect(contains('lorem ipsum')).toBeTruthy();
    expect(contains(1, null)).toBeTruthy();
    expect(contains(!1)).toBeTruthy();
  });
});