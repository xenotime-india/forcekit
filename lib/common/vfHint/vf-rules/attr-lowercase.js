'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'attr-lowercase',
    description: 'All attribute names must be in lowercase.',
    init: function init(b, c, d) {
      var e = this;
      var f = Array.isArray(d) ? d : [];
      b.addListener('tagstart', function (g) {
        var h = g.attrs;
        var j = void 0;
        var k = g.col + g.tagName.length + 1;
        for (var m = 0, n = h.length; m < n; m++) {
          j = h[m];

          var o = j.name;
          f.includes(o) || !1 !== /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/.test(o) || c.error('The attribute name of [ ' + o + ' ] must be in camelCase style.', g.line, k + j.index, e, j.raw);
        }
      });
    }
  });
};

module.exports = exports['default'];