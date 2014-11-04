'use strict';

describe('max', function () {

    it('should Math.max with the given arguments', function() {
        var spy = spyOn(Math, 'max');
        max([1,2,3]);
        expect(spy).toHaveBeenCalledWith(1,2,3);
    });
    
    it('should get an array of numbers and return the biggest one', function() {
        expect(max([1,2,3,4,5])).toEqual(5);
        expect(max([2,2,2,2,2])).toEqual(2);
        expect(max([1])).toEqual(1);
    });

    it('should get array with expression and return object', function() {
        var users = [
            { name: 'foo', score: 89 },
            { name: 'bar', score: 32 },
            { name: 'baz', score: 49 }
        ];
        expect(max(users, 'score')).toEqual(users[0]);
    });

    it('should get an !array and return it as-is', function() {
        expect(max('string')).toEqual('string');
        expect(max({})).toEqual({});
        expect(max(!0)).toBeTruthy();
    });
});