'use strict';

describe('slugify', function () {

  it('should get a string with no replacer and replace spaces with dash(-)', function() {
    expect(slugify('a a')).toEqual('a-a');
    expect(slugify('foo bar baz')).toEqual('foo-bar-baz');
    expect(slugify('Lorem ipsum dolor sit amet')).toEqual('lorem-ipsum-dolor-sit-amet');
  });

  it('should get a string with replacer and replace spaces withit', function() {
    expect(slugify('a a', 1)).toEqual('a1a');
    expect(slugify('foo bar baz', '!')).toEqual('foo!bar!baz');
    expect(slugify('lorem ipsum dolor sit amet', ' ')).toEqual('lorem ipsum dolor sit amet');
    expect(slugify('Lorem ipsum dolor sit amet', '-')).toEqual('lorem-ipsum-dolor-sit-amet');
  });

  it('should get a !string and not touch it', function() {
    expect(slugify({})).toEqual({});
    expect(slugify([])).toEqual([]);
    expect(slugify(1)).toEqual(1);
    expect(slugify(!1)).toBeFalsy();
  });

});