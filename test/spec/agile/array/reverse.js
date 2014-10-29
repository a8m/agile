'use strict';

describe('reverse', function() {
  
  it('should get array as array and return it revered', function() {
    var array = [1,2,3,4];

    expect(reverse(array)).toEqual(array.reverse());
    expect(reverse([1])).toEqual([1]);
    expect(reverse(['foo', 'bar'])).toEqual(['bar', 'foo']);
  });

  it('should not change the source array', function() {
    var src = [1,2,3];

    expect(reverse(src)).toEqual([3,2,1]);
    expect(src).not.toEqual([3,2,1]);
  });

  it('should get string as a parameter and return it reversed', function() {
    expect(reverse('foobar')).toEqual('raboof');
    expect(reverse('Lorem Ipsum')).toEqual('muspI meroL');
    expect(reverse('FOO, BAR, BAZ')).toEqual('ZAB ,RAB ,OOF');
  });

  it('should get !string and !array and return it as-is', function() {
    expect(reverse(999)).toEqual(999);
    expect(reverse(!1)).toBeFalsy();
    expect(null).toEqual(null);
  });
});