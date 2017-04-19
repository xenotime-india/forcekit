'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'src-not-empty',
    description: 'The src attribute of an img(script,link) must have a value.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        var f = e.tagName;
        var g = e.attrs;
        var h = void 0;
        var j = e.col + f.length + 1;
        for (var k = 0, m = g.length; k < m; k++) h = g[k], (!0 === /^(img|script|embed|bgsound|iframe)$/.test(f) && 'src' === h.name || 'link' === f && 'href' === h.name || 'object' === f && 'data' === h.name) && '' === h.value && c.error('The attribute [ ' + h.name + ' ] of the tag [ ' + f + ' ] must have a value.', e.line, j + h.index, d, h.raw);
      });
    }
  });
};

module.exports = exports['default'];