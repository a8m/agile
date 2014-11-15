**Quick examples compared to Underscore:**
```js
var orders = [
  { id: 21, customer: { id: 2, name: 'John P.' }, product: { price: 21.12 }  },
  { id: 22, customer: { id: 1, name: 'Cati P.' }, product: { price: 89.21 }  },
  { id: 23, customer: { id: 1, name: 'Cati P.' }, product: { price: 49.00 }  },
  { id: 24, customer: { id: 3, name: 'Poul S.' }, product: { price: 10.22 }  },
  { id: 25, customer: { id: 4, name: 'Erik L.' }, product: { price: 11.31 }  },
  { id: 26, customer: { id: 4, name: 'Erik L.' }, product: { price: 90.99 }  },
  { id: 27, customer: { id: 2, name: 'Cati P.' }, product: { price: 88.99 }  },
  { id: 28, customer: 'PickUp order',             product: { price: 19.20 }  }
];

//Underscore: get unique customers
_.uniq(orders, function(order) {
  if(order.hasOwnProperty('customer')) {
    return order.customer.id;
  }
  return order;
});
//Agile: get unique customers
_.uniq(orders, 'customer.id');

//Underscore: get the greatest purchase
_.max(orders, function(order) {
  if(order.hasOwnProperty('product')) {
    return order.product.price || 0;
  }
  return 0;
});
//Agile: get the greatest purchase
_.max(orders, 'product.price');

//Underscore: get sum of all orders
_.chain(orders)
  .map(function(order) {
    if(order.hasOwnProperty('product')) {
      return order.product.price || 0;
    }
    return 0;
  })
  .reduce(function(memo, num) {
    return memo + num;
  },
  0)
  .value(); // → 380.03
//Agile: get sum of all orders
_(orders)
  .map('product.price || 0')
  .sum()
  .value(); // → 380.03
```