'use strict';

describe('wrap', function () {
  
  it('should wrap a string with given wrapper', function() {
    expect(wrap('a', 'b')).toEqual('bab');
    expect(wrap('a', 1)).toEqual('1a1');
    expect(wrap('a', '.')).toEqual('.a.');
  });

  it('should wrap a string with starts and ends wrapper', function() {
    expect(wrap('b', 'a', 'c')).toEqual('abc');
    expect(wrap('a', 1, 2)).toEqual('1a2');
    expect(wrap('a', '/', '.')).toEqual('/a.');
  });


  it('should get a !string and not touch it', function() {
    expect(wrap({})).toEqual({});
    expect(wrap([])).toEqual([]);
    expect(wrap(1)).toEqual(1);
    expect(wrap(!1)).toBeFalsy();
  });

});