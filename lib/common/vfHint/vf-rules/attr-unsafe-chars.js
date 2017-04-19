'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'attr-unsafe-chars',
    description: 'Attribute values cannot contain unsafe chars.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        var f = e.attrs;
        var g = void 0;
        var h = e.col + e.tagName.length + 1;
        // exclude \x09(\t), \x0a(\r), \x0d(\n)
        var j = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/;
        var k = void 0;
        for (var m = 0, n = f.length; m < n; m++) if (g = f[m], k = g.value.match(j), null !== k) {
          var o = escape(k[0]).replace(/%u/, '\\u').replace(/%/, '\\x');
          c.warn('The value of attribute [ ' + g.name + ' ] cannot contain an unsafe char [ ' + o + ' ].', e.line, h + g.index, d, g.raw);
        }
      });
    }
  });
};

module.exports = exports['default'];