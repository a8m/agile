'use strict';

describe('utils', function() {

  describe('#equals', function() {
    it('should return true if same object', function() {
      var o = {};
      expect(equals(o, o)).toEqual(true);
      expect(equals(o, {})).toEqual(true);
      expect(equals(1, '1')).toEqual(false);
      expect(equals(1, '2')).toEqual(false);
    });

    it('should recurse into object', function() {
      expect(equals({}, {})).toEqual(true);
      expect(equals({name:'misko'}, {name:'misko'})).toEqual(true);
      expect(equals({name:'misko', age:1}, {name:'misko'})).toEqual(false);
      expect(equals({name:'misko'}, {name:'misko', age:1})).toEqual(false);
      expect(equals({name:'misko'}, {name:'adam'})).toEqual(false);
      expect(equals(['misko'], ['misko'])).toEqual(true);
      expect(equals(['misko'], ['adam'])).toEqual(false);
      expect(equals(['misko'], ['misko', 'adam'])).toEqual(false);
    });

    it('should ignore undefined member variables during comparison', function() {
      var obj1 = {name: 'misko'},
        obj2 = {name: 'misko', undefinedvar: undefined};

      expect(equals(obj1, obj2)).toBe(true);
      expect(equals(obj2, obj1)).toBe(true);
    });

    it('should ignore functions', function() {
      expect(equals({func: function() {}}, {bar: function() {}})).toEqual(true);
    });

    it('should work well with nulls', function() {
      expect(equals(null, '123')).toBe(false);
      expect(equals('123', null)).toBe(false);

      var obj = {foo:'bar'};
      expect(equals(null, obj)).toBe(false);
      expect(equals(obj, null)).toBe(false);

      expect(equals(null, null)).toBe(true);
    });

    it('should work well with undefined', function() {
      expect(equals(undefined, '123')).toBe(false);
      expect(equals('123', undefined)).toBe(false);

      var obj = {foo:'bar'};
      expect(equals(undefined, obj)).toBe(false);
      expect(equals(obj, undefined)).toBe(false);

      expect(equals(undefined, undefined)).toBe(true);
    });

    it('should treat two NaNs as equal', function() {
      expect(equals(NaN, NaN)).toBe(true);
    });

    it('should compare Window instances only by identity', function() {
      expect(equals(window, window)).toBe(true);
      expect(equals(window, window.parent)).toBe(false);
      expect(equals(window, undefined)).toBe(false);
    });

    it('should compare dates', function() {
      expect(equals(new Date(0), new Date(0))).toBe(true);
      expect(equals(new Date(0), new Date(1))).toBe(false);
      expect(equals(new Date(0), 0)).toBe(false);
      expect(equals(0, new Date(0))).toBe(false);

      expect(equals(new Date(undefined), new Date(undefined))).toBe(true);
      expect(equals(new Date(undefined), new Date(0))).toBe(false);
      expect(equals(new Date(undefined), new Date(null))).toBe(false);
      expect(equals(new Date(undefined), new Date('wrong'))).toBe(true);
    });

    it('should correctly test for keys that are present on Object.prototype', function() {
      /* jshint -W001 */
      expect(equals({}, {hasOwnProperty: 1})).toBe(false);
      expect(equals({}, {toString: null})).toBe(false);
    });

    it('should compare regular expressions', function() {
      expect(equals(/abc/, /abc/)).toBe(true);
      expect(equals(/abc/i, new RegExp('abc', 'i'))).toBe(true);
      expect(equals(new RegExp('abc', 'i'), new RegExp('abc', 'i'))).toBe(true);
      expect(equals(new RegExp('abc', 'i'), new RegExp('abc'))).toBe(false);
      expect(equals(/abc/i, /abc/)).toBe(false);
      expect(equals(/abc/, /def/)).toBe(false);
      expect(equals(/^abc/, /abc/)).toBe(false);
      expect(equals(/^abc/, '/^abc/')).toBe(false);
    });

    it('should return false when comparing an object and an array', function() {
      expect(equals({}, [])).toBe(false);
      expect(equals([], {})).toBe(false);
    });
  });

  describe('#extend', function() {
    it('should extends object with multiple arguments', function() {
      var a = {}, b = { b: 1 }, c = { c: 1 };
      extend(a, b, c);
      expect(a).toEqual({ b: 1, c: 1 });
    });

    it('should override existing keys with the extends keys', function() {
      var a = { a: 1 }, b = { b: 1 }, c = { a: 2, c: 1 };
      extend(a, b, c);
      expect(a).toEqual({ a: 2, b: 1, c: 1 });
    });
  });

  describe('#createMap', function() {
    it('should create object without prototype', function() {
      var map = createMap();
      expect(map.toString).toBeUndefined();
    });
  });

  describe('#noop', function() {
    it('should not performs operations.', function() {
      expect(noop()).toBeUndefined();
    });
  });

  describe('case', function() {
    it('should change case', function() {
      expect(lowercase('ABC90')).toEqual('abc90');
      expect(uppercase('abc90')).toEqual('ABC90');
    });

    it('should get a not string and return it as-is', function() {
      expect(lowercase({})).toEqual({});
      expect(uppercase([])).toEqual([]);
    });
  });

  describe('toJson', function() {
    it('should call to JSON.stringify', function() {
      var spy = spyOn(JSON, 'stringify').andCallThrough();
      expect(toJson({})).toEqual('{}');
      expect(spy).toHaveBeenCalledWith({});
    });

    it('should serialize undefined as undefined', function() {
      expect(toJson(undefined)).toEqual(undefined);
    });
  });

  describe("copy", function() {
    it("should return same object", function() {
      var obj = {};
      var arr = [];
      expect(copy({}, obj)).toBe(obj);
      expect(copy([], arr)).toBe(arr);
    });

    it("should preserve prototype chaining", function() {
      var GrandParentProto = {};
      var ParentProto = Object.create(GrandParentProto);
      var obj = Object.create(ParentProto);
      expect(ParentProto.isPrototypeOf(copy(obj))).toBe(true);
      expect(GrandParentProto.isPrototypeOf(copy(obj))).toBe(true);
      var Foo = function() {};
      expect(copy(new Foo()) instanceof Foo).toBe(true);
    });

    it("should copy Date", function() {
      var date = new Date(123);
      expect(copy(date) instanceof Date).toBeTruthy();
      expect(copy(date).getTime()).toEqual(123);
      expect(copy(date) === date).toBeFalsy();
    });

    it("should copy RegExp", function() {
      var re = new RegExp(".*");
      expect(copy(re) instanceof RegExp).toBeTruthy();
      expect(copy(re).source).toBe(".*");
      expect(copy(re) === re).toBe(false);
    });

    it("should copy literal RegExp", function() {
      var re = /.*/;
      expect(copy(re) instanceof RegExp).toBeTruthy();
      expect(copy(re).source).toEqual(".*");
      expect(copy(re) === re).toBeFalsy();
    });

    it("should copy RegExp with flags", function() {
      var re = new RegExp('.*', 'gim');
      expect(copy(re).global).toBe(true);
      expect(copy(re).ignoreCase).toBe(true);
      expect(copy(re).multiline).toBe(true);
    });

    it("should copy RegExp with lastIndex", function() {
      var re = /a+b+/g;
      var str = 'ab aabb';
      expect(re.exec(str)[0]).toEqual('ab');
      expect(copy(re).exec(str)[0]).toEqual('aabb');
    });

    it("should deeply copy literal RegExp", function() {
      var objWithRegExp = {
        re: /.*/
      };
      expect(copy(objWithRegExp).re instanceof RegExp).toBeTruthy();
      expect(copy(objWithRegExp).re.source).toEqual(".*");
      expect(copy(objWithRegExp.re) === objWithRegExp.re).toBeFalsy();
    });

    it("should deeply copy an array into an existing array", function() {
      var src = [1, {name:"value"}];
      var dst = [{key:"v"}];
      expect(copy(src, dst)).toBe(dst);
      expect(dst).toEqual([1, {name:"value"}]);
      expect(dst[1]).toEqual({name:"value"});
      expect(dst[1]).not.toBe(src[1]);
    });

    it("should deeply copy an array into a new array", function() {
      var src = [1, {name:"value"}];
      var dst = copy(src);
      expect(src).toEqual([1, {name:"value"}]);
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
      expect(dst[1]).not.toBe(src[1]);
    });

    it('should copy empty array', function() {
      var src = [];
      var dst = [{key: "v"}];
      expect(copy(src, dst)).toEqual([]);
      expect(dst).toEqual([]);
    });

    it("should deeply copy an object into an existing object", function() {
      var src = {a:{name:"value"}};
      var dst = {b:{key:"v"}};
      expect(copy(src, dst)).toBe(dst);
      expect(dst).toEqual({a:{name:"value"}});
      expect(dst.a).toEqual(src.a);
      expect(dst.a).not.toBe(src.a);
    });

    it("should deeply copy an object into a non-existing object", function() {
      var src = {a:{name:"value"}};
      var dst = copy(src, undefined);
      expect(src).toEqual({a:{name:"value"}});
      expect(dst).toEqual(src);
      expect(dst).not.toBe(src);
      expect(dst.a).toEqual(src.a);
      expect(dst.a).not.toBe(src.a);
    });

    it("should copy primitives", function() {
      expect(copy(null)).toEqual(null);
      expect(copy('')).toBe('');
      expect(copy('lala')).toBe('lala');
      expect(copy(123)).toEqual(123);
      expect(copy([{key:null}])).toEqual([{key:null}]);
    });

    it('should throw an exception if a Window is being copied', function() {
      expect(function() { copy(window); }).toThrow
        (Error("Can't copy! Making copies of Window instances is not supported."));
    });

    it('should throw an exception when source and destination are equivalent', function() {
      var src, dst;
      src = dst = {key: 'value'};
      expect(function() { copy(src, dst); }).toThrow(Error("Can't copy! Source and destination are identical."));
      src = dst = [2, 4];
      expect(function() { copy(src, dst); }).toThrow(Error("Can't copy! Source and destination are identical."));
    });

    it('should handle circular references when circularRefs is turned on', function() {
      var a = {b: {a: null}, self: null, selfs: [null, null, [null]]};
      a.b.a = a;
      a.self = a;
      a.selfs = [a, a.b, [a]];

      var aCopy = copy(a, null);
      expect(aCopy).toEqual(a);

      expect(aCopy).not.toBe(a);
      expect(aCopy).toBe(aCopy.self);
      expect(aCopy.selfs[2]).not.toBe(a.selfs[2]);
    });

    it('should clear destination arrays correctly when source is non-array', function() {
      expect(copy(null, [1,2,3])).toEqual([]);
      expect(copy(undefined, [1,2,3])).toEqual([]);
      expect(copy({0: 1, 1: 2}, [1,2,3])).toEqual([1,2]);
    });
  });

  describe('#identity', function() {
    var identity = value;
    it('should get a value and return is as-is', function() {
      var a = {};
      expect(identity(a) === a).toBeTruthy();
    })
  });

  describe('forEach', function() {
    it('should iterate over *own* object properties', function() {
      function MyObj() {
        this.bar = 'barVal';
        this.baz = 'bazVal';
      }
      MyObj.prototype.foo = 'fooVal';

      var obj = new MyObj(),
        log = [];

      forEach(obj, function(value, key) { log.push(key + ':' + value); });

      expect(log).toEqual(['bar:barVal', 'baz:bazVal']);
    });


    it('should not break if obj is an array we override hasOwnProperty', function() {
      /* jshint -W001 */
      var obj = [];
      obj[0] = 1;
      obj[1] = 2;
      obj.hasOwnProperty = null;
      var log = [];
      forEach(obj, function(value, key) {
        log.push(key + ':' + value);
      });
      expect(log).toEqual(['0:1', '1:2']);
    });

    it('should handle HTMLCollection objects like arrays', function() {
      document.body.innerHTML = "<p>" +
        "<a name='x'>a</a>" +
        "<a name='y'>b</a>" +
        "<a name='x'>c</a>" +
        "</p>";

      var htmlCollection = document.getElementsByName('x'),
        log = [];

      forEach(htmlCollection, function(value, key) { log.push(key + ':' + value.innerHTML); });
      expect(log).toEqual(['0:a', '1:c']);
    });

    if (document.querySelectorAll) {
      it('should handle the result of querySelectorAll in IE8 as it has no hasOwnProperty function', function() {
        document.body.innerHTML = "<p>" +
          "<a name='x'>a</a>" +
          "<a name='y'>b</a>" +
          "<a name='x'>c</a>" +
          "</p>";

        var htmlCollection = document.querySelectorAll('[name="x"]'),
          log = [];

        forEach(htmlCollection, function(value, key) { log.push(key + ':' + value.innerHTML); });
        expect(log).toEqual(['0:a', '1:c']);
      });
    }

    it('should handle arguments objects like arrays', function() {
      var args,
        log = [];

      (function() { args = arguments; }('a', 'b', 'c'));

      forEach(args, function(value, key) { log.push(key + ':' + value); });
      expect(log).toEqual(['0:a', '1:b', '2:c']);
    });

    it('should handle string values like arrays', function() {
      var log = [];

      forEach('bar', function(value, key) { log.push(key + ':' + value); });
      expect(log).toEqual(['0:b', '1:a', '2:r']);
    });


    it('should handle objects with length property as objects', function() {
      var obj = {
          'foo': 'bar',
          'length': 2
        },
        log = [];

      forEach(obj, function(value, key) { log.push(key + ':' + value); });
      expect(log).toEqual(['foo:bar', 'length:2']);
    });


    it('should handle objects of custom types with length property as objects', function() {
      function CustomType() {
        this.length = 2;
        this.foo = 'bar';
      }

      var obj = new CustomType(),
        log = [];

      forEach(obj, function(value, key) { log.push(key + ':' + value); });
      expect(log).toEqual(['length:2', 'foo:bar']);
    });


    it('should not invoke the iterator for indexed properties which are not present in the collection', function() {
      var log = [];
      var collection = [];
      collection[5] = 'SPARSE';
      forEach(collection, function(item, index) {
        log.push(item + index);
      });
      expect(log.length).toBe(1);
      expect(log[0]).toBe('SPARSE5');
    });


    describe('ES spec api compliance', function() {

      function testForEachSpec(expectedSize, collection) {
        var that = {};

        forEach(collection, function(value, key, collectionArg) {
          expect(collectionArg).toBe(collection);
          expect(collectionArg[key]).toBe(value);

          expect(this).toBe(that);

          expectedSize--;
        }, that);

        expect(expectedSize).toBe(0);
      }


      it('should follow the ES spec when called with array', function() {
        testForEachSpec(2, [1,2]);
      });


      it('should follow the ES spec when called with arguments', function() {
        testForEachSpec(2, (function() { return arguments; }(1,2)));
      });


      it('should follow the ES spec when called with string', function() {
        testForEachSpec(2, '12');
      });

      it('should follow the ES spec when called with JSON', function() {
        testForEachSpec(2, {a: 1, b: 2});
      });


      it('should follow the ES spec when called with function', function() {
        function f() {}
        f.a = 1;
        f.b = 2;
        testForEachSpec(2, f);
      });
    });
  });

  describe('#minErr', function() {
    it('should return a function', function() {
      expect(typeof minErr('module')).toEqual('function');
    });

    it('should throw an error with enumarable params', function() {
      expect(minErr('$parse')('parsing {0}', 'error')).toEqual(Error('[$parse:]parsing error'));
      expect(minErr('$parse')('{1} {0} {2}', 'error', 'parsing')).toEqual(Error('[$parse:]parsing error {2}'));
    });
  });

  describe('private things', function() {
    it('should return if it\'s Array-Like', function() {
      expect(isArrayLike(arguments)).toEqual(true);
      //fake jQuery
      var nodeElm = [document.createTextNode("CLICK ME")];
      nodeElm.nodeType = 1;
      expect(isArrayLike(nodeElm)).toEqual(true);
      //should return false
      expect(isArrayLike(null)).toEqual(false);
      expect(isArrayLike(window)).toEqual(false);
    });
  });

  describe('valueFn', function() {
    it('should get a value and return a function that return it on invocation', function() {
      expect(typeof valueFn(1)).toEqual('function');
      expect(valueFn(1)()).toEqual(1);
    });
  });
});