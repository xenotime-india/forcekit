'use strict';

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (a) {
  a.addRule({
    id: 'jshint',
    description: 'Scan script with jshint.',
    init: function init(b, c, d) {
      var f = this;
      b.addListener('cdata', function (g) {
        if ('script' === g.tagName.toLowerCase()) {
          var h = b.getMapAttrs(g.attrs);
          var i = h.type;

          // Only scan internal javascript
          if (void 0 !== h.src || i && !1 === /^(text\/javascript)$/i.test(i)) return;

          var j = void 0;

          if (j = 'object' == ('undefined' == typeof exports ? 'undefined' : _typeof(exports)) && require ? require('jshint').JSHINT : JSHINT, void 0 !== d) {
            var k = g.line - 1;
            var l = g.col - 1;
            var m = g.raw.replace(/\t/g, ' ');
            try {
              var n = j(m, d);
              !1 === n && j.errors.forEach(function (o) {
                var p = o.line;
                c.warn(o.reason, k + p, (1 === p ? l : 0) + o.character, f, o.evidence);
              });
            } catch (n) {}
          }
        }
      });
    }
  });
};

module.exports = exports['default'];