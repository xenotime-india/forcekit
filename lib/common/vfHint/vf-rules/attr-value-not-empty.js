'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'attr-value-not-empty',
    description: 'All attributes must have values.',
    init: function init(b, c) {
      var d = this;
      b.addListener('tagstart', function (e) {
        var f = e.attrs;
        var g = void 0;
        var h = e.col + e.tagName.length + 1;
        for (var j = 0, k = f.length; j < k; j++) g = f[j], '' === g.quote && '' === g.value && c.warn('The attribute [ ' + g.name + ' ] must have a value.', e.line, h + g.index, d, g.raw);
      });
    }
  });
};

module.exports = exports['default'];