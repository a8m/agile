'use strict';

describe('ucfirst', function () {

  it('should get a string and return it uppercase each first letter', function() {
    expect(ucfirst('a')).toEqual('A');
    expect(ucfirst('foo bar baz')).toEqual('Foo Bar Baz');
    expect(ucfirst('lorem ipsum is simply dummy.... industry.')).toEqual('Lorem Ipsum Is Simply Dummy.... Industry.');
  });

  it('should get a !string and not touch it', function() {
    expect(ucfirst({})).toEqual({});
    expect(ucfirst([])).toEqual([]);
    expect(ucfirst(1)).toEqual(1);
    expect(ucfirst(!1)).toBeFalsy();
  });

});