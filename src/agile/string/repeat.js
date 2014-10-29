/**
 * @name repeat
 * @kind function
 *
 * @description
 * Repeats a string n times.
 */
function repeat(input, n) {

    var times = ~~n;

    return (!isString(input) || !times) ? input : strRepeat(input, n);
}

/**
 * Repeats a string n times with given separator
 * @param str string to repeat
 * @param n number of times
 * @returns {*}
 */
function strRepeat(str, n) {
    var res = '';
    do {
        if (n & 1) {
            res += str;
        }

        str += str;
    } while (n = n >> 1);

    return res;
}