'use strict';

describe('remove', function() {

  it('should get array as a collection and members as an arguments' +
    'and remove them from collection', function() {
    var array = [
      { id: 1, name: 'ariel' },
      { id: 2, name: 'baz' },
      { id: 1, name: 'ariel' },
      { id: 1, name: 'bar' }
    ];

    expect(remove(array, { id: 1 , name: 'ariel' })).toEqual([{ id: 2, name: 'baz' }, { id: 1, name: 'bar' }]);
    expect(remove(array, { id: 1, name: 'ariel' }, { id: 1, name: 'bar' })).toEqual([{ id: 2, name: 'baz' }]);
    expect(remove([1,2,3, null], null, 2, 1)).toEqual([3]);
    expect(remove(array, {})).toEqual(array);
  });

  it('should get an array and not arguments and return the array as-is', function() {
    expect(remove([1,2,3])).toEqual([1,2,3]);
    expect(remove([undefined, undefined])).toEqual([undefined, undefined]);
  });

  it('should not arguments and return the collection as is', function() {
    expect(remove([{ a: 1 }])).toEqual([{ a:1 }]);
    expect(remove([{ a: 1 }, { b: 2 }])).toEqual([{ a:1 }, { b: 2 }]);
  });

  it('should get !collection and return it as-is', function() {
    expect(remove('lorem ipsum')).toEqual('lorem ipsum');
    expect(remove(1, null)).toEqual(1);
  });

});