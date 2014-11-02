'use strict';
describe('agile.js', function() {
  var _ = agile;

  describe('::agile()', function() {
    it('should return instance of Wrapper based on the type', function() {
      expect(_([]).constructor.name).toEqual('ArrayWrapper');
      expect(_({}).constructor.name).toEqual('ObjectWrapper');
      expect(_('').constructor.name).toEqual('StringWrapper');
      expect(_(1).constructor.name).toEqual('NumberWrapper');
    });

    it('should throw an error if it\'s invalid argument', function() {
      expect(function () {_(function(){})}).toThrow(Error("Agile value can't be [function] as an argument"));
    });

    it('should return an object', function() {
      expect(typeof _([])).toEqual('object');
    });

    it('should return the __value__ on value() invoke', function() {
      expect(_([1,2,3]).value()).toEqual([1,2,3]);
    });

    it('should get wrapped value and return it as-is', function() {
      var wrapped = _([]);
      expect(_(wrapped) === wrapped).toBeTruthy();
    });
  });

  describe('::ArrayWrapper', function() {

    var nums  = [1,2,3,5,1,2,3,5];
    var teams = [
      { id: 2, team: { name: 'alpha' } },
      { id: 1, team: { name: 'beta'  } },
      { id: 3, team: { name: 'gamma' } },
      { id: 2, team: { name: 'beta'  } },
      { id: 1, team: { name: 'gamma' } }
    ];

    describe('#unique', function() {
      it('should works without given argument', function() {
        expect(_(nums).unique().value()).toEqual([1,2,3,5]);
        expect(_([1,1,1,1,1]).unique().value()).toEqual([1]);
      });
      it('should works with given property', function() {
        var uniqById = _(teams).unique('id').value();
        var uniqByName = _(teams).unique('team.name').value();
        expect(uniqById).toEqual([teams[0], teams[1], teams[2]]);
        expect(uniqByName).toEqual([teams[0], teams[1], teams[2]]);
      });
    });

    describe('#map', function() {
      it('should work with given property', function() {
        var ids = _(teams).map('id').value();
        var names = _(teams).map('team.name').value();
        expect(ids).toEqual([2, 1, 3, 2, 1]);
        expect(names).toEqual(['alpha', 'beta', 'gamma', 'beta', 'gamma']);
      });
    });

    describe('#groupBy', function() {
      it('should work with given property', function() {
        var groups = _(teams).groupBy('team.name').value();
        var ids    = _(teams).groupBy('id').value();
        expect(groups).toEqual({
          alpha: [teams[0]],
          beta: [teams[1], teams[3]],
          gamma: [teams[2], teams[4]] });
        expect(ids).toEqual({
          2: [teams[0], teams[3]],
          1: [teams[1], teams[4]],
          3: [teams[2]]
        });
      });
    });

    describe('#omit', function() {
      it('should work with given expression', function() {
        expect(_(teams).omit('id < 10').value()).toEqual([]);
        expect(_(teams).omit('team.name.indexOf("a") !== -1').value()).toEqual([]);
        expect(_(teams).omit('id > 10').value()).toEqual(teams);
        expect(_(teams).omit('id === 1 || id === 2').value()).toEqual([teams[2]]);
      });
      it('should work with given function', function() {
        var omitted = _(nums).omit(function(e){ return !(e%2) }).value();
        expect(omitted).toEqual([1, 3, 5, 1, 3, 5]);
      });
    });
  });

  describe('::StringWrapper', function() {
    describe('#repeat', function() {
      it('should repeat string', function() {
        expect(_('foo').repeat(2).value()).toEqual('foofoo');
        expect(_('1').repeat(8).value()).toEqual('11111111');
        expect(_('').repeat(2).value()).toEqual('');
      });
    });
  });
  describe('#trim, #ltrim, #rtrim', function() {
    it('should trim space by default', function() {
      expect(_(' trim ').trim().value()).toEqual('trim');
      expect(_(' rtrim ').rtrim().value()).toEqual(' rtrim');
      expect(_(' ltrim ').ltrim().value()).toEqual('ltrim ');
    });
    it('should trim based on the given argument', function() {
      expect(_('barfoobar').trim('bar').value()).toEqual('foo');
      expect(_('barfoobar').rtrim('bar').value()).toEqual('barfoo');
      expect(_('barfoobar').ltrim('bar').value()).toEqual('foobar');
    });
  });

  describe('::NumberWrapper', function() {
    it('should works with Math methods', function() {
      expect(_(3).pow(2).value()).toEqual(9);
      expect(_(3).pow(2).sqrt(2).value()).toEqual(3);
      expect(_([-1,-2,-3]).sum().abs().value()).toEqual(6);
    });
  });

  describe('::ObjectWrapper', function() {
    it('#toArray, should return ArrayWrapper with array value', function() {
      var array = _({
        0: { id: 1 },
        1: { id: 2 }
      }).toArray();
      expect(array instanceof ArrayWrapper).toBeTruthy();
      expect(array.value()).toEqual([{ id : 1 }, { id : 2 }]);
    });

    it('#keys, should return the objKeys method', function() {
      var o1 = { a: { b: 1 }, c: 2, d: { e: 1 } };
      expect(_(o1).keys().value()).toEqual(['a', 'c', 'd']);
      expect(_(o1).keys(true).value()).toEqual(['a.b', 'c', 'd.e']);
    });
  });

  describe('chaining in action', function() {
    var orders = [
      { id:1, customer: { name: 'foo', id: 10 } },
      { id:2, customer: { name: 'bar', id: 20 } },
      { id:3, customer: { name: 'baz', id: 10 } },
      { id:4, customer: { name: 'zoe', id: 20 } },
      { id:5, customer: { name: 'toy', id: 30 } }
    ];
    it('should works with different chaining', function() {
      expect(_(orders)
        .unique('customer.id')
        .map('id')
        .sum()
        .pow(3)
        .value()).toEqual(512);

      expect(_(orders)
        .filter('!(id%2)')
        .map('id')
        .join()
        .repeat(2)
        .value()).toEqual('2424');

      expect(_(orders)
        .first(2, 'id > 1')
        .map('id')
        .max()
        .value()).toEqual(3);

      expect(_(orders)
        .last(2, 'id')
        .map('id')
        .min()
        .value()).toEqual(4);

      //aliases pluck
      expect(_(orders).pluck('id').value())
        .toEqual(_(orders).map('id').value());

      //aliases pick
      expect(_(orders).pick('id > 3').value())
        .toEqual(_(orders).filter('id > 3').value());

      //aliases some
      expect(_(orders).some('id === 5').value())
        .toEqual(_(orders).contains('id === 5').value());
    });

  });
});