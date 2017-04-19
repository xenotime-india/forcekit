'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'attr-value-double-quotes',
    description: 'Attribute values must be in double quotes.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        var f = e.attrs;
        var g = void 0;
        var h = e.col + e.tagName.length + 1;
        for (var j = 0, k = f.length; j < k; j++) g = f[j], ('' !== g.value && '"' !== g.quote || '' === g.value && "'" === g.quote) && c.error('The value of attribute [ ' + g.name + ' ] must be in double quotes.', e.line, h + g.index, d, g.raw);
      });
    }
  });
};

module.exports = exports['default'];