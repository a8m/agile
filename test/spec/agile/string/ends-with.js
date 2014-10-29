'use strict';

describe('endsWith', function () {

  it('should return whether string ends with the ends parameter', function() {

    expect(endsWith('string', 'g')).toBeTruthy();
    expect(endsWith('string', 'ing')).toBeTruthy();
    expect(endsWith('foo bar', 'BAR')).toBeTruthy();

    expect(endsWith('.JPG', '.jpg')).toBeTruthy();
    expect(endsWith('string', 'str')).toBeFalsy();
    expect(endsWith('string', 'fing')).toBeFalsy();
    expect(endsWith('foo bar', 'baz')).toBeFalsy();

  });

  it('should be case sensitive', function() {

    expect(endsWith('.JPG', '.jpg', true)).toBeFalsy();
    expect(endsWith('string', 'ING', true)).toBeFalsy();
    expect(endsWith('string', 'ING', false)).toBeTruthy();
    expect(endsWith('foo bar', 'Foo B', true)).toBeFalsy();

  });

  it('should get a !string and not touch it', function() {
    expect(endsWith({})).toEqual({});
    expect(endsWith([])).toEqual([]);
    expect(endsWith(1)).toEqual(1);
    expect(endsWith(!1)).toBeFalsy();
  });

});