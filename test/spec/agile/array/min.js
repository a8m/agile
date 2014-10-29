'use strict';

describe('min', function () {

    it('should Math.min with the given arguments', function() {
        var spy = spyOn(Math, 'min');
        min([1,2,3]);
        expect(spy).toHaveBeenCalledWith(1,2,3);
    });

    it('should get an array of numbers and return the biggest one', function() {
        expect(min([1,2,3,4,5])).toEqual(1);
        expect(min([2,2,2,2,2])).toEqual(2);
        expect(min([1])).toEqual(1);
    });

    it('should get an !array and return it as-is', function() {
        expect(min('string')).toEqual('string');
        expect(min({})).toEqual({});
        expect(min(!0)).toBeTruthy();
    });
});