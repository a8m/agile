'use strict';

describe('boolean', function() {

  describe('#isString', function() {
    it('should get !string and return false', function() {
      expect(isString(1)).toBeFalsy();
      expect(isString(!0)).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString(new Function)).toBeFalsy();
    });

    it('should get string and return true', function() {
      expect(isString('')).toBeTruthy();
      expect(isString('2')).toBeTruthy();
      expect(isString('A')).toBeTruthy();
    });
  });

  describe('#isObject', function() {
    it('should get !object and return false', function() {
      expect(isObject('')).toBeFalsy();
      expect(isObject(1)).toBeFalsy();
      expect(isObject(!1)).toBeFalsy();
    });

    it('should get object and return true', function() {
      expect(isObject({})).toBeTruthy();
      expect(isObject([])).toBeTruthy();
      expect(isObject(new Date)).toBeTruthy();
      expect(isObject(new RegExp)).toBeTruthy();
    });
  });

  describe('#isNumber', function() {
    it('should get !number and return false', function() {
      expect(isNumber('')).toBeFalsy();
      expect(isNumber('1')).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
    });

    it('should get number and return true', function() {
      expect(isNumber(1e3)).toBeTruthy();
      expect(isNumber(NaN)).toBeTruthy();
      expect(isNumber(-0.001)).toBeTruthy();
    });
  });

  describe('#isDefined, #isUndefined', function() {
    it('should distinguish between two values', function() {
      expect(isUndefined(undefined)).toBeTruthy();
      expect(isDefined(undefined)).toBeFalsy();
      expect(isUndefined(1)).toBeFalsy();
      expect(isDefined(1)).toBeTruthy();
    });
  });

  describe('#isDate', function() {
    it('should get a !Date object and return false', function() {
      expect(isDate({})).toBeFalsy();
      expect(isDate('Sat Oct 25 2014 16:17:17')).toBeFalsy();
    });

    it('should get a Date object and return true', function() {
      expect(isDate(new Date)).toBeTruthy();
      expect(isDate(new Date('Sat Oct 25 2014 16:17:17'))).toBeTruthy();
    });
  });

  describe('#isArray', function() {
    it('should get a !Array and return false', function() {
      expect(isArray({})).toBeFalsy();
      expect(isArray('[]')).toBeFalsy();
      expect(isArray(new Function)).toBeFalsy();
    });

    it('should get a Array and return true', function() {
      expect(isArray([])).toBeTruthy();
    });
  });

  describe('#isFunction', function() {
    it('should get a !Function and return false', function() {
      expect(isFunction({})).toBeFalsy();
      expect(isFunction('[]')).toBeFalsy();
      expect(isFunction(3)).toBeFalsy();
    });

    it('should get a Function and return true', function() {
      expect(isFunction(new Function)).toBeTruthy();
      expect(isFunction(function(){})).toBeTruthy();
    });
  });

  describe('#isRegExp', function() {
    it('should get a !RegExp and return false', function() {
      expect(isRegExp({})).toBeFalsy();
      expect(isRegExp('[]')).toBeFalsy();
      expect(isRegExp(3)).toBeFalsy();
    });

    it('should get a RegExp and return true', function() {
      expect(isRegExp(/^as/g)).toBeTruthy();
      expect(isRegExp(new RegExp())).toBeTruthy();
    });
  });

  describe('#isEmpty', function() {
    it('should get an array or string and return if it empty', function() {
      expect(isEmpty([1])).toBeFalsy();
      expect(isEmpty(' ')).toBeFalsy();
      expect(isEmpty([])).toBeTruthy();
      expect(isEmpty('')).toBeTruthy();
    });

    it('should get not string/array and return false', function() {
      expect(isEmpty(1)).toBeFalsy();
      expect(isEmpty({})).toBeFalsy();
    });
  });
});