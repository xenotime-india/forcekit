'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'head-script-disabled',
    description: 'The <script> tag cannot be used in a <head> tag.',
    init: function init(b, c) {
      function d(i) {
        var j = b.getMapAttrs(i.attrs);
        var k = j.type;
        var l = i.tagName.toLowerCase();
        'head' === l && (h = !0), !0 != h || 'script' !== l || k && !0 !== g.test(k) || c.warn('The <script> tag cannot be used in a <head> tag.', i.line, i.col, f, i.raw);
      }
      function e(i) {
        'head' === i.tagName.toLowerCase() && (b.removeListener('tagstart', d), b.removeListener('tagend', e));
      }

      var f = this;
      var g = /^(text\/javascript|application\/javascript)$/i;
      var h = !1;b.addListener('tagstart', d), b.addListener('tagend', e);
    }
  });
};

module.exports = exports['default'];