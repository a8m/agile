'use strict';

describe('findLast', function() {

  describe('given a not array', function() {
    var inputs = [{}, 'string', 1, true, new Function];

    it('should not be applied', function() {
      inputs.forEach(function(input) {
        expect(findLast(input)).toEqual(input);
      });
    })
  });

  describe('get an array as a first argument', function() {
    var orders = [
      { id: 21, customer: { id: 2, name: 'John P.' }, product: { price: 21.12 }  },
      { id: 22, customer: { id: 1, name: 'Cati P.' }, product: { price: 89.21 }  },
      { id: 23, customer: { id: 1, name: 'Cati P.' }, product: { price: 49.00 }  },
      { id: 24, customer: { id: 3, name: 'Poul S.' }, product: { price: 10.22 }  },
      { id: 25, customer: { id: 4, name: 'Erik L.' }, product: { price: 11.31 }  }
    ];

    describe('get a !(expression || function)', function() {
      it('should not be applied', function() {
        expect(findLast(orders)).toEqual(orders);
      });
    });

    describe('get an expression as a second argument', function() {
      it('should return the last member that the expression returns truthy for', function() {
        expect(findLast(orders, 'id > 20')).toEqual(orders[4]);
        expect(findLast(orders, 'id > 22')).toEqual(orders[4]);
        expect(findLast(orders, 'customer.id === 1')).toEqual(orders[2]);
        expect(findLast(orders, 'product.price > 50')).toEqual(orders[1]);
      });
    });

    describe('get a function as a second argument', function() {
      it('should return the last member that the function returns truthy for', function() {
        function mod2(n) {
          return !(n%2);
        }
        expect(findLast([1,3,3,3,4,5,6], mod2)).toEqual(6);
        expect(findLast([2,3,3,3,5,5,7], mod2)).toEqual(2);
      });
    });
  });
});