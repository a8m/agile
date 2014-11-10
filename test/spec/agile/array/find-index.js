'use strict';

describe('findIndex', function() {

  var orders = [
    { id: 21, customer: { id: 2, name: 'John P.' }, product: { price: 21.12 }  },
    { id: 22, customer: { id: 1, name: 'Cati P.' }, product: { price: 89.21 }  },
    { id: 23, customer: { id: 1, name: 'Cati P.' }, product: { price: 49.00 }  },
    { id: 24, customer: { id: 3, name: 'Poul S.' }, product: { price: 10.22 }  },
    { id: 25, customer: { id: 4, name: 'Erik L.' }, product: { price: 11.31 }  }
  ];

  it('should return the first member the return truthy for the expression', function() {
    expect(findIndex(orders, 'id > 20')).toEqual(0);
    expect(findIndex(orders, 'id > 22')).toEqual(2);
    expect(findIndex(orders, 'customer.id === 1 && product.price < 80')).toEqual(2);
    expect(findIndex(orders, 'product.price > 50')).toEqual(1);
  });

  it('should accept functions as an argument', function() {
    function mod2(n) {
      return !(n%2);
    }
    expect(findIndex([1,3,3,3,4,5,6], mod2)).toEqual(4);
  });

  it('should get !array or !expression and return it as-is', function() {
    expect(findIndex('string')).toEqual('string');
    expect(findIndex(1010)).toEqual(1010);
    expect(findIndex(!0)).toBeTruthy();
    expect(findIndex([1,2])).toEqual([1,2]);
  });

});