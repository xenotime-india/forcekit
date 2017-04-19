'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'href-abs-or-rel',
    description: 'An href attribute must be either absolute or relative.',
    init: function init(b, c, d) {
      var e = this;

      var f = 'abs' === d ? 'absolute' : 'relative';

      b.addListener('tagstart', function (g) {
        var h = g.attrs;
        var j = void 0;
        var k = g.col + g.tagName.length + 1;

        for (var m = 0, n = h.length; m < n; m++) if (j = h[m], 'href' === j.name) {
          ('absolute' == f && !1 === /^\w+?:/.test(j.value) || 'relative' == f && !0 === /^https?:\/\//.test(j.value)) && c.warn('The value of the href attribute [ ' + j.value + ' ] must be ' + f + '.', g.line, k + j.index, e, j.raw);

          break;
        }
      });
    }
  });
};

module.exports = exports['default'];