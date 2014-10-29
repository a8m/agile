'use strict';

describe('ltrim', function () {
  it('should strip whitespace from the beginning of a string', function() {

    expect(ltrim('   a')).toEqual('a');
    expect(ltrim('   foo bar   ')).toEqual('foo bar   ');
    expect(ltrim('   ')).toEqual('');

  });

  it('should strip specific chars from the beginning of a string', function() {

    expect(ltrim('__a__', '__')).toEqual('a__');
    expect(ltrim('//foo bar//', '//')).toEqual('foo bar//');
    expect(ltrim('barfoobar', 'bar')).toEqual('foobar');

    expect(ltrim('barfoobar', 'foo')).toEqual('barfoobar');

  });

  it('should get a !string and not touch it', function() {
    expect(ltrim({})).toEqual({});
    expect(ltrim([])).toEqual([]);
    expect(ltrim(1)).toEqual(1);
    expect(ltrim(!1)).toBeFalsy();
  });

});