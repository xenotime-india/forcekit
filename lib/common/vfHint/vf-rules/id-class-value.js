'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'id-class-value',
    description: 'The id and class attribute values must meet the specified rules.',
    init: function init(b, c, d) {
      var e = this;

      var f = {
        underline: {
          regId: /^[a-z\d]+(_[a-z\d]+)*$/,
          message: 'The id and class attribute values must be in lowercase and split by an underscore.'
        },
        dash: {
          regId: /^[a-z\d]+(-[a-z\d]+)*$/,
          message: 'The id and class attribute values must be in lowercase and split by a dash.'
        },
        hump: {
          regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
          message: 'The id and class attribute values must meet the camelCase style.'
        }
      };

      var g = void 0;

      if (g = 'string' == typeof d ? f[d] : d, g && g.regId) {
        var h = g.regId;
        var k = g.message;
        b.addListener('tagstart', function (l) {
          var m = l.attrs;
          var n = void 0;
          var o = l.col + l.tagName.length + 1;
          for (var p = 0, q = m.length; p < q; p++) if (n = m[p], 'id' === n.name.toLowerCase() && !1 === h.test(n.value) && c.warn(k, l.line, o + n.index, e, n.raw), 'class' === n.name.toLowerCase()) {
            var r = n.value.split(/\s+/g);
            var s = void 0;
            for (var _t3 = 0, _u3 = r.length; _t3 < _u3; _t3++) s = r[_t3], s && !1 === h.test(s) && c.warn(k, l.line, o + n.index, e, s);
          }
        });
      }
    }
  });
};

module.exports = exports['default'];