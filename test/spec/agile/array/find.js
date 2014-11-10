'use strict';

describe('find', function() {

  var orders = [
    { id: 21, customer: { id: 2, name: 'John P.' }, product: { price: 21.12 }  },
    { id: 22, customer: { id: 1, name: 'Cati P.' }, product: { price: 89.21 }  },
    { id: 23, customer: { id: 1, name: 'Cati P.' }, product: { price: 49.00 }  },
    { id: 24, customer: { id: 3, name: 'Poul S.' }, product: { price: 10.22 }  },
    { id: 25, customer: { id: 4, name: 'Erik L.' }, product: { price: 11.31 }  }
  ];

  it('should return the first member the return truthy for the expression', function() {
    expect(find(orders, 'id > 20')).toEqual(orders[0]);
    expect(find(orders, 'id > 22')).toEqual(orders[2]);
    expect(find(orders, 'customer.id === 1')).toEqual(orders[1]);
    expect(find(orders, 'product.price > 50')).toEqual(orders[1]);
  });

  it('should accept functions as an argument', function() {
    function mod2(n) {
      return !(n%2);
    }
    expect(find([1,3,3,3,4,5,6], mod2)).toEqual(4);
  });

  it('should get !array or !expression and return it as-is', function() {
    expect(find('string')).toEqual('string');
    expect(find(1010)).toEqual(1010);
    expect(find(!0)).toBeTruthy();
    expect(find([1,2])).toEqual([1,2]);
  });

});