'use strict';
describe('filter', function() {

  it('should filter primitive simply', function() {
    expect(filter([1,2,3,4,1,2], 1)).toEqual([1,1])
  });

  it('should filter by the given function', function() {
    function mod2(x) {
      return !(x%2);
    }
    expect(filter([1,2,3,4,1,2], mod2)).toEqual([2,4, 2]);
  });

  it('should filter by expression', function() {
    var array = [
      { id: 2, name: 'faa' },
      { id: 4, name: 'baz' },
      { id: 3, name: 'ariel' },
      { id: 5, name: 'bar' }
    ];

    expect(filter(array, 'name.indexOf("ba") != -1'))
      .toEqual([array[1], array[3]]);
    expect(filter(array, '!(id%2)'))
      .toEqual([array[0], array[1]]);
  });

  it('should handle nested properties safety', function() {
    var array = [
      {},{},[],null,
      { details: { name: 'Eddi' } }
    ];
    expect(filter(array, 'details.name'))
      .toEqual([ { details: { name: 'Eddi' } }]);
  });

  it('should get !array ot !exp and return it as-is', function() {
    expect(filter('string')).toEqual('string');
    expect(filter(1)).toEqual(1);

    expect(filter([1,2])).toEqual([1,2]);
  });
});