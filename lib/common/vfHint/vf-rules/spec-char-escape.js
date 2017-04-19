'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

exports.default = function (a) {
  a.addRule({
    id: 'spec-char-escape',
    description: 'Special characters must be escaped.',
    init: function init(b, c) {
      var d = this;
      b.addListener('text', function (e) {
        var f = e.raw;
        var g = /[<>]/g;

        for (var h = void 0; h = g.exec(f);) {
          var i = b.fixPos(e, h.index);
          c.error('Special characters must be escaped : [ ' + h[0] + ' ].', i.line, i.col, d, e.raw);
        }
      });
    }
  });
};

module.exports = exports['default'];