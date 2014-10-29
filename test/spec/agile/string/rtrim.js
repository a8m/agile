'use strict';

describe('rtrimrtrim', function () {
  
  it('should strip whitespace from the beginning of a string', function() {
    expect(rtrim('a   ')).toEqual('a');
    expect(rtrim('   foo bar   ')).toEqual('   foo bar');
    expect(rtrim('   ')).toEqual('');
  });

  it('should strip specific chars from the beginning of a string', function() {
    expect(rtrim('__a__', '__')).toEqual('__a');
    expect(rtrim('//foo bar//', '//')).toEqual('//foo bar');
    expect(rtrim('barfoobar', 'bar')).toEqual('barfoo');
    expect(rtrim('barfoobar', 'foo')).toEqual('barfoobar');
  });

  it('should get a !string and not touch it', function() {
    expect(rtrim({})).toEqual({});
    expect(rtrim([])).toEqual([]);
    expect(rtrim(1)).toEqual(1);
    expect(rtrim(!1)).toBeFalsy();
  });

});