'use strict';

describe('startsWith', function () {

  it('should return whether string starts with the starts parameter', function() {
    expect(startsWith('string', 's')).toBeTruthy();
    expect(startsWith('string', 'str')).toBeTruthy();
    expect(startsWith('foo bar', 'Foo B')).toBeTruthy();
    expect(startsWith('string', 'tring')).toBeFalsy();
    expect(startsWith('string', 'ig')).toBeFalsy();
    expect(startsWith('foo bar', 'bar')).toBeFalsy();
  });

  it('should be case sensitive', function() {
    expect(startsWith('string', 'STR', true)).toBeFalsy();
    expect(startsWith('string', 'STR', false)).toBeTruthy();
    expect(startsWith('foo bar', 'Foo B', true)).toBeFalsy();
  });

  it('should get a !string and not touch it', function() {
    expect(startsWith({})).toEqual({});
    expect(startsWith([])).toEqual([]);
    expect(startsWith(1)).toEqual(1);
    expect(startsWith(!1)).toBeFalsy();
  });

});