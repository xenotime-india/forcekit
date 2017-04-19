'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'inline-style-disabled',
    description: 'Inline style cannot be used.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        var f = e.attrs;
        var g = void 0;
        var h = e.col + e.tagName.length + 1;
        for (var j = 0, k = f.length; j < k; j++) g = f[j], 'style' === g.name.toLowerCase() && c.warn('Inline style [ ' + g.raw + ' ] cannot be used.', e.line, h + g.index, d, g.raw);
      });
    }
  });
};

module.exports = exports['default'];