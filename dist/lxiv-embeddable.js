/**
 * lxiv-embeddable (c) 2014 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/lxiv for details
 */
var lxiv = function() {
    "use strict";

    /**
     * lxiv namespace.
     * @type {!Object.<string,*>}
     * @exports lxiv
     */
    var lxiv = {};

    /**
     * Character codes for output.
     * @type {!Array.<number>}
     * @inner
     */
    var aout = [
        65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102,
        103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
        119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47
    ];

    /**
     * Character codes for input.
     * @type {!Array.<number>}
     * @inner
     */
    var ain = [];
    for (var i=0, k=aout.length; i<k; ++i)
        ain[aout[i]] = i;

    /**
     * Encodes bytes to base64 char codes.
     * @param {!function():number|null} src Bytes source as a function returning the next byte respectively `null` if
     *  there are no more bytes left.
     * @param {!function(number)} dst Characters destination as a function successively called with each encoded char
     *  code.
     */
    lxiv.encode = function(src, dst) {
        var b, t;
        while ((b = src()) !== null) {
            dst(aout[(b>>2)&0x3f]);
            t = (b&0x3)<<4;
            if ((b = src()) !== null) {
                t |= (b>>4)&0xf;
                dst(aout[(t|((b>>4)&0xf))&0x3f]);
                t = (b&0xf)<<2;
                if ((b = src()) !== null)
                    dst(aout[(t|((b>>6)&0x3))&0x3f]),
                    dst(aout[b&0x3f]);
                else
                    dst(aout[t&0x3f]),
                    dst(61);
            } else
                dst(aout[t&0x3f]),
                dst(61),
                dst(61);
        }
    };

    /**
     * Decodes base64 char codes to bytes.
     * @param {!function():number|null} src Characters source as a function returning the next char code respectively
     *  `null` if there are no more characters left.
     * @param {!function(number)} dst Bytes destination as a function successively called with the next byte.
     * @throws {Error} If a character code is invalid
     */
    lxiv.decode = function(src, dst) {
        var c, t1, t2;
        function fail(c) {
            throw Error("Illegal character code: "+c);
        }
        while ((c = src()) !== null) {
            t1 = ain[c];
            if (typeof t1 === 'undefined') fail(c);
            if ((c = src()) !== null) {
                t2 = ain[c];
                if (typeof t2 === 'undefined') fail(c);
                dst((t1<<2)>>>0|(t2&0x30)>>4);
                if ((c = src()) !== null) {
                    t1 = ain[c];
                    if (typeof t1 === 'undefined')
                        if (c === 61) break; else fail(c);
                    dst(((t2&0xf)<<4)>>>0|(t1&0x3c)>>2);
                    if ((c = src()) !== null) {
                        t2 = ain[c];
                        if (typeof t2 === 'undefined')
                            if (c === 61) break; else fail(c);
                        dst(((t1&0x3)<<6)>>>0|t2);
                    }
                }
            }
        }
    };

    /**
     * Tests if a string is valid base64.
     * @param {string} str String to test
     * @returns {boolean} `true` if valid, otherwise `false`
     */
    lxiv.test = function(str) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str);
    };

    return lxiv;
}();
