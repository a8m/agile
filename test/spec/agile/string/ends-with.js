'use strict';

describe('The endsWith filter', function () {
  var input;

  describe('given an object, array, number or boolean', function () {
    var inputs = [{}, [], 1, false];

    it('should not be applied', function () {
      inputs.forEach(function (input) {
        expect(endsWith(input)).toEqual(input);
      });
    });
  });

  describe('given a string as input', function () {
    var input = 'string',
        isCS;

    describe('when the case insensitive parameter is omitted', function () {

      describe('and the input ends with the term', function () {

        it('should return true regardless of the case', function () {
          expect(endsWith(input, 'g')).toBeTruthy();
          expect(endsWith(input, 'ing')).toBeTruthy();
          expect(endsWith(input, 'ING')).toBeTruthy();
        });

      });

      describe('and the input doesn\'t end with the term', function () {

        it('should return false regardless of the case', function () {
          expect(endsWith(input, 'str')).toBeFalsy();
          expect(endsWith(input, 'fing')).toBeFalsy();
          expect(endsWith(input, 'TING')).toBeFalsy();
        });
      });

    });

    describe('when case insensitive is true', function () {
      beforeEach(function () {
        isCS = true;
      });

      describe('and the input ends with the term', function () {

        it('should return false if the case is different', function () {
          expect(endsWith(input, 'inG', isCS)).not.toBeTruthy();
          expect(endsWith(input, 'ING', isCS)).not.toBeTruthy();
        });

        it('should return true if they are in the same case', function () {
          expect(endsWith(input, 'ing', isCS)).toBeTruthy();
        });
      });
    });

    describe('when case insensitive is false', function () {
      beforeEach(function () {
        isCS = false;
      });

      describe('and the input ends with the term', function () {

        it('should return true even if the case is different', function () {
          expect(endsWith(input, 'inG', isCS)).toBeTruthy();
          expect(endsWith(input, 'ING', isCS)).toBeTruthy();
        });

        it('should return true if they are in the same case', function () {
          expect(endsWith(input, 'ing', isCS)).toBeTruthy();
        });
      });
    });
  });
});
