'use strict';

describe('sum', function () {

    it('should return the sum of all members in array', function() {
        expect(sum([1,2,3,4,5,6])).toEqual(21);
        expect(sum([0,0,0,0,0,1])).toEqual(1);
    });

    it('should be able to get an initial value', function() {
        expect(sum([2,3,5], 10)).toEqual(20);
        expect(sum([2,3,5], -10)).toEqual(0);
    });

    it('should return a string if the members type != number', function() {
        expect(typeof sum([{}, 'string', 'foo'])).toEqual('string')
    });

    it('should return the input as-is if is not an array', function() {
        expect(sum('string')).toEqual('string');
        expect(sum(1)).toEqual(1);
        expect(sum(!1)).toBeFalsy();
    })

});