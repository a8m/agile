'use strict';

describe('unique', function() {

  it('should get a collection of primitives and return filtered collection', function() {
    //Boolean
    expect(unique([true, true, false, false, true])).toEqual([true, false]);
    //numbers
    expect(unique([1, 1, 2, 3, 4, 5, 5, 5, 5])).toEqual([1, 2, 3, 4, 5]);
    //strings
    expect(unique(["Ariel", "Ariel", "Ariel"])).toEqual(["Ariel"]);
  });

  it('should get array as collection, property(nested to) as identifier and unique', function() {

    var orders = [
      { id:10, customer: { name: 'foo', id: 1 } },
      { id:11, customer: { name: 'bar', id: 2 } },
      { id:12, customer: { name: 'foo', id: 1 } },
      { id:13, customer: { name: 'bar', id: 2 } },
      { id:14, customer: { name: 'baz', id: 3 } },
    ];

    var uniqueedOrders = [
      { id:10, customer: { name: 'foo', id: 1 } },
      { id:11, customer: { name: 'bar', id: 2 } },
      { id:14, customer: { name: 'baz', id: 3 } },
    ];

    expect(unique(orders, 'customer.id')).toEqual(uniqueedOrders);
    expect(unique(orders, 'customer.id').length).toEqual(uniqueedOrders.length);

    expect(unique(orders, 'customer.name')).toEqual(uniqueedOrders);
    expect(unique(orders, 'customer.name').length).toEqual(uniqueedOrders.length);

    expect(unique(orders, 'id')).toEqual(orders);
    expect(unique(orders, 'id').length).toEqual(orders.length);

  });

  it('should uniqueed by property and not touch members without this property', function() {

    var array = [
      { id: 1, person: { name: 'Ariel' , age: 25 } },
      { id: 2, person: { name: 'Joe' , age: 25 } },
      { id: 3, person: { name: 'Bob' , age: 42 } },
      { id: 4, person: { name: 'Marie' , age: 42 } },
      {}, [], 1,2, 'foo', true, null
    ];

    var uniqueedArray = [
      { id: 1, person: { name: 'Ariel' , age: 25 } },
      { id: 3, person: { name: 'Bob' , age: 42 } },
      {}, [], 1,2, 'foo', true, null
    ];

    //unique by person.age
    expect(unique(array, 'person.age')).toEqual(uniqueedArray);

    //should not touch members without this property
    expect(unique(array, 'id')).toEqual(array);

  });

  it('should support advance nested properties', function() {
    var orders = [
      { order: { person: { credit: { information: { num: 99999 } } } } },
      { order: { person: { credit: { information: { num: 99999 } } } } },
      { order: { person: { credit: { information: { num: 99999 } } } } }
    ];
    expect(unique(orders, 'order.person.credit.information.num')).toEqual([orders[0]]);
  });

  it('should get a !collection and return as-is', function() {
    expect(unique(undefined)).toEqual(undefined);
    expect(unique('foo')).toEqual('foo');
    expect(unique(1)).toEqual(1);
    expect(unique(!1)).toBeFalsy();
  });
});