'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'attr-no-duplication',
    description: 'Elements cannot have duplicate attributes.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        var f = e.attrs;
        var g = void 0;
        var h = void 0;
        var j = e.col + e.tagName.length + 1;

        var k = {};
        for (var m = 0, n = f.length; m < n; m++) g = f[m], h = g.name, !0 === k[h] && c.error('Duplicate of attribute name [ ' + g.name + ' ] was found.', e.line, j + g.index, d, g.raw), k[h] = !0;
      });
    }
  });
};

module.exports = exports['default'];