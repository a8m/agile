'use strict';

describe('trim', function () {

  it('should strip whitespace from the beginning and end of a string', function() {
    expect(trim('   a   ')).toEqual('a');
    expect(trim('   foo bar   ')).toEqual('foo bar');
    expect(trim('   ')).toEqual('');
  });

  it('should strip specific chars from the beginning and end of a string', function() {
    expect(trim('__a__', '__')).toEqual('a');
    expect(trim('//foo bar//', '//')).toEqual('foo bar');
    expect(trim('barfoobar', 'bar')).toEqual('foo');
    expect(trim('barfoobar', 'foo')).toEqual('barfoobar');
  });

  it('should get a !string and not touch it', function() {
    expect(trim({})).toEqual({});
    expect(trim([])).toEqual([]);
    expect(trim(1)).toEqual(1);
    expect(trim(!1)).toBeFalsy();
  });

});