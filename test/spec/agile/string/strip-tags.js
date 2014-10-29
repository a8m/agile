'use strict';

describe('stripTags', function () {

  it('should get a string with tags and splash it', function() {
    expect(stripTags('<p>lorem ipsum</p>')).toEqual('lorem ipsum');
    expect(stripTags('<div class="block">foo bar</div>')).toEqual('foo bar');
    expect(stripTags('<title>awesome title</title>')).toEqual('awesome title');
  });

  it('should get a !string and not touch it', function() {
    expect(stripTags({})).toEqual({});
    expect(stripTags([])).toEqual([]);
    expect(stripTags(1)).toEqual(1);
    expect(stripTags(!1)).toBeFalsy();
  });

});