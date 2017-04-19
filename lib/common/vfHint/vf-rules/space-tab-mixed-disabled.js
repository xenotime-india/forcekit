'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'space-tab-mixed-disabled',
    description: 'Do not mix tabs and spaces for indentation.',
    init: function init(b, c, d) {
      var e = this;
      var f = 'nomix';
      var g = null;
      if ('string' == typeof d) {
        var h = d.match(/^([a-z]+)(\d+)?/);
        f = h[1], g = h[2] && parseInt(h[2], 10);
      }
      b.addListener('text', function (h) {
        var i = h.raw;
        var j = /(^|\r?\n)([ \t]+)/g;

        for (var k = void 0; k = j.exec(i);) {
          var l = b.fixPos(h, k.index + k[1].length);
          if (1 === l.col) {
              var m = k[2];
              'space' === f ? g ? (!1 === /^ +$/.test(m) || 0 != m.length % g) && c.warn('Please use space for indentation and keep ' + g + ' length.', l.line, 1, e, h.raw) : !1 === /^ +$/.test(m) && c.warn('Please use space for indentation.', l.line, 1, e, h.raw) : 'tab' === f && !1 === /^\t+$/.test(m) ? c.warn('Please use tab for indentation.', l.line, 1, e, h.raw) : !0 === / +\t|\t+ /.test(m) && c.warn('Do not mix tabs and spaces for indentation.', l.line, 1, e, h.raw);
            }
        }
      });
    }
  });
};

module.exports = exports['default'];