'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'id-unique',
    description: 'The value of id attributes must be unique.',
    init: function init(b, c) {
      var d = this;
      var e = {};
      b.addListener('tagstart', function (f) {
        var g = f.attrs;
        var h = void 0;
        var j = void 0;
        var k = f.col + f.tagName.length + 1;
        for (var m = 0, n = g.length; m < n; m++) if (h = g[m], 'id' === h.name.toLowerCase()) {
          j = h.value, j && (void 0 === e[j] ? e[j] = 1 : e[j]++, 1 < e[j] && c.error('The id value [ ' + j + ' ] must be unique.', f.line, k + h.index, d, h.raw));

          break;
        }
      });
    }
  });
};

module.exports = exports['default'];