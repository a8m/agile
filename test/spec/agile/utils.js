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

});