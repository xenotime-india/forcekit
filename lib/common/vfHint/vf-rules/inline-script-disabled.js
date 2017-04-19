'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'inline-script-disabled',
    description: 'Inline script cannot be used.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        var f = e.attrs;
        var g = void 0;
        var h = e.col + e.tagName.length + 1;
        var j = void 0;
        var k = /^on(unload|message|submit|select|scroll|resize|mouseover|mouseout|mousemove|mouseleave|mouseenter|mousedown|load|keyup|keypress|keydown|focus|dblclick|click|change|blur|error)$/i;

        for (var m = 0, n = f.length; m < n; m++) g = f[m], j = g.name.toLowerCase(), !0 === k.test(j) ? c.warn('Inline script [ ' + g.raw + ' ] cannot be used.', e.line, h + g.index, d, g.raw) : ('src' === j || 'href' === j) && /^\s*javascript:/i.test(g.value) && c.warn('Inline script [ ' + g.raw + ' ] cannot be used.', e.line, h + g.index, d, g.raw);
      });
    }
  });
};

module.exports = exports['default'];