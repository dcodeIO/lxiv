var lxiv = require("../index.js"),
    test = require("testjs"),
    data = [
        "a",
        "ab",
        "abc",
        "abcd",
        "abcde",
        "abcdef",
        "abcdefg",
        "ä",
        "ä☺",
        "ä☺𠜎",
        "ä☺𠜎️☁",
        "ä☺𠜎️☁ä",
        "ä☺𠜎️☁ä☺",
        "ä☺𠜎️☁ä☺𠜎",
        "\x00",
        "\x00\x01",
        "\x00\x01\x02",
        "\x00\x01\x02\x03",
        "\x00\x01\x02\x03\x04",
        "\x00\x01\x02\x03\x04\x05",
        "\x00\x01\x02\x03\x04\x05\x06",
        "abcdefgä☺𠜎️☁ä☺𠜎\x00\x01\x02\x03\x04\x05\x06"
    ];

var suite = {
    
    "encode/decode": function(test) {
        data.forEach(function(s) {
            var buf = new Buffer(s, "utf8"),
                out = [], out2 = [], i = 0;
            lxiv.encode(function() {
                if (i >= buf.length) return null;
                return buf[i++];
            }, function(c) {
                out.push(c);
            });
            s = String.fromCharCode.apply(String, out);
            test.log(s);
            test.strictEqual(s, buf.toString("base64"));
            i = 0;
            lxiv.decode(function() {
                if (i >= out.length) return null;
                return out[i++];
            }, function(b) {
                out2.push(b);
            });
            out2 = new Buffer(out2);
            test.strictEqual(out2.length, buf.length);
            test.deepEqual(out2, buf);
        });
        test.done();
    }
    
};

test.run(suite, "lxiv");
module.exports = suite;
