'use strict';

describe('repeat', function () {

    it('should repeat a string  n times', function() {
        expect(repeat('a')).toEqual('a');
        expect(repeat('a', 3)).toEqual('aaa');
        expect(repeat('a ', 3)).toEqual('a a a ');
        expect(repeat('foo', 3)).toEqual('foofoofoo');
    });

    it('should return the string as-is if `n` is undefined || 0', function() {
        expect(repeat('a')).toEqual('a');
        expect(repeat('a', 0)).toEqual('a');
    });

    it('should get a !string and not touch it', function() {
        expect(repeat({})).toEqual({});
        expect(repeat([])).toEqual([]);
        expect(repeat(1)).toEqual(1);
        expect(repeat(!1)).toBeFalsy();
    });

});