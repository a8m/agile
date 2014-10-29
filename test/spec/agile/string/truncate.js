describe('truncate', function () {

  it('should cut a string if it is longer than the provided length', function () {

    expect(truncate('lorem ipsum dolor sit amet', 5, '', false)).toEqual('lorem');
    expect(truncate('lorem ipsum dolor sit amet', 11, '', false)).toEqual('lorem ipsum');
    expect(truncate('lorem ipsum dolor sit amet', 50, '', false)).toEqual('lorem ipsum dolor sit amet');

    expect(truncate('abcdef', 3, '', false)).toEqual('abc');
    expect(truncate('abcd ef', 6, '', false)).toEqual('abcd e');

  });

  it('should not cut words in the middle if preserve is true', function () {

    expect(truncate('lorem ipsum dolor sit amet', 7, '', true)).toEqual('lorem ipsum');
    expect(truncate('lorem ipsum dolor sit amet', 13, '', true)).toEqual('lorem ipsum dolor');
    expect(truncate('lorem ipsum dolor sit amet', 50, '', true)).toEqual('lorem ipsum dolor sit amet');

    expect(truncate('abcdef', 3, '', true)).toEqual('abcdef');
    expect(truncate('abcd ef', 6, '', true)).toEqual('abcd ef');

  });

  it('should append the provided prefix if a string has been cut', function () {

    expect(truncate('lorem ipsum dolor sit amet', 7, '...', true)).toEqual('lorem ipsum...');
    expect(truncate('lorem ipsum dolor sit amet', 13, '...', true)).toEqual('lorem ipsum dolor...');
    expect(truncate('lorem ipsum dolor sit amet', 50, '...', true)).toEqual('lorem ipsum dolor sit amet');

  });

  it('should get !string and return it as-is', function() {

    expect(truncate([])).toEqual([]);
    expect(truncate({})).toEqual({});
    expect(truncate(1)).toEqual(1);
    expect(truncate(!1)).toBeFalsy();

  });

});