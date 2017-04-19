'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'id-class-ad-disabled',
    description: 'The id and class attributes cannot use the ad keyword, it will be blocked by adblock software.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        var f = e.attrs;
        var g = void 0;
        var h = void 0;
        var j = e.col + e.tagName.length + 1;

        for (var k = 0, m = f.length; k < m; k++) g = f[k], h = g.name, /^(id|class)$/i.test(h) && /(^|[-\_])ad([-\_]|$)/i.test(g.value) && c.warn('The value of attribute ' + h + ' cannot use the ad keyword.', e.line, j + g.index, d, g.raw);
      });
    }
  });
};

module.exports = exports['default'];